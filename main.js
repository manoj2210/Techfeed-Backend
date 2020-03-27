require('dotenv').config();
// const connection=require('./internal/config');
// connection.connect();
//
// connection.query('SELECT CID from exams', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0]);
// });
//
// connection.end();
const express = require('express');
const app = express();
const router=require('./internal/routers/signUp');
app.use(router);

app.listen(8080);