import { Request } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import userFactory from '../models/users';

import { payloadDataType } from '../routers/middlewares/auth/token';

interface jwtPayload extends payloadDataType {
  iat: string
  exp: string
}

const ACCESS_SECRET_KEY: string = process.env.EXPRESS_APP_ACCESS_SECRET_KEY || 'jwt-access-secret-key';


const User = userFactory();

const jwtPassportConfig = {
  secretOrKey: ACCESS_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
}

const JwtPassportVerify = async (req: Request, payload: jwtPayload, done: any) => {
  try {
    const user = await User.findByPk(payload.user);

    return user ? done(null, user) : done('user not found', false);
  } catch (e) {
    console.error(e);
    done(e, false);
  }
}

export const jwtPassportReady = () => {
  passport.use('jwt', new JwtStrategy(jwtPassportConfig, JwtPassportVerify));
}

