import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

import IUserRepository from '@modules/users/repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashprovider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificar email valido.
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrrect email/password combination', 401);
    }
    // verificação para validação de senhas.
    const passwordMatched = await this.hashprovider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrrect email/password combination', 401);
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}
