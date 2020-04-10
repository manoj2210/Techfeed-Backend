require('dotenv').config();

//SQL

const SQLConfig=require('./internal/config/mySQLDB');
const connection=SQLConfig();

global.db=connection;
global.refreshTokenList={};

// Express
const express = require('express');
const urlMaps=require('./internal/urlmaps');

// Mongo
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = process.env.mongoDB;
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Mongo Database');
        global.mongoDB=client.db(dbName);

        const app = express();
        urlMaps(app);
    });
