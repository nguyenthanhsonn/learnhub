import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { AuthResponseDto } from './dto/res/auth-res.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserProfileDto } from './dto/res/user-profile.dto';
import { LoginDto } from './dto/req/login.dto';
import { ForgotPasswordDto } from './dto/req/forgot-password.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'JWT_EXPIRES_IN',
        ) as JwtSignOptions['expiresIn'],
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ) as JwtSignOptions['expiresIn'],
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private toUserProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  // register
  async register(body: CreateUserDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({
      fullName: body.fullName,
      email: body.email,
      passwordHash,
      role: body.role,
    });


    return {
      success: true,
      data: {
        user: this.toUserProfile(user)
      }
      
    };
  }
  
  async login(body: LoginDto) : Promise<AuthResponseDto> {
    // validate user
    const user = await this.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    const {accessToken, refreshToken} = await this.generateTokens(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);
    

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: this.toUserProfile(user),
      },
    };
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (user) {
      const otp = randomInt(100000, 1000000).toString();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await this.usersService.updatePasswordResetOtp(user.id, otpHash, expiresAt);
      await this.mailService.sendPasswordResetOtp(user.email, otp);
    }

    return {
      success: true,
      message: 'Nếu email tồn tại, mã OTP đặt lại mật khẩu đã được gửi.',
    };
  }
}
