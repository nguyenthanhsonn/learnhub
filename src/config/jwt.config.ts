import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  algorithm: process.env.JWT_ALGORITHM ?? 'HS256',
}));
