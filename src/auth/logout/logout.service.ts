import { Response } from 'express';

import { Injectable } from '@nestjs/common';

import { getDefaultCokieOptions } from '../cookies';

@Injectable()
export class LogoutService {
  async logout(res: Response): Promise<void> {
    res.cookie('app-cookie', '', {
      ...getDefaultCokieOptions(),
      expires: new Date(),
    });
    res.clearCookie('app-cookie');
    res.status(200);
  }
}
