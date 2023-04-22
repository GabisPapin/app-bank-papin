import AccountController from '@modules/accounts/controllers/AccountController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post('/debit/:id', isAuthenticated, accountController.debited);
accountRouter.post('/credit/:id', isAuthenticated, accountController.credited);

export default accountRouter;
