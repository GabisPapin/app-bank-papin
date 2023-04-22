import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import {
  ICreateTransaction,
  IValues,
} from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';

export default class TransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Transaction);
  }

  public async createTransaction({
    value,
    debitedAccount,
    creditedAccount,
  }: ICreateTransaction): Promise<Transaction> {
    const valueDebited = this.ormRepository.create({
      value,
      debitedAccount,
      creditedAccount,
    });

    await this.ormRepository.save(valueDebited);

    return valueDebited;
  }

  public async subValues({ balance, value }: IValues): Promise<number> {
    const total = balance - value;

    return total;
  }

  public async sumValues({ balance, value }: IValues): Promise<number> {
    const total = Number(balance) + Number(value);

    return total;
  }
}
