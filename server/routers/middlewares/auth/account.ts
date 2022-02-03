import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Users from '../../../models/users';

import userFactory from '../../../models/users';

const User = userFactory;

const validateName = (name: string) => {
  let message: string = "";

  if (name === "" || name === undefined) {
    message = "이름을 입력하세요.";
  } else if (name.length > 5) {
    message = "이름은 5자 이내로 입력하세요.";
  }

  return message;
}

const validateCompany = (company: string) => {
  let message: string = "";

  if (company === "" || company === undefined) {
    message = "회사 상호명을 입력하세요.";
  } else if (company.length > 30) {
    message = "회사 상호명은 30자 이내로 입력하세요.";
  }

  return message;
}

const validatePassword = (password: string) => {
  let message: string = "";
  const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (password === "" || password === undefined) {
    message = "비밀번호를 입력하세요.";
  } else if (password.length < 8 || password.length > 20) {
    message = "비밀번호는 8~20자 이내로 입력하세요.";
  } else if (!passwordRegex.test(password)) {
    message = "비밀번호는 문자와 숫자, 특수문자를 반드시 포함해야 합니다.";
  }

  return message;
}

const validateConfirmPassword = (password: string, confirm_password: string) => {
  let message: string = "";

  if (confirm_password === "" || confirm_password === undefined) {
    message = "비밀번호 확인을 입력하세요.";
  } else if (confirm_password !== password) {
    message = "비밀번호가 일치하지 않습니다.";
  }

  return message;
}

export interface User {
  name: string;
  email: string;
  company: string;
  password: string;
  isAdmin: boolean;
}

export interface UserRequest extends Request {
  user?: User;
}

const accountGet = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let res_body = {
      "name": "",
      "company": "",
      "email": "",
      "password": "",
      "confirm_password": ""
    }
    let res_status = 0

    const { user } = req;

    res_body.name = user.name;

    if (Object.values(res_body).join('')) {
      res_status = 400;
    } else {
      try {
        // const hash = await bcrypt.hash(password, 15);

        await User().create({
          // password: hash
        });

        res_status = 200;
      } catch (e) {
        console.error(e);
        return next(e)
      }
    }

    return res.status(res_status).json(res_body);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export default accountGet;