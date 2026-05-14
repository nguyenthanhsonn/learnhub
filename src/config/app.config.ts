import { LogLevel } from '@nestjs/common';

const parseLogLevels = (value?: string): LogLevel[] | false => {
  if (!value) {
    return ['log', 'error', 'warn', 'debug', 'verbose'];
  }

  if (value === 'false') {
    return false;
  }

  return value
    .split(',')
    .map((level) => level.trim())
    .filter(Boolean) as LogLevel[];
};

export const appConfig = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  logger: parseLogLevels(process.env.LOG_LEVELS),
});
