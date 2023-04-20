import AppError from '@shared/erros/AppError';
import * as Joi from 'joi';

interface ICreateVerify {
  username: string;
  email: string;
  password: string;
}

export function createVerify({
  username,
  email,
  password,
}: ICreateVerify): void {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { value, error } = schema.validate({ username, email, password });

  if (error) {
    throw new AppError(error.message, 400);
  }
}

export function updateVerify({
  username,
  email,
  password,
}: ICreateVerify): void {
  const schema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  });

  const { value, error } = schema.validate({ username, email, password });

  if (error) {
    throw new AppError(error.message, 400);
  }
}
