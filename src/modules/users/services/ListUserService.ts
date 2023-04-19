import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';

export default class ListUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(): Promise<User[]> {
    const user = await this.userRepository.findAll();

    return user;
  }
}
