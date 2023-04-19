import User from '@modules/users/typeorm/entities/User';

export interface ICreate {
  username: string;
  email: string;
  password: string;
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
  create({ username, email, password }: ICreate): Promise<User>;
  findByName(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  updateUser({ id, username, email, password }: IUpdateUser): Promise<void>;
  updatePassword({ token, password }: IUpdatePass): Promise<void>;
}
