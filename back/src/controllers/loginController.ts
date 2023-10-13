import { Request, Response, NextFunction } from 'express';
import CustomError from '~/handlers/CustomError';
import User from '~/models/user';
import * as bcrypt from 'bcrypt';


const loginController = {

  //Fonction de login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      //On recherche si un user existe avec cet email
      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
        }
      });
      console.log(existingUser);
      
      //Erreur s'il n'existe pas en BDD
      if(!existingUser) {
        const error = new CustomError('Cet email n\'est pas enrengisté, veuillez vous inscrire en premier')
        next(error)
      }

      //On compare les passwords
      const match = await bcrypt.compare(
        req.body.password,
        existingUser!.dataValues.password,
      );

      if(match) {
        res.send('Connexion établie');
      } else {
        const error = new CustomError('La connexion à échouée, vérifier vos données');
        next(error);
      }
    } catch (error) {
      throw new CustomError('Une erreur s\'est produite durant l\'idendification, veuillez réessayer');
    }
  },
};

export default loginController;