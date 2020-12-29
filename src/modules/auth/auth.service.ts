import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../db/models/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../../utils/types/graphql';

interface IVerifyPassword {
  inputPassword: string;
  encryptedPassword: string;
}

@Injectable()
export class AuthService {
  constructor(
    public readonly configService: ConfigService,
    @InjectRepository(User)
    public readonly User: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser({ email, password }: { email: string; password: string }): Promise<User | null> {
    const userDB = await this.User.findOne({
      where: {
        email,
      },
    });
    if (!userDB) throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.CONFLICT);
    const passwordsMatches = await this.verifyPassword({
      inputPassword: password,
      encryptedPassword: userDB.password,
    });
    if (!passwordsMatches) throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.CONFLICT);
    return userDB;
  }

  public async getEncryptedCredentials(password: string, github = false, google = false): Promise<string> {
    if (!this.configService.get('GOOGLE_PASS') || !this.configService.get('GITHUB_PASS')) {
      throw new Error('Variables de entorno google pass y github pass no definidas...');
    }
    let finalPass = password;
    if (github) finalPass = process.env.GITHUB_PASS;
    else if (google) finalPass = process.env.GOOGLE_PASS;
    else finalPass = await bcrypt.hash(finalPass, 10);
    return finalPass;
  }

  public async verifyPassword({ inputPassword, encryptedPassword }: IVerifyPassword): Promise<boolean> {
    return await bcrypt.compare(inputPassword, encryptedPassword);
  }

  public getToken({ id, email, roles = [] }: AuthUser): string {
    return this.jwtService.sign({ id, email, roles });
  }
}
