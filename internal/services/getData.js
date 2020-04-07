let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};
exports.getStudentData=(userName,collegeName)=>{
    return db.query(`Select RollNo as rollNo, Name as name,MobileNo as contactNo,EmailId as emailID,ClassName as class,DepName as department,ColName as college,IsRep as isRep,Github as github,Linkedin as linkedIn,Instagram as instaGram  from Students where RollNo='${userName}' and ColName='${collegeName}';`)
        .then(rows=>{
            if(rows[0])
                return rows[0];
            else
                return errorTemplate(404,404,"No such User");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};