import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import UserToken from '@modules/users/typeorm/entities/UserToken';

export default class UserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOneBy({ token });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
