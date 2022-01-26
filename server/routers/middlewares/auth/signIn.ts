import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

import userFactory from '../../../models/users';

const User = userFactory;

const validateEmail = async (email: string) => {
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

const validateUser = async (email: string, password: string) => {
  const hash = await bcrypt.hash(password, 15)
  // TODO: use try-catch
  const user = await User().count({
    where: {
      email: email,
      password: password
    }
  });
  let access_token = "";

  if (user) {
    // TODO: create access token to use jwt
    access_token = "d";
  }

  return access_token;
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    let res_body = {
      "email": "",
      "password": "",
      "access_token": "",
    }
    let res_status = 0

    res_body.email = await validateEmail(email);
    res_body.password = validatePassword(password);

    if (Object.values(res_body).join('')) {
      res_status = 400;
    } else {
      try {
        const hash = await bcrypt.hash(password, 15);
        res_body.access_token = validateUser(email, hash);

        if(res_body.access_token !== "") {
          res_status = 200;
        } else {
          res_status = 403;
          res_body.access_token = "이메일을 찾을 수 없거나 비밀번호가 잘못되었습니다.";
        }
      } catch (e) {
        console.error(e);
        return next(e)
      }
    }

    return res.status(res_status).json(res_body);
  } catch (e) {
    console.error(e);
  }
}

export default signIn;