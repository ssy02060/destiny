const express = require('express');
const path = require("path");
const http = require("http");
var mongoose = require('mongoose');
const app = express();

const port = process.env.PORT;
const DBHOST = process.env.DBHOST;

mongoose.connect(DBHOST);
var db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('Connected!');
});

// const mongodb = require("mongodb");

// const dbHost = process.env.DBHOST

// mongodb.MongoClient.connect(dbHost, { useUnifiedTopology: true })