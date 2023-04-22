import Account from '@modules/accounts/typeorm/entities/Account';
import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import { IAccountRepository } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';

export default class ShowUserAccountService {
  private accountRepository: IAccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public async showUserAccount(id: string): Promise<Account | null> {
    const account = await this.accountRepository.showUserAccount(id);

    return account;
  }
}
