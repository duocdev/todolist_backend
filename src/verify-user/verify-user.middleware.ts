import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
  private jwtService: JwtService;

  constructor(private moduleRef: ModuleRef) {}

  async use(req: any, res: any, next: () => void) {
    if (!this.jwtService) {
      this.jwtService = this.moduleRef.get(JwtService, { strict: false });
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
        next();
        return;
      } catch (e) {
        console.log(e);
      }
    }
    res.status(401).json({ message: 'Unauthorized', success: false });
    return;
  }
}
