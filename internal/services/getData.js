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

exports.getTeacherData=(emailId,collegeName)=>{
    return db.query(`Select  Name as name,MobileNo as contactNo,EmailId as emailID,ColName as college from Teachers where EmailId='${emailId}' and ColName='${collegeName}';`)
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

exports.getTimeTableStudent=(name,depName,colName)=>{
    return db.query(`Select Timetable as t from Class where Name='${name}' and ColName='${colName}' and DepName='${depName}';`)
        .then(rows=>{
            if(rows[0])
                return {'link':rows[0].t};
            else
                return errorTemplate(404,404,"No such Class");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getCoursesStudent=(name,depName,colName)=>{
    return db.query(`Select cid, name from Course where ClassName='${name}' and ColName='${colName}' and DepName='${depName}';`)
        .then(rows=>{
            if(rows)
                return rows;
            else
                return errorTemplate(404,404,"No Courses available for the class");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getChaptersStudent=(cid,colName)=>{
    return db.query(`Select number, name from Chapters where CID='${cid}' and ColName='${colName}';`)
        .then(rows=>{
            if(rows)
                return rows;
            else
                return errorTemplate(404,404,"No Courses available for the class");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getMaterialsStudent=(cid,colName,chapName)=>{
    return db.query(`Select matName, link from Chapters where ChapterName='${chapName}' CID='${cid}' and ColName='${colName}';`)
        .then(rows=>{
            if(rows)
                return rows;
            else
                return errorTemplate(404,404,"No Courses available for the class");
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};