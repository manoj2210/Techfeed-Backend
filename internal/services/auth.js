const jwt=require('jsonwebtoken');
const getStudentData=require('./getData').getStudentData;
const getTeacherData=require('./getData').getTeacherData;

let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};

let checkLoginStudent=(userName,password,collegeName)=>{
     return db.query(`Select Password from AuthStudent where RollNo='${userName}' and ColName='${collegeName}';`)
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


exports.getAccessTokenStudent=async (userName,password,collegeName)=>{
    let res=await checkLoginStudent(userName,password,collegeName);
    if(res === false){
        return errorTemplate(401,401,"Invalid Password");
    }
    else if(res !== true){
        return res;
    }
    else{
        let details=await getStudentData(userName,collegeName);
        let user={
            "isStudent":true,
            "details":details
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
          "password":password,
          "collegeName":collegeName
        };
        return response;
    }
};


let checkLoginTeacher=(password,emailID,collegeName)=>{
    return db.query(`Select Password from AuthTeacher where  emailID='${emailID}' and ColName='${collegeName}';`)
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

exports.getAccessTokenTeacher=async (password,emailID,collegeName)=>{
    let res=await checkLoginTeacher(password,emailID,collegeName);
    if(res === false){
        return errorTemplate(401,401,"Invalid Password");
    }
    else if(res !== true){
        return res;
    }
    else{
        let details=await getTeacherData(emailID,collegeName);
        let user={
            "details":details,
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
            "password":password,
            "emailID":emailID,
            "collegeName":collegeName,
        };

        return response;
    }
};