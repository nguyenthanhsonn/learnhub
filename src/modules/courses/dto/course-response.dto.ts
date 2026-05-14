import { CourseLevel, CourseStatus } from '../../../shared/enums';

export class CourseResponseDto {
  id: string;
  instructorId: string;
  categoryId?: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  level: CourseLevel;
  status: CourseStatus;
  averageRating: number;
  totalStudents: number;
  publishedAt?: Date;
  createdAt: Date;
}
