const jwt=require('jsonwebtoken');

let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};

let checkLoginStudent=(userName,password)=>{
     return db.query(`Select Password from AuthStudent where RollNo='${userName}';`)
        .then(rows=>{
            if(rows[0])
                return password === rows[0].Password;
            else
                return errorTemplate(404,404,"No such User");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getAccessTokenStudent=async (userName,password)=>{
    let res=await checkLoginStudent(userName,password);
    if(res === false){
        return errorTemplate(401,401,"Invalid Password");
    }
    else if(res !== true){
        return res;
    }
    else{
        let user={
            "isStudent":true,
            "userName":userName,
        };
        const token = jwt.sign(user, process.env.accessTokenSecret, { expiresIn: process.env.accessTokenLife});
        const refreshToken = jwt.sign(user, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife});

        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        };

        refreshTokenList[refreshToken]={
          "isStudent":true,
          "userName":userName,
          "password":password
        };

        return response;
    }
};


let checkLoginTeacher=(userName,password,emailID)=>{
    return db.query(`Select Password from AuthTeacher where name='${userName}' and emailID='${emailID}';`)
        .then(rows=>{
            if(rows[0])
                return password === rows[0].Password;
            else
                return errorTemplate(404,404,"No such User");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getAccessTokenTeacher=async (userName,password,emailID)=>{
    let res=await checkLoginTeacher(userName,password,emailID);
    if(res === false){
        return errorTemplate(401,401,"Invalid Password");
    }
    else if(res !== true){
        return res;
    }
    else{
        let user={
            "userName":userName,
            "emailID":emailID,
            "isStudent":false,
        };
        const token = jwt.sign(user, process.env.accessTokenSecret, { expiresIn: process.env.accessTokenLife});
        const refreshToken = jwt.sign(user, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife});

        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        };

        refreshTokenList[refreshToken]={
            "isStudent":false,
            "userName":userName,
            "password":password,
            "emailID":emailID
        };

        return response;
    }
};