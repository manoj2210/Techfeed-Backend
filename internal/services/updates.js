let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};
exports.updateStudent= function (rollNo,col,name,mobile,email,github,linkedin,instagram){
    return db.query(`UPDATE Students SET  Name = '${name}', MobileNo = '${mobile}', EmailId = '${email}', Github = '${github}', Linkedin = '${linkedin}', Instagram = '${instagram}' WHERE (RollNo = '${rollNo}') and (ColName = '${col}');`)
        .then(rows=>{
            return 212;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.updateStudent= function (email,col,name,mobile){
    return db.query(`UPDATE Teachers SET  Name = '${name}', MobileNo = '${mobile}' WHERE (EmailId = '${email}') and (ColName = '${col}');`)
        .then(rows=>{
            return 212;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
