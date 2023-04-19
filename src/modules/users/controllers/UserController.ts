import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { createVerify } from '@modules/users/middlewares/UserVerify';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

export default class UserController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return res.status(200).json({ users });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, password, account } = req.body;

    createVerify({
      username,
      email,
      password,
    });

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      username,
      email,
      password,
      account,
    });

    return res.status(201).json(instanceToPlain(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { username, email, password } = req.body;

    createVerify({
      username,
      email,
      password,
    });

    const updateUser = new UpdateUserService();

    await updateUser.execute({
      id,
      username,
      email,
      password,
    });

    return res.status(201).json({ message: 'User updated successfuly' });
  }
}
