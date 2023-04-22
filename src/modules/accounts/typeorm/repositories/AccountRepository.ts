import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import Account from '@modules/accounts/typeorm/entities/Account';
import {
  IBalanceUpdate,
  ICreate,
} from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';

export default class AccountRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Account);
  }

  public async create({ balance }: ICreate): Promise<Account> {
    const account = this.ormRepository.create({ balance });

    await this.ormRepository.save(account);

    return account;
  }

  public async showUserAccount(id: string): Promise<Account | null> {
    const account = await this.ormRepository.findOneBy({ id });

    return account;
  }

  public async addValueAccount({ id, value }: IBalanceUpdate): Promise<void> {
    await this.ormRepository.update(id, { balance: value });
  }
}
