import { Request, Response, NextFunction } from 'express';
import sendVerificationMail from '~/utils/sendVerificationMail';
// import jwt from 'jsonwebtoken';
import crypto from 'crypto';

let emailToken: string = 'vide';
const loginController = {

  async login(req: Request, res: Response) {
    console.log('login', req.body);
    res.send("login CA marche !!");
  },
  async signup(req: Request, res: Response) {
    console.log('signup', req.body);
    // res.send("signup ca marche !!")

    // const createToken = (_id: any) => {
    //   const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
    //   return jwt.sign({_id}, jwtSecretKey, {expiresIn: '1'});
    // }
    
    emailToken = crypto.randomBytes(64).toString('hex');
    
    const user: any = {
      name: 'Baptiste',
      email: 'bouketin27@gmail.com',
      emailToken: emailToken,
    }
    sendVerificationMail(user);
  },

  async verifyEmail(req: Request, res: Response) {
    console.log(req.body);
    try {
      // emailTokenCreated = req.body.emailToken;
    } catch (error) {
      console.log(error); 
    }
  },

  async returnToken(req: Request, res: Response) {
    console.log('arrivé token dans back', req.body.emailToken);
    console.log('token created', emailToken);
    console.log('token verified', req.body.emailToken);
    
    if(emailToken === req.body.emailToken) {
      res.send('Token validé !!!!')
    } else {
      res.send('Non validé')
    }
    
  }
};

export default loginController;