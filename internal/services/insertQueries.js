
let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};


exports.insertCollege= function (n,d,s){
    return db.query(`INSERT INTO College (\`Name\`, \`City\`, \`State\`) VALUES ('${n}', '${d}', '${s}');`)
    .then(rows=>{
        return 201;
    },err => {
        return errorTemplate(err.code,err.errno,err.sqlMessage);
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.insertDepartment=function (n,cN) {
    return db.query(`INSERT INTO Department (\`Name\`,\`ColName\`) VALUES ('${n}', '${cN}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertClass=function (n,c,d,tt) {
    return db.query(`INSERT INTO Class (\`Name\`,\`ColName\`, \`DepName\`, \`Timetable\`) VALUES ('${n}','${c}', '${d}', '${tt}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertStudent=function (r,i, n, m,e,c,col,dep) {
    return db.query(`INSERT INTO \`Students\` (\`RollNo\`,\`IsRep\`, \`Name\`, \`MobileNo\`, \`EmailId\`, \`ClassName\`,\`ColName\`, \`DepName\`) VALUES ('${r}',0,'${n}', '${m}', '${e}', '${c}','${col}','${dep}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertAuthStudent=function (r,p,col) {
    return db.query(`INSERT INTO \`AuthStudent\` (\`RollNo\`,\`Password\`,\`ColName\`) VALUES ('${r}','${p}','${col}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertAuthTeacher=function (e,p,c,n) {
    return db.query(`INSERT INTO AuthTeacher (Password, EmailId,ColName,Name) VALUES ('${p}', '${e}','${c}','${n}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertTeacher=function (n,m,e,c) {
    return db.query(`INSERT INTO Teachers (Name,MobileNo, EmailId,ColName) VALUES ('${n}', '${m}', '${e}','${c}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertAnnouncement=function (n,e,c,announcement,className,depName) {
    return mongoDB.collection('Announcement').insertOne(announcement)
        .then(async (res)=>{
                let link=res.insertedId;
                // console.log(link,n,e,c,announcement,className,depName);
                return await db.query(`INSERT INTO Announcement (Name,EmailId,ColName,link,ClassName,DepName) VALUES ('${n}', '${e}','${c}','${link}','${className}','${depName}');`)
                .then(rows=>{
                    // console.log("yes");
                    return 201;
                },err => {
                    // console.log(err);
                    return errorTemplate(err.code,err.errno,err.sqlMessage);
                })
                .catch(err=>{
                    console.log(err);
                });

            }
        );
};

exports.insertTeaches=function (c,n,e,colName) {
    return db.query(`INSERT INTO Teaches (CID,Name,EmailId,ColName) VALUES ('${c}', '${n}','${e}','${colName}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertChapter=function (name,number,cid,colName) {
    return db.query(`INSERT INTO Chapters (Name,Number,CID,ColName) VALUES ('${name}',${number},'${cid}','${colName}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.insertMaterial=function (matName,chapName,link,cid,colName) {
    return db.query(`INSERT INTO Materials (MatName,ChapName,Link,CID,ColName) VALUES ('${matName}','${chapName}','${link}','${cid}','${colName}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
}

// exports.insertCourse=function (c,n) {
//     return db.query(`INSERT INTO \`Course\` (\`CID\`,\`Name\`) VALUES ('${c}', '${n}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };
//

// exports.insertStudies=function (c,r) {
//     return db.query(`INSERT INTO \`Studies\` (\`CID\`,\`RollNo\`) VALUES ('${c}', '${r}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };
// exports.insertChapters=function (n,no,c) {
//     return db.query(`INSERT INTO \`Chapters\` (\`Name\`, \`Number\`, \`CID\`) VALUES ('${n}', '${no}', '${c}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };
// exports.insertMaterials=function (m,c,l) {
//     return db.query(`INSERT INTO \`Materials\` (\`MatName\`, \`ChapName\`, \`link\`) VALUES ('${m}', '${c}', '${l}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };
// exports.insertExam=function (d,c,n) {
//     return db.query(`INSERT INTO \`Exams\` (\`ExDate\`, \`CID\`, \`ClassName\`) VALUES ('${d}', '${c}', '${n}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };
// exports.insertTest=function (d,c,n) {
//     return db.query(`INSERT INTO \`Tests\` (\`TestDate\`, \`CID\`, \`ClassName\`) VALUES ('${d}', '${c}', '${n}');`)
//         .then(rows=>{
//             return 201;
//         },err => {
//             return errorTemplate(err.code,err.errno,err.sqlMessage);
//         })
//         .catch(err=>{
//             console.log(err);
//         });
// };