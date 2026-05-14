import { UserProfileDto } from './user-profile.dto';

export class AuthResponseDto {
  success: true;
  data: {
    accessToken?: string;
    refreshToken?: string;
    user: UserProfileDto;
  };
}