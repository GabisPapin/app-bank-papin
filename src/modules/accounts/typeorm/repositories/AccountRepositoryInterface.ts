import Account from '@modules/accounts/typeorm/entities/Account';

export interface ICreate {
  balance: number;
}

export interface IBalanceUpdate {
  id: string;
  value: number;
}

export interface IAccountRepository {
  create({ balance }: ICreate): Promise<Account>;
  showUserAccount(id: string): Promise<Account | null>;
  addValueAccount({ id, value }: IBalanceUpdate): Promise<void>;
}
