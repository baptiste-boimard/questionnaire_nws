import { Request, Response, NextFunction } from 'express';

const loginController = {

  async login(req: Request, res: Response) {
    console.log('login', req.body);
    res.send("login CA marche !!");
  },
};

export default loginController;