import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { signJWT } from '../utils/jwt.utils';
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate users password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('wrong email or password');
  }

  // create a session
  const session = await createSession(
    user._id.toString(),
    req.get('user-agent') || ''
  );

  // create an access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>('accessTokenTtl'), // 15m
    }
  );

  // create refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>('refreshTokenTtl'), // 1y
    }
  );

  // return access and refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
