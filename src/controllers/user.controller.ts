import { Request, Response } from 'express';
import { omit } from 'lodash';
import log from '../utils/logger';
import { createUser } from '../services/user.service';
import { CreateUserInput } from '../schema/user.schema';
// import bcrypt from 'bcrypt';
// import config from 'config';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    // return res.send(omit(user.toJSON(), 'password'));
    return res.send(user);
  } catch (e) {
    log.error(e);
    return res.status(409).send();
  }
}
