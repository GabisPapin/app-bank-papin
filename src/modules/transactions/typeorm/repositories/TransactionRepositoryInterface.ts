import Account from '@modules/accounts/typeorm/entities/Account';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';

export interface IDebitedAccount {
  value: number;
  debitedAccount: Account;
  creditedAccount: Account;
}

export interface ISumValue {
  balance: number;
  value: number;
}

export interface ITransactionRepository {
  debitedAccount({
    value,
    debitedAccount,
    creditedAccount,
  }: IDebitedAccount): Promise<Transaction>;
  subValues({ balance, value }: ISumValue): Promise<number>;
}
