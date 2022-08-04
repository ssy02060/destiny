const express = require('express');
const path = require("path");
const http = require("http");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const { connect } = require('http2');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

var MyType = mongoose.Schema({
    userid: {type: String},
    tag: { 
        genres: {type: String},
        directors: {type: String},
        movies: {type: String},
        actors: {type: String}
    }
});

var mytype = mongoose.model('Schema', MyType);

app.post('/my-type', function (req, res) {
    var body = req.body;
    var userid = req.body.userid;
    var genres = req.body.tag.genres;
    var directors = req.body.tag.directors;
    var movies = req.body.tag.movies;
    var actors = req.body.tag.actors;

    db.collection('my_type').insert(body);

    res.send("\n"+ JSON.stringify(body) + "\n")
});

app.get('/my-type', function (req, res) {
    var body = req.body;
    console.log(body);
});

app.listen(port, function () {
    console.log('server on! ' + port);
});



// var mytype = new mytype1({
//     userid: 'admin',
//     tag:{
//     genres: '사극',
//     actors: '이병헌',
//     movies: '광해, 왕이 된 남자',
//     directors: '추창민'
//     }
// });

// mytype.save(function(error, data){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('saved!')
//     }
// });

// const mongodb = require("mongodb");

// const dbHost = process.env.DBHOST

// mongodb.MongoClient.connect(dbHost, { useUnifiedTopology: true })