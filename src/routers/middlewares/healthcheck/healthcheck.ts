import { Request, Response, NextFunction } from 'express';

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send();
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export default healthCheck;