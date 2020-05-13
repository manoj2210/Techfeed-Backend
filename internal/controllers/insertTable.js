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

exports.addMaterial=function (req,res) {
    if(!req.body.cid,!req.body.co,!req.body.link,!req.body.matName,!req.body.chapName){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("Some entries are empty!"));
        return
    }
    services.insertChapter(req.body.chapName,req.body.co,req.body.cid,req.body.details.college)
        .then(r=>{
            if(r===201){
                services.insertMaterial(req.body.matName,req.body.chapName,req.body.link,req.body.cid,req.body.details.college)
                    .then(re=>{
                        if(re===201){
                            res.status(httpStatus.CREATED);
                            res.send({status:'Success'});
                        }
                        else {
                            if (re.errno === 1062) {
                                res.status(httpStatus.CONFLICT);
                                res.send(errors.duplicateEntry(re.sqlMessage));
                            }
                            else if(re.errno === 1452){
                                res.status(httpStatus.BAD_REQUEST);
                                res.send(errors.foreignKey('No Such Chapter'));
                            }
                            else {
                                res.status(httpStatus.CONFLICT);
                                res.send(errors.unknownError(re.sqlMessage,re.errno));
                            }
                        }
                    });
            }
            else {
                if (r.errno === 1062) {
                    services.insertMaterial(req.body.matName,req.body.chapName,req.body.link,req.body.cid,req.body.details.college)
                        .then(re=>{
                            if(re===201){
                                res.status(httpStatus.CREATED);
                                res.send({status:'Success'});
                            }
                            else {
                                if (re.errno === 1062) {
                                    res.status(httpStatus.CONFLICT);
                                    res.send(errors.duplicateEntry(re.sqlMessage));
                                }
                                else if(re.errno === 1452){
                                    res.status(httpStatus.BAD_REQUEST);
                                    res.send(errors.foreignKey('No Such Chapter'));
                                }
                                else {
                                    res.status(httpStatus.CONFLICT);
                                    res.send(errors.unknownError(re.sqlMessage,re.errno));
                                }
                            }
                        });
                }
                else if(r.errno === 1452){
                        res.status(httpStatus.BAD_REQUEST);
                        res.send(errors.foreignKey('No Such Course'));
                    }
                else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage,r.errno));
                }
            }
        });
}