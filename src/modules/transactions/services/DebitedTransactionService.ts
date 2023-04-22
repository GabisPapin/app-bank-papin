import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import TransactionRepository from '@modules/transactions/typeorm/repositories/TransactionRepository';
import {
  IDebitedAccount,
  ITransactionRepository,
} from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';

export default class DebitedTransactionService {
  private transactionRepository: ITransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  public async debitedTransaction({
    value,
    debitedAccount,
  }: IDebitedAccount): Promise<Transaction> {
    const valueDebited = await this.transactionRepository.debitedAccount({
      value,
      debitedAccount,
    });

    return valueDebited;
  }
}
