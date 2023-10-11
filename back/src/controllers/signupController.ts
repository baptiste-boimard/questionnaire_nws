import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import crypto from 'crypto';
import sendVerificationMail from '~/utils/sendVerificationMail';
import CustomError from '~/handlers/CustomError';


const signupController: any = {

  async signup(req: Request, res: Response, next:NextFunction) {
    console.log('signup', req.body);
    if (req.body.email === '' || req.body.password === '') {
      const error = new CustomError('Vous devez taper un email et un mot de passe')
      next(error);
    } else {
      try {
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        });

        if(user) {
          console.log(user.dataValues);
          if(user.dataValues.registred === true && user.dataValues.emailToken === null) {
            const error = new CustomError('Un utiliisateur existe déjà avec cet email');   
            next(error);
          }
          if(user.dataValues.registred === false && user.dataValues.email !== null) {
            const error = new CustomError('Vous devez terminer l\'étape de vérification, vérifier vos emails');
            next(error);
          }
        } else {
  
          const emailToken = crypto.randomBytes(64).toString('hex');
      
          const newUser: any = new User({
            email: req.body.email,
            password: req.body.password,
            registred: false,
            emailToken: emailToken,
          });
          await newUser.save();
          
          const sucessSend = await sendVerificationMail(newUser);

          if(sucessSend) {
            res.send('Un email de vérification vient de nous être envoyé');
          } else {
            const error = new CustomError('Une erreur s\'est produite durant l\'envoi du mail');
            next(error)
          }
          
        
        }
      } catch (error) {
        throw new CustomError('Une erreur s\'est produit, veuillez recommencer')
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