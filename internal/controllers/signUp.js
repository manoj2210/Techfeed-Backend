const httpStatus = require('http-status-codes');
const services=require('../services/insertQueries');
const errors=require('../errors');

exports.signUpStudent=function (req,res) {
    if(!req.body.rollNo || !req.body.name||!req.body.contactNo || !req.body.emailID || !req.body.class|| !req.body.department || !req.body.college||!req.body.password){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertStudent(req.body.rollNo,false,req.body.name,req.body.contactNo ,req.body.emailID ,req.body.class,req.body.college,req.body.department)
        .then(r=>{
            if(r===201){
                services.insertAuthStudent(req.body.rollNo,req.body.password,req.body.college)
                    .then(r=> {
                        if (r === 201) {
                            res.status(httpStatus.CREATED);
                            res.send({status:'Success'});
                        } else {
                            if (r.errno === 1062) {
                                res.status(httpStatus.CONFLICT);
                                res.send(errors.duplicateEntry(r.sqlMessage));
                            } else if (r.errno === 1452) {
                                res.status(httpStatus.BAD_REQUEST);
                                res.send(errors.foreignKey('No Such Class'));
                            } else {
                                res.status(httpStatus.CONFLICT);
                                res.send(errors.unknownError(r.sqlMessage, r.errno));
                            }
                        }
                    });
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

exports.signUpTeacher=function (req,res) {
    if(!req.body.name || !req.body.contactNo || !req.body.emailID || !req.body.college ||!req.body.password){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.insertTeacher(req.body.name,req.body.contactNo,req.body.emailID,req.body.college)
        .then(r=>{
            if(r===201){
                services.insertAuthTeacher(req.body.emailID,req.body.password,req.body.college)
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
                            else {
                                res.status(httpStatus.CONFLICT);
                                res.send(errors.unknownError(r.sqlMessage,r.errno));
                            }
                        }
                    });
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
