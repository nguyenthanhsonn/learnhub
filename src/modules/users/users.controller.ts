import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/req/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req: Request & { user: User }, @Body() body: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, body);
  }
}
