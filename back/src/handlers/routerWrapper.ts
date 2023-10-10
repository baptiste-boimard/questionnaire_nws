import { Request, Response, NextFunction } from 'express';

// wrapper qui prend nos controllers pour remonter les erreurs
const routerWrapper = (method: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('arrive wrapper');
    
    await method(req, res, next);    
  } catch (error) {
    console.log('wrapper ok', error);
    next(error);
  };
};

export default routerWrapper;