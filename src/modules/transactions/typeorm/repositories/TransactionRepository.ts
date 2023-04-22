import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import {
  IDebitedAccount,
  ISumValue,
} from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';

export default class TransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Transaction);
  }

  public async debitedAccount({
    value,
    debitedAccount,
    creditedAccount,
  }: IDebitedAccount): Promise<Transaction> {
    const valueDebited = this.ormRepository.create({
      value,
      debitedAccount,
      creditedAccount,
    });

    await this.ormRepository.save(valueDebited);
    console.log(valueDebited);

    return valueDebited;
  }

  public async subValues({ balance, value }: ISumValue): Promise<number> {
    const total = balance - value;

    return total;
  }
}
