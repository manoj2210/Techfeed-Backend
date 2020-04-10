const getTtStudentService=require('../services/getData').getTimeTableStudent;
const httpStatus = require('http-status-codes');
const errors=require('../errors');


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
                            res.send(o);
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
        });;
};
