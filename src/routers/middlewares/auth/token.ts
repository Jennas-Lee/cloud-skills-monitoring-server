import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import tokenFactory from '../../../models/tokens';

export interface payloadDataType {
  user?: string;
  isAdmin?: boolean;
}

const ACCESS_SECRET_KEY: string = process.env.EXPRESS_APP_ACCESS_SECRET_KEY || 'jwt-access-secret-key';
const REFRESH_SECRET_KEY: string = process.env.EXPRESS_APP_REFRESH_SECRET_KEY || 'jwt-refresh-secret-key';

const token = tokenFactory();

export const createToken = (type: boolean, user?: any): string => {
  const payload: payloadDataType = {}
  const SECRET: string = type ? REFRESH_SECRET_KEY : ACCESS_SECRET_KEY;
  const EXPIRES_IN: string = type ? '8h' : '1m';

  // access token
  if (!type) {
    payload.user = user.id || user.user;
    payload.isAdmin = user.isAdmin;
  }

  return `Bearer ${jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })}`;
}

export const decodeToken = (tokenValue: string): JwtPayload | null => {
  return jwt.decode(tokenValue, { json: true });
}

export const verifyToken = async (tokenValue: string, type: boolean, next: NextFunction): Promise<number> => {
  const SECRET: string = type ? REFRESH_SECRET_KEY : ACCESS_SECRET_KEY;
  let result: number = 2;

  await jwt.verify(
    tokenValue,
    SECRET,
    async (err) => {
      try {
        if (err) {
          switch (err.name) {
            case 'TokenExpiredError':
              result = 1;
              break;
            case 'JsonWebTokenError':
              result = 2;
              break;
            default:
              result = 2;
          }
        } else {
          if (type) {
            const tokenExists = await token.count({ where: { token: tokenValue } })

            if (tokenExists) {
              result = 0;
            } else {
              result = 2;
            }
          } else {
            result = 0;
          }
        }
      } catch (e) {
        console.error(e);
        next(e);
      }
    });

  return result;
}
