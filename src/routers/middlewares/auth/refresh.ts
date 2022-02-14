import { Request, Response, NextFunction } from 'express';

import { createToken, decodeToken, verifyToken } from './token';

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  let access_token: string = req.cookies['Authorization'] || '';
  let refresh_token: string = req.signedCookies['Refresh'] || '';

  console.log(access_token);
  console.log(refresh_token);

  access_token = access_token.replace('Bearer ', '');
  refresh_token = refresh_token.replace('Bearer ', '');

  let res_status = 0;

  try {
    const verifyAccessTokenResult = await verifyToken(access_token, false, next);
    const verifyRefreshTokenResult = await verifyToken(refresh_token, true, next);

    if (verifyAccessTokenResult === 0 && verifyRefreshTokenResult === 0) {
      res_status = 200;
    } else if (verifyAccessTokenResult === 1 && verifyRefreshTokenResult === 0) {
      res_status = 200;
      res.cookie('Authorization', createToken(false, decodeToken(access_token)), {
        httpOnly: false,
        maxAge: 86400000,
        signed: false,
        sameSite: 'none',  // TODO: development only
        secure: true
      });
    } else if (verifyAccessTokenResult === 0 && verifyRefreshTokenResult === 1) {
      res_status = 200;
      res.cookie('Authorization', createToken(true), {
        httpOnly: true,
        maxAge: 86400000,
        signed: true,
        sameSite: 'none',  // TODO: development only
        secure: true
      });
    } else {
      res_status = 401;
    }

    return res.status(res_status).send();
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

export default refresh;