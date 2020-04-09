
exports.getUserData=function (req,res) {
    res.status(200);
    res.send({'isStudent':req.body.isStudent,'details':req.body.details});
};
