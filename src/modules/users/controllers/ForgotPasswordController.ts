import { Request, Response } from 'express';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';
import { emailVerify } from '@modules/users/middlewares/UserVerify';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    emailVerify({ email });

    const sendForgotPassword = new SendForgotPasswordService();

    await sendForgotPassword.execute({
      email,
    });

    return res.status(204).end();
  }
}
