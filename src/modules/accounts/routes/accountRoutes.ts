import AccountController from '@modules/accounts/controllers/AccountController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.patch('/:id', isAuthenticated, accountController.debited);

export default accountRouter;
