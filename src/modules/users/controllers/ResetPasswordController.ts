import { passwordConfirmation } from '@modules/users/middlewares/UserVerify';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, password_confirmation, token } = req.body;

    passwordConfirmation({ password, password_confirmation, token });

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      token,
      password,
    });

    return res.status(204).end();
  }
}
