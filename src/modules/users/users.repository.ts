import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  create(data: Partial<User>): Promise<User> {
    return this.repository.save(this.repository.create(data));
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.repository.update(id, { refreshToken });
  }

  async updatePasswordResetOtp(
    id: string,
    passwordResetOtpHash: string,
    passwordResetOtpExpiresAt: Date,
  ): Promise<void> {
    await this.repository.update(id, {
      passwordResetOtpHash,
      passwordResetOtpExpiresAt,
    });
  }

  async updateProfile(
    id: string,
    data: Pick<Partial<User>, 'fullName' | 'email' | 'avatarUrl'>,
  ): Promise<User | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }
}
