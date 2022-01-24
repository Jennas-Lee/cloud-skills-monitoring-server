import { Request, Response, NextFunction } from 'express';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    res.status(200).json({
      message: '테스트'
    });
  } catch (e) {
    console.error(e);
  }
}

export default signUp;