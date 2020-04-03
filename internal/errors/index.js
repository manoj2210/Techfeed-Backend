const httpStatus = require('http-status-codes');

exports.duplicateEntry=(e)=> {
    return {
        'error': 'Duplicate Entry',
        'message':e,
        'status':httpStatus.CONFLICT
    }
};

exports.unknownError=(e,s)=> {
    return {
        'error': 'Unknown Error',
        'message':e,
        'status':s
    }
};

exports.foreignKey=(e)=>{
    return {
        'error': 'Foreign Key Error',
        'message':e,
        'status':1452
    }
};

exports.badRequest=(e)=>{
    return{
        'error': 'Bad Request',
        'message':e,
        'status':httpStatus.BAD_REQUEST
    }
};

exports.noDataFound=(e)=>{
    return{
        'error': 'No data found',
        'message':e,
        'status':httpStatus.NOT_FOUND
    }
};

exports.unAuthorised=(e)=>{
    return{
        'error': 'UnAuthorised',
        'message':e,
        'status':httpStatus.UNAUTHORIZED
    }
};