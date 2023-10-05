import {Express} from 'express';
require('dotenv').config();
const express = require('express')

// on type l'app Express, ainsi req res et next deviennent typé
const app: Express = express();

const router = require('./routers/router')

const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use((req ,res ,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  // A controler, je n'arrive pas à le typer
  // res.header(`Access-Control-Allow-Credentials`, true);
  next();
})
app.use(router);
app.use(express.static('docs'));

//==--Middleware to catch error--==
// app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
