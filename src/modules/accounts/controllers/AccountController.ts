import CreateCreditedToAccountService from '@modules/accounts/services/CreateCreditedToAccountService';
import CreateDebitedToAccountService from '@modules/accounts/services/CreateDebitedToAccountService';
import { Request, Response } from 'express';

export default class AccountController {
  public async debited(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { value } = req.body;

    const debitedAccount = new CreateDebitedToAccountService();

    const accountUpdated = await debitedAccount.debitedUserAccount({
      id,
      value,
    });

    return res.status(200).json(accountUpdated);
  }

  public async credited(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { value } = req.body;

    const creditedAccount = new CreateCreditedToAccountService();

    const accountUpdated = await creditedAccount.creditedUserAccount({
      id,
      value,
    });

    return res.status(200).json(accountUpdated);
  }
}
