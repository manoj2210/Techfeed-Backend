
let errorTemplate=(c,e,m)=>{
    return {
        'code': c,
        'errno': e,
        'sqlMessage': m
    }
};

exports.getColleges= function (){
    return db.query(`Select * from College;`)
        .then(rows=>{
            return rows;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getDepartments=function (college) {
    return db.query(`select Department.Name from College inner join Department where College.Name='${college}';`)
        .then(rows=>{
            return rows;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getClasses=function (college,department) {
    return db.query(`select Class.Name from College inner join Department inner join Class where College.Name='${college}' and Department.Name='${department}';`)
        .then(rows=>{
            return rows;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};