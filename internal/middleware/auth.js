const jwt=require('jsonwebtoken');
const jwtService=require('../services/auth');
const errors=require('../errors');

exports.auth=(req,res,next)=>{
    const token = req.get('Authorization');
    const refresh=req.get('x-refresh-token');
    if (!token) {
        res.status(401).send(errors.unAuthorised('Token is invalid'));
        return;
    }
    verifyJWTToken(token)
        .then(user => {
            // console.log(user);
            req.body.isStudent= user.isStudent;
            req.body.details = user.details;
            next();
        }).catch((err) => {
            if(!refresh) {
                res.status(401).send(errors.unAuthorised(err));
            }
            else{
                console.log(err);
                verifyRefreshToken(refresh)
                    .then((r)=>{
                        delete refreshTokenList[refresh];
                        res.status(203).send(r);
                    })
                    .catch((err)=>{
                        res.status(401).send(errors.unAuthorised(err));
                    });
            }
    });
};


function verifyJWTToken(token) {
    return new Promise(async (resolve, reject) => {
        if (!token.startsWith('Bearer')) {
            return reject('Token is invalid');
        }
        // Remove Bearer from string
        token = token.slice(7, token.length);
        await jwt.verify(token, process.env.accessTokenSecret, (err, decodedToken) => {
            if (err) {
                return reject(err.message);
            }   // Check the decoded user
            if (!decodedToken ) {
                return reject('Token is invalid');
            }   resolve(decodedToken);
        })
    });
}

function verifyRefreshToken(token) {
    return new Promise( async (resolve, reject) => {
        await jwt.verify(token, process.env.refreshTokenSecret, async (err, decodedToken) => {
            if (err) {
                delete refreshTokenList[token];
                return reject(err.message);
            }
            if(token in refreshTokenList){
                if (refreshTokenList[token].isStudent) {
                    resolve(await jwtService.getAccessTokenStudent(refreshTokenList[token].userName, refreshTokenList[token].password,refreshTokenList[token].collegeName));
                }
                else{
                    resolve(await jwtService.getAccessTokenTeacher(refreshTokenList[token].password),refreshTokenList[token].emailID,refreshTokenList[token].collegeName);
                }
                return reject('RefreshToken not in DB')
            }
            else {
                return reject('RefreshToken not in DB');
            }
        })
    });
}