import { Request, Response, NextFunction } from 'express';
// import cors from 'cors';
import handleError from './handlers/handleError';
// const handleError = require('./handlers/handleError');
require('dotenv').config();
const express = require('express')

const app = express();

const router = require('./routers/router')

const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

// Alternative qui résoud le pb de type pour credential mais qui marche :')
// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     'Origin',
//     'X-Requested-With',
//     'Content-Type',
//     'Authorization',
//     'Accept',
//     'X-Access-Token',
//   ],
//   credentials: true,
//   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//   origin: 'http://localhost:3000',
//   "preflightContinue": false,
// };
// router.use(cors(options));
// router.options('*', cors(options));

app.use((req: Request ,res: Response ,next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  // A controler, je n'arrive pas à le typer correctement à part avec accept au lieu de true
  res.header(`Access-Control-Allow-Credentials`, 'Accept');
  next();
});

app.use(router);
app.use(express.static('docs'));

// Middleware pour attraper les erreurs
app.use(handleError);

app.listen(PORT,'51.75.133.155', () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

