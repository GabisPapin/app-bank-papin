import DebitedAccountService from '@modules/accounts/services/DebitedAccountService';
import { Request, Response } from 'express';

export default class AccountController {
  public async debited(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { value } = req.body;

    const debitedAccount = new DebitedAccountService();

    const accountUpdated = await debitedAccount.debitedUserAccount({
      id,
      value,
    });

    return res.status(200).json(accountUpdated);
  }
}
