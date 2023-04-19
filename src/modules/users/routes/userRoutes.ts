import UserController from '@modules/users/controllers/UserController';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.list);

userRouter.post('/', userController.create);

userRouter.put('/:id', userController.update);

export default userRouter;
