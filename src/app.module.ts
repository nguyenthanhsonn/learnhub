import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/data-source';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import * as Joi from 'joi'; // joi sử dụng để validate env
import { CoursesModule } from './modules/courses/courses.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_LOGGING: Joi.boolean().required(),
        LOG_LEVELS: Joi.string().optional(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().optional(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
        JWT_ALGORITHM: Joi.string().default('HS256'),
      }),
      
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    HealthModule,
    AuthModule,
    UsersModule,
    CoursesModule,
  ],
})
export class AppModule {}
