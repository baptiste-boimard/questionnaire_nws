import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import crypto from 'crypto';
import sendVerificationMail from '~/utils/sendVerificationMail';
import CustomError from '~/handlers/CustomError';
const bcrypt = require('bcrypt');


const signupController: any = {

  //Requete de demande d'inscription
  async signup(req: Request, res: Response, next:NextFunction) {
    
    //Si les champs d'inscription sont vides
    if (req.body.email === '' || req.body.password === '') {
      const error = new CustomError('Vous devez taper un email et un mot de passe')
      next(error);
    } else {

      try {
        //On recherche si un user existe deja avec cet email
        const user = await User.findOne({
          where: {
            email: req.body.email,
          }
        });
        
        if(user) {
          //Si user existe deja
          if(user.dataValues.registred === true && user.dataValues.emailToken === null) {
            const error = new CustomError('Un utilisateur existe déjà avec cet email');   
            next(error);
          }
          //Si user n'a pas fini sa vérification
          if(user.dataValues.registred === false && user.dataValues.email !== null) {
            const error = new CustomError('Vous devez terminer l\'étape de vérification, vérifié vos emails');
            next(error);
          }
        } else {
          
          //Création du token qui sera envoyé par mail
          const emailToken = crypto.randomBytes(64).toString('hex');

          //Cryptage du password
          const hashPassword = await bcrypt.hash(req.body.password,10);          

          //Enrengistrement de notre user dans la BDD
          const newUser: any = new User({
            email: req.body.email,
            password: hashPassword,
            registred: false,
            emailToken: emailToken,
          });
          
          await newUser.save();
          
          //Envoi du mail de vérification
          const sucessSend = await sendVerificationMail(newUser);

          //En cas de succès ou d'échec
          if(sucessSend) {
            res.send('Un email de vérification vient de nous être envoyé');
          } else {
            const error = new CustomError('Une erreur s\'est produite durant l\'envoi du mail');
            next(error)
          }
        }
      } catch (error) {               
        throw new CustomError('Une erreur s\'est produit, veuillez recommencer');
      }
    }   
  },

  //Requete de retour du mail de vérification
  async returnToken(req: Request, res: Response, next: NextFunction) {
    
    //Recherche si user avec l'emailToken est présent dans la BDD
    const userTryRegister: any = await User.findOne({
      where: {
        emailToken: req.body.emailToken,
      }
    });

    //Si présent on valide la vérification
    if(userTryRegister) {
      userTryRegister.registred = true;
      userTryRegister.emailToken = null;

      await userTryRegister.save();
    
    //Sinon on emet une erreur
    } else {
      const error = new CustomError('Une erreur s\'est produite, veuillez vous inscrire de nouveau');
      next(error)      
    }
  },

  //Requete pour recevoir un nouvel email
  async newToken(req: Request, res: Response, next: NextFunction ) {
    try {            
      //Je recherche mon user
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      //Si pas d'user, il n'est pas inscrit
      if(!user) {
        const error = new CustomError('Cet utilisateur n\'est pas inscrit, veuillez valider l\'inscription');
        next(error);
      } else {
        //Vérifie qui est bien à l'étape de vérif et qu'il n'est pas déja registred
        if(user.dataValues.registred === false && user.dataValues.email !== null) {

          //Envoi d'un nouveau mail de vérification
          const sucessSend = await sendVerificationMail(user.dataValues);

          //En cas de succès ou d'échec
          if(sucessSend) {
            res.send('Un email de vérification vient de nous être envoyé');
          } else {
            const error = new CustomError('Une erreur s\'est produite durant l\'envoi du mail');
            next(error)
          }
        } else {
          const error = new CustomError('Votre comptre est déjà validé, vous ne pouvez pas faire cela');
          next(error);
        }
      }
    }
    catch (error) {
      throw new CustomError('Une erreur s\'est produit, veuillez recommencer');
    }
  },

};

export default signupController;