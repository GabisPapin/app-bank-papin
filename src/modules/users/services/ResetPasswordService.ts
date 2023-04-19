import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import UserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepositoryInterface';
import AppError from '@shared/erros/AppError';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

const AMOUNT_TWO = 2;

export default class ResetPasswordService {
  private userRepository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokenRepository();
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const comparedDate = addHours(tokenCreatedAt, AMOUNT_TWO);

    if (isAfter(Date.now(), comparedDate)) {
      throw new AppError('Token expired.');
    }

    await this.userRepository.updatePassword({ token, password });
  }
}
