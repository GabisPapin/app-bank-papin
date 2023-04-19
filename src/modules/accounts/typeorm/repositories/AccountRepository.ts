import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import Account from '@modules/accounts/typeorm/entities/Account';
import { ICreate } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';

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
}
