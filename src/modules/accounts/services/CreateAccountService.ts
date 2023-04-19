import Account from '@modules/accounts/typeorm/entities/Account';
import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import {
  IAccountRepository,
  ICreate,
} from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';

export default class CreateAccountService {
  private accountRepository: IAccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public async execute({ balance }: ICreate): Promise<Account> {
    const account = await this.accountRepository.create({ balance });

    return account;
  }
}
