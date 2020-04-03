
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
    return db.query(`select d.Name from College as c inner join Department as d on c.Name= d.ColName where c.Name='${college}';`)
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
    return db.query(`select c.Name from Class as c inner join Department as d on c.depName= d.Name and d.colName=c.colName where c.colName='${college}' and c.depName='${department}';`)
        .then(rows=>{
            return rows;
        },err => {
            return errorTemplate(err.code,err.errno,err.sqlMessage);
        })
        .catch(err=>{
            console.log(err);
        });
};