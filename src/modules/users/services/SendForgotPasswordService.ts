import EtherealMail from '@config/mail/EtherealMail';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import UserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepositoryInterface';
import AppError from '@shared/erros/AppError';
import path from 'path';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordService {
  private userRepository: IUserRepository;
  private userTokenRepository: IUserTokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.userTokenRepository = new UserTokenRepository();
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.username,
        email: user.email,
      },
      subject: '[Bank Papin] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.username,
          link: `${process.env.APP_WEB_URL}/reset_pass?token=${token}`,
        },
      },
    });
  }
}
