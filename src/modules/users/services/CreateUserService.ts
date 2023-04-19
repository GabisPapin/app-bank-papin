import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import { IAccountRepository } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';
import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import {
  ICreate,
  IUserRepository,
} from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/erros/AppError';

const BALANCE_DEFAULT = 100.0;
export default class CreateUserService {
  private userRepository: IUserRepository;
  private accountRepository: IAccountRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
  }

  public async execute({ username, email, password }: ICreate): Promise<User> {
    const usernameExists = await this.userRepository.findByName(username);
    const emailExists = await this.userRepository.findByEmail(email);

    if (usernameExists) {
      throw new AppError('Email address already exists.', 404);
    }

    if (emailExists) {
      throw new AppError('Email address already exists.', 404);
    }

    await this.accountRepository.create({
      balance: BALANCE_DEFAULT,
    });

    const user = await this.userRepository.create({
      username,
      email,
      password,
    });

    return user;
  }
}
