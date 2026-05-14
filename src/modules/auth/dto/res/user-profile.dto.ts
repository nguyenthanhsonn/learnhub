import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/shared/enums';

@Exclude()
export class UserProfileDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() fullName: string;
  @Expose() avatarUrl?: string;
  @Expose() role: UserRole;
  @Expose() createdAt: Date;
}
