const httpStatus = require('http-status-codes');
const services=require('../services/auth');
const errors=require('../errors');

exports.loginStudent=(req,res)=>{
    if(!req.body.rollNo || !req.body.password || !req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.getAccessTokenStudent(req.body.rollNo,req.body.password,req.body.collegeName)
        .then(r=>{
            if(r.errno){
                if(r.errno===401){
                    res.status(401).send(errors.unAuthorised(r.sqlMessage));
                }
                else if(r.errno===404){
                    res.status(404).send(errors.noDataFound(r.sqlMessage));
                }
            }
            else{
                res.status(200).send(r);
            }
        });
};

exports.loginTeacher=(req,res)=>{
    if(!req.body.userName || !req.body.password || !req.body.emailID|| !req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.getAccessTokenTeacher(req.body.userName,req.body.password,req.body.emailID,req.body.collegeName)
        .then(r=>{
            if(r.errno){
                if(r.errno===401){
                    res.status(401).send(errors.unAuthorised(r.sqlMessage));
                }
                else if(r.errno===404){
                    res.status(404).send(errors.noDataFound(r.sqlMessage));
                }
            }
            else{
                res.status(200).send(r);
            }
        });
};