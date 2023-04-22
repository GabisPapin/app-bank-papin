import Account from '@modules/accounts/typeorm/entities/Account';
import User from '@modules/users/typeorm/entities/User';

export interface ICreate {
  username: string;
  email: string;
  password: string;
  account: Account;
}

export interface IUpdateUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUpdatePass {
  token: string;
  password: string;
}

export interface IUserRepository {
  create({ username, email, password, account }: ICreate): Promise<User>;
  findByName(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAccountById(id: string): Promise<Account | null>;
  findAll(): Promise<User[]>;
  updateUser({ id, username, email, password }: IUpdateUser): Promise<void>;
  updatePassword({ token, password }: IUpdatePass): Promise<void>;
}
