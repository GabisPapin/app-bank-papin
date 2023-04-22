import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import { IAccountRepository } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';
import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import AppError from '@shared/erros/AppError';

export default class ShowAccountUserService {
  private userRepository: IUserRepository;
  private accountRepository: IAccountRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
  }

  public async showAccount(id: string): Promise<object | null> {
    const user = await this.userRepository.findById(id);

    const account = await this.userRepository.findAccountById(id);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    const userAccount = await this.accountRepository.showUserAccount(
      account.id,
    );

    const username = user?.username;

    return {
      username,
      userAccount,
    };
  }
}
