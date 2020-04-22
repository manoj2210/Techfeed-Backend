const httpStatus = require('http-status-codes');
const services=require('../services/insertQueries');
const getData =require('../services/getData');
const errors=require('../errors');

exports.addCollege=function (req,res) {
    if(!req.body.name || !req.body.district || !req.body.state){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertCollege(req.body.name,req.body.district,req.body.state)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send('Success');
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};
exports.addDepartment=function (req,res) {
    if(!req.body.name || !req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertDepartment(req.body.name,req.body.collegeName)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send('Success');
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else if(r.errno === 1452){
                    res.status(httpStatus.BAD_REQUEST);
                    res.send(errors.foreignKey('No Such College'));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};
exports.addClass=function (req,res) {
    if(!req.body.name || !req.body.depName || !req.body.timeTable || !req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertClass(req.body.name,req.body.collegeName,req.body.depName,req.body.timeTable)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send('Success');
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else if(r.errno === 1452){
                    res.status(httpStatus.BAD_REQUEST);
                    res.send(errors.foreignKey('No Such Department'));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};

exports.addStudent=function (req,res) {
    if(!req.body.rollNo || !req.body.name||!req.body.contactNo || !req.body.emailID || !req.body.class|| !req.body.department || !req.body.college){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertStudent(req.body.rollNo,false,req.body.name,req.body.contactNo ,req.body.emailID ,req.body.class,req.body.college,req.body.department)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send('Success');
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else if(r.errno === 1452){
                    res.status(httpStatus.BAD_REQUEST);
                    res.send(errors.foreignKey('No Such Class'));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};



// exports.addStudies=function (req,res) {
//     if(!req.body.cid || !req.body.rollNo ){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertStudies(req.body.cid,req.body.rollNo)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else if(r.errno === 1452){
//                     res.status(httpStatus.BAD_REQUEST);
//                     res.send(errors.foreignKey('No Such Student or Class'));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };

exports.addTeacher=function (req,res) {
    if(!req.body.name || !req.body.mobileNo || !req.body.emailID || !req.body.collegeName ){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertTeacher(req.body.name,req.body.mobileNo,req.body.emailID,req.body.collegeName)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send('Success');
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};

exports.addAnnouncement=function (req,res) {
    if(!req.body.title || !req.body.announcement || !req.body.cid ){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    getData.getClassGivenCourse(req.body.cid,req.body.details.college)
        .then(r=>{
            // console.log(r);
            if(!r.code){
                if(r.length>0) {
                    let announcement={title:req.body.title,announcement:req.body.announcement,time: new Date()};
                    services.insertAnnouncement(req.body.details.name,req.body.details.emailID,req.body.details.college,announcement,r[0].className,r[0].depName)
                        .then(re=>{
                            if(re === 201){
                                res.status(httpStatus.CREATED);
                                res.send({status:'Success'});
                            }
                            else {
                                if (re.errno === 1062) {
                                    res.status(httpStatus.CONFLICT);
                                    res.send(errors.duplicateEntry(r.sqlMessage));
                                }
                                else {
                                    res.status(httpStatus.CONFLICT);
                                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                                }
                            }
                        });
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Classes are available for that course"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });

};


// exports.addCourse=function (req,res) {
//     if(!req.body.cid || !req.body.name ){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertCourse(req.body.cid,req.body.name)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };

exports.addTeaches=function (req,res) {
    if(!req.body.cid){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!"));
        return
    }
    services.insertTeaches(req.body.cid,req.body.details.name,req.body.details.emailID,req.body.details.college)
        .then(r=>{
            if(r===201){
                res.status(httpStatus.CREATED);
                res.send({status:'Success'});
            }
            else {
                if (r.errno === 1062) {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.duplicateEntry(r.sqlMessage));
                }
                else if(r.errno === 1452){
                    res.status(httpStatus.BAD_REQUEST);
                    res.send(errors.foreignKey('No Such CID or Teacher Name'));
                }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
};

// exports.addChapters=function (req,res) {
//     if(!req.body.name || !req.body.number || !req.body.cid){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertChapters(req.body.name,req.body.number,req.body.cid)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else if(r.errno === 1452){
//                     res.status(httpStatus.BAD_REQUEST);
//                     res.send(errors.foreignKey('No Such CID'));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };

// exports.addMaterials=function (req,res) {
//     if(!req.body.matName || !req.body.chapName || !req.body.link){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertMaterials(req.body.matName,req.body.chapName,req.body.link)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else if(r.errno === 1452){
//                     res.status(httpStatus.BAD_REQUEST);
//                     res.send(errors.foreignKey('No Such Chapter'));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };

// exports.addExam=function (req,res) {
//     if(!req.body.date || !req.body.cid || !req.body.className){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertExam(req.body.date,req.body.cid,req.body.className)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else if(r.errno === 1452){
//                     res.status(httpStatus.BAD_REQUEST);
//                     res.send(errors.foreignKey('No Such CID or Class Name'));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };

// exports.addTests=function (req,res) {
//     if(!req.body.date || !req.body.cid || !req.body.className){
//         res.status(httpStatus.BAD_REQUEST);
//         res.send(errors.badRequest("Some entries are empty!!"));
//         return
//     }
//     services.insertTest(req.body.date,req.body.cid,req.body.className)
//         .then(r=>{
//             if(r===201){
//                 res.status(httpStatus.CREATED);
//                 res.send('Success');
//             }
//             else {
//                 if (r.errno === 1062) {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.duplicateEntry(r.sqlMessage));
//                 }
//                 else if(r.errno === 1452){
//                     res.status(httpStatus.BAD_REQUEST);
//                     res.send(errors.foreignKey('No Such CID or Class'));
//                 }
//                 else {
//                     res.status(httpStatus.CONFLICT);
//                     res.send(errors.unknownError(r.sqlMessage,r.errno));
//                 }
//             }
//         });
// };