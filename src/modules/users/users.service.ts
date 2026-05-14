import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/req/update-profile.dto';
import { UserProfileDto } from '../auth/dto/res/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findById(id: string) {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  create(data: Partial<User>) {
    return this.usersRepository.create(data);
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this.usersRepository.updateRefreshToken(id, refreshToken);
  }

  updatePasswordResetOtp(
    id: string,
    passwordResetOtpHash: string,
    passwordResetOtpExpiresAt: Date,
  ) {
    return this.usersRepository.updatePasswordResetOtp(
      id,
      passwordResetOtpHash,
      passwordResetOtpExpiresAt,
    );
  }

  async updateProfile(userId: string, body: UpdateProfileDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (body.email && body.email !== user.email) {
      const existingUser = await this.usersRepository.findByEmail(body.email);

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Email đã được sử dụng');
      }
    }

    const updatedUser = await this.usersRepository.updateProfile(userId, {
      fullName: body.fullName,
      email: body.email,
      avatarUrl: body.avatarUrl,
    });

    if (!updatedUser) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    return {
      success: true,
      data: {
        user: this.toUserProfile(updatedUser),
      },
    };
  }

  private toUserProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
