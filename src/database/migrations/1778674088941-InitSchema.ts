import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1778674088941 implements MigrationInterface {
    name = 'InitSchema1778674088941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying, "parent_id" uuid, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "course_id" uuid NOT NULL, "progress_percent" double precision NOT NULL DEFAULT '0', "enrolled_at" TIMESTAMP NOT NULL DEFAULT now(), "completed_at" TIMESTAMP, CONSTRAINT "UQ_647c6bda9ead37b702421710fde" UNIQUE ("user_id", "course_id"), CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enrollment_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "last_position_sec" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_db0cdb221e98de3ff32470ecfed" UNIQUE ("enrollment_id", "lesson_id"), CONSTRAINT "PK_e6223ebbc5f8f5fce40e0193de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quiz_id" uuid NOT NULL, "content" text NOT NULL, "options" jsonb NOT NULL, "correct_answer" text NOT NULL, "order_index" integer NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_attempts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "quiz_id" uuid NOT NULL, "score" integer NOT NULL, "total_questions" integer NOT NULL, "answers" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a84a93fb092359516dc5b325b90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lesson_id" uuid NOT NULL, "title" character varying NOT NULL, "is_ai_generated" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "lesson_id" uuid NOT NULL, "parent_id" uuid, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ai_chat_messages_role_enum" AS ENUM('user', 'assistant', 'system')`);
        await queryRunner.query(`CREATE TABLE "ai_chat_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_id" uuid NOT NULL, "role" "public"."ai_chat_messages_role_enum" NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_68e330d1b2a3c5368bf6d2f67cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ai_chat_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "lesson_id" uuid, "started_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b4f4844c31ab277de498502d1cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lessons_type_enum" AS ENUM('video', 'pdf', 'text', 'quiz')`);
        await queryRunner.query(`CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section_id" uuid NOT NULL, "title" character varying NOT NULL, "type" "public"."lessons_type_enum" NOT NULL DEFAULT 'video', "video_url" character varying, "pdf_url" character varying, "duration_seconds" integer, "order_index" integer NOT NULL, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "course_id" uuid NOT NULL, "title" character varying NOT NULL, "order_index" integer NOT NULL, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "course_id" uuid NOT NULL, "rating" integer NOT NULL, "comment" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9ff923e5e0756de67cb051a2af0" UNIQUE ("user_id", "course_id"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."courses_level_enum" AS ENUM('beginner', 'intermediate', 'advanced')`);
        await queryRunner.query(`CREATE TYPE "public"."courses_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "instructor_id" uuid NOT NULL, "category_id" uuid, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "thumbnail_url" character varying, "level" "public"."courses_level_enum" NOT NULL DEFAULT 'beginner', "status" "public"."courses_status_enum" NOT NULL DEFAULT 'draft', "average_rating" double precision NOT NULL DEFAULT '0', "total_students" integer NOT NULL DEFAULT '0', "published_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a" UNIQUE ("slug"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gamification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "xp_total" integer NOT NULL DEFAULT '0', "level" integer NOT NULL DEFAULT '1', "streak_days" integer NOT NULL DEFAULT '0', "last_activity_date" date, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f1b67c9ddd06d97a81a91e2ea75" UNIQUE ("user_id"), CONSTRAINT "REL_f1b67c9ddd06d97a81a91e2ea7" UNIQUE ("user_id"), CONSTRAINT "PK_e24e36fa415495cb1eeeb48c7f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('system', 'course', 'quiz', 'comment')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "title" character varying NOT NULL, "message" text, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'instructor', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "refresh_token" text, "avatar_url" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'student', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."xp_transactions_source_type_enum" AS ENUM('lesson_completed', 'quiz_completed', 'course_completed', 'streak')`);
        await queryRunner.query(`CREATE TABLE "xp_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "xp_amount" integer NOT NULL, "source_type" "public"."xp_transactions_source_type_enum" NOT NULL, "source_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_143e97bb9eccbc09ac6a341f2cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_ff997f5a39cd24a491b9aca45c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_2374c15822383f7e5362e27d417" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_980e74721039ebe210fee2eeca2" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_46b3c125e02f7242662e4ccb307" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_attempts" ADD CONSTRAINT "FK_1701aaf48f6a78e96bfe08dd395" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_attempts" ADD CONSTRAINT "FK_a720e260138b64fcff2fca19b2d" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_65d99dcda0000a2cae7a68f9fc5" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d6f93329801a93536da4241e386" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" ADD CONSTRAINT "FK_b7ae07cefc0a6e7f8e29302141a" FOREIGN KEY ("session_id") REFERENCES "ai_chat_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_chat_sessions" ADD CONSTRAINT "FK_2caed33de83f506b39f70d71775" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_chat_sessions" ADD CONSTRAINT "FK_bc9e644343cbeb8f113d24d6965" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_19261e484ffd22b40ea596ece4d" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_53ccbd6e2fa20dac9062f4f4c36" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_f99062f36181ab42863facfaea3" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_4fdc83dd6b261101401ec259342" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e4c260fe6bb1131707c4617f745" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gamification" ADD CONSTRAINT "FK_f1b67c9ddd06d97a81a91e2ea75" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "xp_transactions" ADD CONSTRAINT "FK_e1d8b6f158bb15f29674ff3f811" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xp_transactions" DROP CONSTRAINT "FK_e1d8b6f158bb15f29674ff3f811"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "gamification" DROP CONSTRAINT "FK_f1b67c9ddd06d97a81a91e2ea75"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e4c260fe6bb1131707c4617f745"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_4fdc83dd6b261101401ec259342"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_f99062f36181ab42863facfaea3"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_53ccbd6e2fa20dac9062f4f4c36"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_19261e484ffd22b40ea596ece4d"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_sessions" DROP CONSTRAINT "FK_bc9e644343cbeb8f113d24d6965"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_sessions" DROP CONSTRAINT "FK_2caed33de83f506b39f70d71775"`);
        await queryRunner.query(`ALTER TABLE "ai_chat_messages" DROP CONSTRAINT "FK_b7ae07cefc0a6e7f8e29302141a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d6f93329801a93536da4241e386"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_65d99dcda0000a2cae7a68f9fc5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b"`);
        await queryRunner.query(`ALTER TABLE "quiz_attempts" DROP CONSTRAINT "FK_a720e260138b64fcff2fca19b2d"`);
        await queryRunner.query(`ALTER TABLE "quiz_attempts" DROP CONSTRAINT "FK_1701aaf48f6a78e96bfe08dd395"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_46b3c125e02f7242662e4ccb307"`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_980e74721039ebe210fee2eeca2"`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_2374c15822383f7e5362e27d417"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_ff997f5a39cd24a491b9aca45c9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`DROP TABLE "xp_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."xp_transactions_source_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "gamification"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TYPE "public"."courses_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."courses_level_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "sections"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`DROP TYPE "public"."lessons_type_enum"`);
        await queryRunner.query(`DROP TABLE "ai_chat_sessions"`);
        await queryRunner.query(`DROP TABLE "ai_chat_messages"`);
        await queryRunner.query(`DROP TYPE "public"."ai_chat_messages_role_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_attempts"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "lesson_progress"`);
        await queryRunner.query(`DROP TABLE "enrollments"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
