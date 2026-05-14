import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CourseQueryDto } from './dto/course-query.dto';
import { CourseStatus, UserRole } from '../../shared/enums';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async create(user: User, createCourseDto: CreateCourseDto) {
    this.assertCanManageCourses(user);

    const course = this.coursesRepository.create({
      ...createCourseDto,
      instructorId: user.id,
      slug: await this.generateUniqueSlug(createCourseDto.title),
      level: createCourseDto.level,
      status: createCourseDto.status ?? CourseStatus.DRAFT,
      publishedAt:
        createCourseDto.status === CourseStatus.PUBLISHED
          ? new Date()
          : undefined,
    });

    const savedCourse = await this.coursesRepository.save(course);

    return {
      success: true,
      data: {
        course: this.toCourseResponse(savedCourse),
      },
    };
  }

  async findAll(query: CourseQueryDto) {
    const queryBuilder = this.coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .orderBy('course.createdAt', 'DESC');

    if (query.keyword) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(course.title) LIKE LOWER(:keyword)', {
            keyword: `%${query.keyword}%`,
          }).orWhere('LOWER(course.description) LIKE LOWER(:keyword)', {
            keyword: `%${query.keyword}%`,
          });
        }),
      );
    }

    if (query.categoryId) {
      queryBuilder.andWhere('course.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.level) {
      queryBuilder.andWhere('course.level = :level', { level: query.level });
    }

    if (query.status) {
      queryBuilder.andWhere('course.status = :status', {
        status: query.status,
      });
    }

    const courses = await queryBuilder.getMany();

    return {
      success: true,
      data: {
        courses: courses.map((course) => this.toCourseResponse(course)),
      },
    };
  }

  async findOne(courseId: string) {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: {
        instructor: true,
        category: true,
        sections: {
          lessons: true,
        },
        reviews: {
          user: true,
        },
      },
      order: {
        sections: {
          orderIndex: 'ASC',
          lessons: {
            orderIndex: 'ASC',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Không tìm thấy khóa học');
    }

    return {
      success: true,
      data: {
        course,
      },
    };
  }

  async update(user: User, courseId: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.findCourseOrFail(courseId);
    this.assertCanManageCourse(user, course);

    const statusChangedToPublished =
      updateCourseDto.status === CourseStatus.PUBLISHED &&
      course.status !== CourseStatus.PUBLISHED;

    Object.assign(course, {
      ...updateCourseDto,
      slug: updateCourseDto.title
        ? await this.generateUniqueSlug(updateCourseDto.title, course.id)
        : course.slug,
      publishedAt: statusChangedToPublished ? new Date() : course.publishedAt,
    });

    const updatedCourse = await this.coursesRepository.save(course);

    return {
      success: true,
      data: {
        course: this.toCourseResponse(updatedCourse),
      },
    };
  }

  async remove(user: User, courseId: string) {
    const course = await this.findCourseOrFail(courseId);
    this.assertCanManageCourse(user, course);

    await this.coursesRepository.remove(course);

    return {
      success: true,
      message: 'Xóa khóa học thành công',
    };
  }

  private assertCanManageCourses(user: User) {
    if (user.role !== UserRole.INSTRUCTOR && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Chỉ giảng viên mới có thể quản lý khóa học');
    }
  }

  private assertCanManageCourse(user: User, course: Course) {
    this.assertCanManageCourses(user);

    if (user.role !== UserRole.ADMIN && course.instructorId !== user.id) {
      throw new ForbiddenException('Bạn không có quyền quản lý khóa học này');
    }
  }

  private async findCourseOrFail(courseId: string) {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Không tìm thấy khóa học');
    }

    return course;
  }

  private async generateUniqueSlug(title: string, ignoreCourseId?: string) {
    const baseSlug = this.toSlug(title);
    let slug = baseSlug;
    let index = 1;

    while (await this.isSlugTaken(slug, ignoreCourseId)) {
      slug = `${baseSlug}-${index}`;
      index += 1;
    }

    return slug;
  }

  private async isSlugTaken(slug: string, ignoreCourseId?: string) {
    const course = await this.coursesRepository.findOne({
      where: { slug },
    });

    return Boolean(course && course.id !== ignoreCourseId);
  }

  private toSlug(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private toCourseResponse(course: Course) {
    return {
      id: course.id,
      instructorId: course.instructorId,
      categoryId: course.categoryId,
      title: course.title,
      slug: course.slug,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      level: course.level,
      status: course.status,
      averageRating: course.averageRating,
      totalStudents: course.totalStudents,
      publishedAt: course.publishedAt,
      createdAt: course.createdAt,
    };
  }
}
