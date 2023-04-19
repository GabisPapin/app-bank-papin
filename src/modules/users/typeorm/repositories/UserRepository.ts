import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { hash } from 'bcryptjs';
import {
  ICreate,
  IUpdatePass,
  IUpdateUser,
} from '@modules/users/typeorm/repositories/UserRepositoryInterface';

const EIGHT = 8;

export default class UserRepository {
  private ormRepository: Repository<User>;
  private ormTokenRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
    this.ormTokenRepository = dataSource.getRepository(UserToken);
  }

  public async create({ username, email, password }: ICreate): Promise<User> {
    const hashedPass = await hash(password, EIGHT);

    const user = this.ormRepository.create({
      username,
      email,
      password: hashedPass,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByName(username: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ username });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async updateUser({
    id,
    username,
    email,
    password,
  }: IUpdateUser): Promise<void> {
    const hashedPass = await hash(password, EIGHT);
    await this.ormRepository.update(id, {
      username,
      email,
      password: hashedPass,
    });
  }

  public async updatePassword({ token, password }: IUpdatePass): Promise<void> {
    const userToken = await this.ormTokenRepository.findOneBy({ token });

    if (!userToken) {
      throw new Error('token not found.');
    }

    const hashedPass = await hash(password, EIGHT);

    await this.ormRepository.update(userToken.user_id, {
      password: hashedPass,
    });
  }
}
