import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import {
  ICreate,
  IUserRepository,
} from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/erros/AppError';

export default class CreateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({ username, email, password }: ICreate): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists.', 404);
    }

    const user = await this.userRepository.create({
      username,
      email,
      password,
    });

    return user;
  }
}
