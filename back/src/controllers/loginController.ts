import { Request, Response, NextFunction } from 'express';
const loginController = {

  async login(req: Request, res: Response) {
    console.log('login', req.body);
    res.send("CA marche !!");
  },
  async signup() {
    console.log('signup');
    
  }
};

export default loginController;