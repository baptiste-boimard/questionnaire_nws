import { Request, Response, NextFunction } from 'express';
const loginController = {

  async login(req: Request, res: Response) {
    console.log('login', req.body);
    res.send("login CA marche !!");
  },
  async signup(req: Request, res: Response) {
    console.log('signup', req.body);
    res.send("signup ca marche !!")
    
  }
};

export default loginController;