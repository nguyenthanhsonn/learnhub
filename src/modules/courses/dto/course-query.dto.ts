import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CourseLevel, CourseStatus } from '../../../shared/enums';

export class CourseQueryDto {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsEnum(CourseLevel)
  @IsOptional()
  level?: CourseLevel;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;
}
