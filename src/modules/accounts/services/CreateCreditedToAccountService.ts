import Account from '@modules/accounts/typeorm/entities/Account';
import AccountRepository from '@modules/accounts/typeorm/repositories/AccountRepository';
import { IAccountRepository } from '@modules/accounts/typeorm/repositories/AccountRepositoryInterface';
import TransactionRepository from '@modules/transactions/typeorm/repositories/TransactionRepository';
import { ITransactionRepository } from '@modules/transactions/typeorm/repositories/TransactionRepositoryInterface';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/erros/AppError';

interface ICreditedValue {
  id: string;
  value: number;
}

export default class CreateCreditedToAccountService {
  private accountRepository: IAccountRepository;
  private userRepository: IUserRepository;
  private transactionRepository: ITransactionRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async creditedUserAccount({
    id,
    value,
  }: ICreditedValue): Promise<Account | null> {
    const account = await this.userRepository.findAccountById(id);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    const credited = await this.transactionRepository.createTransaction({
      value,
      debitedAccount: account,
      creditedAccount: account,
    });

    const valueCred = credited.value;
    const { balance } = account;

    const totalValue = await this.transactionRepository.sumValues({
      balance,
      value: valueCred,
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
