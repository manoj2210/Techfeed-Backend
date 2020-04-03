const mysql = require('mysql');
const createTables=require('../models/createTable');
const config={
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
};
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
module.exports=function() {
        let db=new Database(config);
        if(process.env.createTables ==='true') createTables(db);
        return db;
};