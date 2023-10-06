import { Request, Response, NextFunction } from 'express';
import sendVerificationMail from '~/utils/sendVerificationMail';
const loginController = {

  async login(req: Request, res: Response) {
    console.log('login', req.body);
    res.send("login CA marche !!");
  },
  async signup(req: Request, res: Response) {
    console.log('signup', req.body);
    // res.send("signup ca marche !!")

    const user: any = {
      name: 'Baptiste',
      email: 'bouketin27@gmail.com',
      emailToken: 'ldkfdlkfdlf',
    }

    sendVerificationMail(user);
    


    
  }
};

export default loginController;