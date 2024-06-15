import { CookieOptions } from 'express-serve-static-core';

export function getDefaultCokieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: process.env.SECURE_COOKIE === 'true' ? 'none' : 'lax',
    secure: process.env.SECURE_COOKIE === 'true',
  };
}
