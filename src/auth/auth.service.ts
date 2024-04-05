import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Collection, Db } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/registerDTO';
import { LoginDTO } from './dto/loginDTO';

@Injectable()
export class AuthService {
  authCollection: Collection;
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private jwtService: JwtService,
  ) {
    this.authCollection = db.collection('users');
  }

  async register(registerObj: RegisterDTO): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerObj.password, 10);
    const result = await this.authCollection.insertOne({
      ...registerObj,
      password: hashedPassword,
    });

    if (result.acknowledged && result.insertedId) {
      return { success: true, message: 'Registered successfully!' };
    } else {
      return { success: false, message: 'Registration failed!' };
    }
  }

  async login(loginObj: LoginDTO): Promise<any> {
    const user = await this.authCollection.findOne({ email: loginObj.email });
    if (!user) {
      return { success: false, message: 'User not found!' };
    }

    const isValidPassword = await bcrypt.compare(
      loginObj.password,
      user.password,
    );
    if (!isValidPassword) {
      return { success: false, message: 'Invalid password!' };
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Logged in successfully!',
      access_token: token,
    };
  }
}
