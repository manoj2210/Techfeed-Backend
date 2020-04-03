const httpStatus = require('http-status-codes');
const services=require('../services/getSignUpData');
const errors=require('../errors');

exports.getColleges=function (req,res) {
    services.getColleges()
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No colleges are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};
exports.getDepartments=function (req,res) {
    if(!req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("College name is empty!!"));
        return
    }
    services.getDepartments(req.body.collegeName)
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Departments are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};
exports.getClasses=function (req,res) {
    if(!req.body.depName || !req.body.collegeName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!!"));
        return
    }
    services.getClasses(req.body.collegeName,req.body.depName)
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Classes are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};