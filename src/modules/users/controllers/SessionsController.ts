import { sessionsVerify } from '@modules/users/middlewares/UserVerify';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { Request, Response } from 'express';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    sessionsVerify({ username, password });

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      username,
      password,
    });

    return res.status(200).json({ user });
  }
}
