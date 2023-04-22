import Account from '@modules/accounts/typeorm/entities/Account';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';

export interface ICreateTransaction {
  value: number;
  debitedAccount: Account;
  creditedAccount: Account;
}

export interface IValues {
  balance: number;
  value: number;
}

export interface ITransactionRepository {
  createTransaction({
    value,
    debitedAccount,
    creditedAccount,
  }: ICreateTransaction): Promise<Transaction>;
  subValues({ balance, value }: IValues): Promise<number>;
  sumValues({ balance, value }: IValues): Promise<number>;
}
