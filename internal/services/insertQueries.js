
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

exports.insertClass=function (n,d,tt) {
    return db.query(`INSERT INTO Class (\`Name\`, \`DepName\`, \`Timetable\`) VALUES ('${n}', '${d}', '${tt}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertStudent=function (r,i, n, m,e,c) {
    return db.query(`INSERT INTO \`Students\` (\`RollNo\`,\`IsRep\`, \`Name\`, \`MobileNo\`, \`EmailId\`, \`ClassName\`) VALUES ('${r}',${i},'${n}', '${m}', '${e}', '${c}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertTeacher=function (n,m,e) {
    return db.query(`INSERT INTO \`Teachers\` (\`Name\`, \`MobileNo\`, \`EmailId\`) VALUES ('${n}', '${m}', '${e}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertCourse=function (c,n) {
    return db.query(`INSERT INTO \`Course\` (\`CID\`,\`Name\`) VALUES ('${c}', '${n}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.insertTeaches=function (c,n,e) {
    return db.query(`INSERT INTO \`Teaches\` (\`CID\`,\`Name\`,\`EmailId\`) VALUES ('${c}', '${n}','${e}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.insertStudies=function (c,r) {
    return db.query(`INSERT INTO \`Studies\` (\`CID\`,\`RollNo\`) VALUES ('${c}', '${r}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.insertChapters=function (n,no,c) {
    return db.query(`INSERT INTO \`Chapters\` (\`Name\`, \`Number\`, \`CID\`) VALUES ('${n}', '${no}', '${c}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.insertMaterials=function (m,c,l) {
    return db.query(`INSERT INTO \`Materials\` (\`MatName\`, \`ChapName\`, \`link\`) VALUES ('${m}', '${c}', '${l}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.insertExam=function (d,c,n) {
    return db.query(`INSERT INTO \`Exams\` (\`ExDate\`, \`CID\`, \`ClassName\`) VALUES ('${d}', '${c}', '${n}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.insertTest=function (d,c,n) {
    return db.query(`INSERT INTO \`Tests\` (\`TestDate\`, \`CID\`, \`ClassName\`) VALUES ('${d}', '${c}', '${n}');`)
        .then(rows=>{
            return 201;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};