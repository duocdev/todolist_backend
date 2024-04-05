import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseProvider } from 'src/database/database.provider';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'masterDuoc',
  signOptions: { expiresIn: '60m' },
});

@Module({
  imports: [jwtModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseProvider],
})
export class AuthModule {}
