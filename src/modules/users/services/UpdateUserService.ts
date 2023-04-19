import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import {
  IUpdateUser,
  IUserRepository,
} from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/erros/AppError';

export default class UpdateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute({
    id,
    username,
    email,
    password,
  }: IUpdateUser): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.updateUser({
      id,
      username,
      email,
      password,
    });
  }
}
