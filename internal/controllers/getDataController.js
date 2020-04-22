const getTtStudentService=require('../services/getData').getTimeTableStudent;
const getStudentCourses=require('../services/getData').getCoursesStudent;
const getStudentChapters=require('../services/getData').getChaptersStudent;
const getStudentMaterials=require('../services/getData').getMaterialsStudent;
const httpStatus = require('http-status-codes');
const errors=require('../errors');
const {getCoursesService} = require("../services/getData");
const {getAnnouncementsTeacher} = require("../services/getData");
const {getAnnouncementsStudent} = require("../services/getData");
const {getTeachesClasses} = require("../services/getData");


exports.getUserData=function (req,res) {
    res.status(200);
    res.send({'isStudent':req.body.isStudent,'details':req.body.details});
};

exports.getTimeTableStudent=function (req,res) {
    getTtStudentService(req.body.details.class,req.body.details.department,req.body.details.college)
        .then(r=>{
            if(!r.code){
                if(r.link) {
                    const id = require('mongodb').ObjectID(r.link);
                    mongoDB.collection('TimeTable').find({_id:id}, { projection: { _id: 0 } }).toArray()
                        .then(o=>{
                            res.status(httpStatus.OK);
                            res.send(o[0]);
                        })
                        .catch((err)=>{
                            res.status(httpStatus.NOT_FOUND);
                            res.send(errors.noDataFound("No such timeTable in db"));
                        });
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Class Available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};

exports.getCoursesStudent=function (req,res) {
    getStudentCourses(req.body.details.class,req.body.details.department,req.body.details.college)
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Courses are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};

exports.getChaptersStudent=function (req,res) {
    if(!req.body.cid){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("cid entry is empty!!"));
        return
    }
    getStudentChapters(req.body.cid,req.body.details.college)
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Chapters are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};

exports.getMaterialsStudent=function (req,res) {
    if(!req.body.cid || !req.body.chapter){
        res.status(httpStatus.BAD_REQUEST);
        res.send(errors.badRequest("some entries are empty!!"));
        return
    }
    getStudentMaterials(req.body.cid,req.body.details.college,req.body.chapter)
        .then(r=>{
            if(!r.code){
                if(r.length>0) {
                    res.status(httpStatus.OK);
                    res.send(r);
                }
                else{
                    res.status(httpStatus.NOT_FOUND);
                    res.send(errors.noDataFound("No Materials are available"));
                }
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};

exports.getCourses=function (req,res) {
    getCoursesService(req.body.details.college)
        .then(r=>{
            if(!r.code){
                res.status(httpStatus.OK);
                res.send(r);
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });

};

exports.getTeaches=function (req,res) {
    getTeachesClasses(req.body.details.name,req.body.details.college,req.body.details.emailID)
        .then(r=>{
            if(!r.code){

                    res.status(httpStatus.OK);
                    res.send(r);
            }
            else {
                res.status(httpStatus.CONFLICT);
                res.send(errors.unknownError(r.sqlMessage,r.errno));
            }
        });
};

const mongoAnnouncementsLink=async (link)=>{
        const id = require('mongodb').ObjectID(link);
        return await mongoDB.collection('Announcement').find({_id:id}, { projection: { _id: 0 } }).toArray();
};

exports.getAnnouncements=function (req,res) {
    if(req.body.isStudent===true) {
        getAnnouncementsStudent(req.body.details.class, req.body.details.college, req.body.details.department)
            .then(async (r) => {
                if (!r.code) {
                        let resp=[];
                        for(let x of r){
                            resp.push( await mongoAnnouncementsLink(x.link));
                        }
                        res.status(httpStatus.OK);
                        res.send(resp);
                } else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage, r.errno));
                }
            });
    }else {
        getAnnouncementsTeacher(req.body.details.name,req.body.details.emailID,req.body.details.college)
            .then(async (r) => {
                if (!r.code) {
                    if (r.length > 0) {
                        let resp=[];
                        for(let x of r){
                            resp.push( await mongoAnnouncementsLink(x.link));
                        }
                        res.status(httpStatus.OK);
                        res.send(resp);

                    } else {
                        res.status(httpStatus.NOT_FOUND);
                        res.send(errors.noDataFound("No Announcements are available"));
                    }
                } else {
                    res.status(httpStatus.CONFLICT);
                    res.send(errors.unknownError(r.sqlMessage, r.errno));
                }
            });
    }
};
