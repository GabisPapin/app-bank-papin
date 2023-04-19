import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/erros/AppError';
import tokenSignature from '@config/auth';
import { compare } from 'bcryptjs';

interface ICreateSession {
  username: string;
  password: string;
}

interface IResponseSession {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({
    username,
    password,
  }: ICreateSession): Promise<IResponseSession> {
    const user = await this.userRepository.findByName(username);

    if (!user) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const token = tokenSignature(user.id);

    return {
      user,
      token,
    };
  }
}
