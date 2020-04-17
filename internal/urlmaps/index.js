const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const signUpRouter=require('../routers/signUp');
const baseGetRouter=require('../routers/getBaseData');
const baseAddRouter=require('../routers/addBaseData');
const loginRouter=require('../routers/login');
const middleware=require('../middleware/auth');
const updateRouter=require('../routers/updatesRouter');
const getDataRouter=require('../routers/getDataRouter');


module.exports=function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({credentials: true, origin: true}));
    app.use('/oauth/token',loginRouter);
    app.use('/signUp',signUpRouter);
    app.use('/base',baseGetRouter);

    app.use(middleware.auth);
    app.use('/base',baseAddRouter);
    app.use('/getData',getDataRouter);
    app.use('/update',updateRouter);
    app.listen(8080);
};