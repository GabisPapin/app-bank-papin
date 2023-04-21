import AppError from '@shared/erros/AppError';
import * as Joi from 'joi';

interface ICreateVerify {
  username: string;
  email: string;
  password: string;
}

interface IConfirmation {
  password: string;
  password_confirmation: string;
  token: string;
}

interface IEmailVerify {
  email: string;
}

interface ISessionsVerify {
  username: string;
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

export function passwordConfirmation({
  password,
  password_confirmation,
  token,
}: IConfirmation): void {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string()
      .min(8)
      .required()
      .valid(Joi.ref('password')),
    token: Joi.string().required(),
  });

  const { value, error } = schema.validate({
    password,
    password_confirmation,
    token,
  });

  if (error) {
    throw new AppError(error.message, 400);
  }
}

export function emailVerify({ email }: IEmailVerify): void {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { value, error } = schema.validate({ email });

  if (error) {
    throw new AppError(error.message, 400);
  }
}

export function sessionsVerify({ username, password }: ISessionsVerify): void {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { value, error } = schema.validate({ username, password });

  if (error) {
    throw new AppError(error.message, 400);
  }
}
