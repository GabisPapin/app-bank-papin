import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';
import { Router } from 'express';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);

passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
