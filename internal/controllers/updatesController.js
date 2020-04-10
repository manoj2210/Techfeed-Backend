const httpStatus = require('http-status-codes');
const services=require('../services/updates');
const errors=require('../errors');
const getStudentData=require('../services/getData').getStudentData;
const getTeacherData=require('../services/getData').getTeacherData;
const jwt=require('jsonwebtoken');


const updateStudentData=function (req,res) {
    if(!req.body.name || !req.body.contactNo || !req.body.emailID ){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.updateStudent(req.body.details.rollNo,req.body.details.college,req.body.name ,req.body.contactNo ,req.body.emailID ,req.body.github || '',req.body.linkedIn || '',req.body.instaGram || '')
        .then(async (r)=>{
            if(r===212){
                let details=await getStudentData(req.body.details.rollNo,req.body.details.college);
                let user={
                    "isStudent":true,
                    "details": details
                };
                const token = jwt.sign(user, process.env.accessTokenSecret, { expiresIn: process.env.accessTokenLife});
                res.status(212);
                res.send({'token':token});
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

exports.updateUserDetails=function (req,res) {
    if(req.body.isStudent){
        updateStudentData(req,res);
    }
    else {
        updateTeacherData(req,res);
    }
};

const updateTeacherData=function (req,res) {
    if(!req.body.name || !req.body.contactNo ){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.updateStudent(req.body.details.emailID,req.body.details.college,req.body.name ,req.body.contactNo)
        .then(async (r)=>{
            if(r===212){
                let details=await getTeacherData(req.body.details.emailID,req.body.details.college);
                let user={
                    "isStudent":false,
                    "details": details
                };
                const token = jwt.sign(user, process.env.accessTokenSecret, { expiresIn: process.env.accessTokenLife});
                res.status(212);
                res.send({'token':token});
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