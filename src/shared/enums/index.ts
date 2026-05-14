export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum LessonType {
  VIDEO = 'video',
  PDF = 'pdf',
  TEXT = 'text',
  QUIZ = 'quiz',
}

export enum NotificationType {
  SYSTEM = 'system',
  COURSE = 'course',
  QUIZ = 'quiz',
  COMMENT = 'comment',
}

export enum XpSourceType {
  LESSON_COMPLETED = 'lesson_completed',
  QUIZ_COMPLETED = 'quiz_completed',
  COURSE_COMPLETED = 'course_completed',
  STREAK = 'streak',
}

export enum AiChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}