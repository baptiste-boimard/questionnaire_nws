import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import crypto from 'crypto';
import sendVerificationMail from '~/utils/sendVerificationMail';
import { UnknownConstraintError } from 'sequelize';


const signupController = {

  async signup(req: Request, res: Response, next:NextFunction) {
    console.log('signup', req.body);
    if (req.body.email === '' || req.body.password === '') {
      console.log('erreur');
      const error = 'Entrer un mail ou pass';
      // const error = new Error('Vous devez entrer un email et un mot de passe');
      // console.log(error, 'creation');
      
      next(error);
    } else {
      try {
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        });
        if(user) {
          console.log('user trouvé');
        } else {
          console.log('notuser');
  
          const emailToken = crypto.randomBytes(64).toString('hex');
      
          const newUser: any = new User({
            email: 'bouketin27@gmail.com',
            password: req.body.password,
            registred: false,
            emailToken: emailToken,
          });
          await newUser.save();
  
          console.log('newUser ennrengisté');
  
          sendVerificationMail(newUser);
        }
      } catch (error) {
        console.log(error);
        
      }
    }   
  },

  async returnToken(req: Request, res: Response) {

    const userTryRegister: any = await User.findOne({
      where: {
        emailToken: req.body.emailToken,
      }
    });

    if(userTryRegister) {
      userTryRegister.registred = true;
      userTryRegister.emailToken = null;

      await userTryRegister.save();

      console.log('fini regsiter');
    
    } else {
      console.log('problem ^^');
      
    }
  }

};

export default signupController;