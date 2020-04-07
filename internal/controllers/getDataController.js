
exports.getStudentData=function (req,res) {
    res.status(200);
    res.send(req.body.studentDetails);
};
