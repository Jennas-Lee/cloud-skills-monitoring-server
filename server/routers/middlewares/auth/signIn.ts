import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import tokenFactory from '../../../models/tokens';
import { createToken } from './token';

interface responseDataType {
  email?: string;
  password?: string;
}

const token = tokenFactory();

const validateEmail = (email: string) => {
  let message: string = "";
  const emailRegex = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

  if (email === "" || email === undefined) {
    message = "이메일을 입력하세요.";
  } else if (!emailRegex.test(email)) {
    message = "올바른 형식의 이메일을 입력하세요.";
  }

  return message;
}

const validatePassword = (password: string) => {
  let message: string = "";

  if (password === "" || password === undefined) {
    message = "비밀번호를 입력하세요.";
  }

  return message;
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let res_body: responseDataType = {}
  let res_status = 0;

  res_body.email = validateEmail(email);
  res_body.password = validatePassword(password);

  try {
    if (Object.values(res_body).join('')) {
      res_status = 400;

      return res.status(res_status).json(res_body);
    } else {
      passport.authenticate('local', (passportError, user, info) => {
        if (passportError || !user) {
          res_status = 400;

          if (info.reason === '1') {
            res_body.email = '찾을 수 없는 사용자입니다.';
          } else if (info.reason === '2') {
            res_body.password = '비밀번호가 올바르지 않습니다.';
          } else {
            return next(info.reason);
          }
        } else {
          req.login(user, { session: false }, (loginError) => {
            if (loginError) {
              next(loginError);
            } else {
              const access_token = createToken(false, user);
              const refresh_token = createToken(true);

              token.create({ token: refresh_token.replace('Bearer ', '') });

              res_status = 200;
              res.header('Authorization', access_token);
              res.cookie('Authorization', refresh_token, {
                httpOnly: true,
                maxAge: 28800000,
                signed: true,
                sameSite: 'none',  // TODO: development only
                secure: true
              });
            }
          });
        }
        res.status(res_status).json(res_body);
      })(req, res);
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

export default signIn;