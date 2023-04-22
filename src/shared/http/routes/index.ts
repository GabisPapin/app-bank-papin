import { Router } from 'express';
import userRouter from '@modules/users/routes/userRoutes';
import sessionsRouter from '@modules/users/routes/sessionsRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import accountRouter from '@modules/accounts/routes/accountRoutes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/account', accountRouter);

export default routes;
