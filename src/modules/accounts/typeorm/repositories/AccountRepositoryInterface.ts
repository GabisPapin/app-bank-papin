import Account from '@modules/accounts/typeorm/entities/Account';

export interface ICreate {
  balance: number;
}

export interface IAccountRepository {
  create({ balance }: ICreate): Promise<Account>;
}
