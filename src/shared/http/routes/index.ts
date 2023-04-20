import { Router } from 'express';
import userRouter from '@modules/users/routes/userRoutes';
import sessionsRouter from '@modules/users/routes/sessionsRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
