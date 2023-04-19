import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';
import { Router } from 'express';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/resetpass', resetPasswordController.create);

export default passwordRouter;
