const httpStatus = require('http-status-codes');
const services=require('../services/updates');
const errors=require('../errors');
const getStudentData=require('../services/getData').getStudentData;
const jwt=require('jsonwebtoken');


exports.updateStudentData=function (req,res) {
    if(!req.body.name || !req.body.contactNo || !req.body.emailID ){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.updateStudent(req.body.studentDetails.rollNo,req.body.studentDetails.college,req.body.name ,req.body.contactNo ,req.body.emailID ,req.body.github || '',req.body.linkedIn || '',req.body.instaGram || '')
        .then(async (r)=>{
            if(r===212){
                let details=await getStudentData(req.body.studentDetails.rollNo,req.body.studentDetails.college);
                let user={
                    "isStudent":true,
                    "studentDetails": details
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
