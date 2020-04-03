require('dotenv').config();
const config=require('./internal/config');
const service=require('./internal/services/auth');
const connection=config();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

global.db=connection;
global.refreshTokenList={};

// console.log(service.getAccessTokenStudent('18pt21','kavithammk'));
// db.query('SELECT MMk from exams')
// service.insertDepartment('mmk','KK').then(x=>console.log(x));
//     .then(rows=>{
//         console.log(rows);
//     },err => {
//         return db.close().then( () => { throw err; } )
//     })
//     .catch(err=>{
//         console.log(err);
//     });


const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const signUpRouter=require('./internal/routers/signUp');
const baseGetRouter=require('./internal/routers/getBaseData');
const baseAddRouter=require('./internal/routers/addBaseData');
const loginRouter=require('./internal/routers/login');
const middleware=require('./internal/middleware/auth');
app.use('/oauth/token',loginRouter);
app.use('/signUp',signUpRouter);
app.use('/base',baseGetRouter);
app.use(middleware.auth);
app.use('/base',baseAddRouter);

app.listen(8080);