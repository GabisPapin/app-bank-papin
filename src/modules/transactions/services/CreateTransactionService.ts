import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import TransactionRepository from '@modules/transactions/typeorm/repositories/TransactionRepository';
import {
  ICreateTransaction,
  ITransactionRepository,
} from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';

export default class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  public async createTransaction({
    value,
    debitedAccount,
    creditedAccount,
  }: ICreateTransaction): Promise<Transaction> {
    const valueDebited = await this.transactionRepository.createTransaction({
      value,
      debitedAccount,
      creditedAccount,
    });

    return valueDebited;
  }
}
