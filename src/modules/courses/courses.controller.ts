import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { User } from '../users/entities/user.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Req() req: Request & { user: User },
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.coursesService.create(req.user, createCourseDto);
  }

  @Get()
  findAll(@Query() query: CourseQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }

  @Put(':courseId')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: Request & { user: User },
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(req.user, courseId, updateCourseDto);
  }

  @Delete(':courseId')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Req() req: Request & { user: User },
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.remove(req.user, courseId);
  }
}
