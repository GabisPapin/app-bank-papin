import { IAccountRepository } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';
import { ITransactionRepository } from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import TransactionRepository from '@modules/transactions/typeorm/repositories/TransactionRepository';
import AppError from '@shared/erros/AppError';
import Account from '@modules/accounts/typeorm/entities/Account';

interface IDebitedValue {
  id: string;
  value: number;
}

export default class DebitedAccountService {
  private accountRepository: IAccountRepository;
  private userRepository: IUserRepository;
  private transactionRepository: ITransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async debitedUserAccount({
    id,
    value,
  }: IDebitedValue): Promise<Account | null> {
    const account = await this.userRepository.findAccountById(id);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    const debited = await this.transactionRepository.debitedAccount({
      value,
      debitedAccount: account,
      creditedAccount: account,
    });

    const valueDebt = debited.value;
    const { balance } = account;

    const totalValue = await this.transactionRepository.subValues({
      balance,
      value: valueDebt,
    });

    await this.accountRepository.addValueAccount({
      id: account.id,
      value: totalValue,
    });

    const accountUpdated = await this.accountRepository.showUserAccount(
      account.id,
    );

    return accountUpdated;
  }
}
