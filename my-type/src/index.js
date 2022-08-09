// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require("path")
// const http = require("http")
// const { connect } = require('http2');

const app = express();
const port = process.env.PORT || 4000;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.DBHOST)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/mytype', require('./routes/MyTypes'));

app.listen(port, () => console.log(`Server listening on port ${port}`));




























// const express = require('express');
// const path = require("path");
// const http = require("http");
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// const { connect } = require('http2');
// const app = express();
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// const port = process.env.PORT;
// const DBHOST = process.env.DBHOST;

// mongoose.connect(DBHOST);
// var db = mongoose.connection;

// db.on('error', function(){
//     console.log('Connection Failed!');
// });
// db.once('open', function() {
//     console.log('Connected!');
// });

// var MyType = mongoose.Schema({
//     userid: {type: String},
//     tag: { 
//         genres: {type: String},
//         directors: {type: String},
//         movies: {type: String},
//         actors: {type: String}
//     }
// });

// var mytype = mongoose.model('Schema', MyType);

// app.post('/my-type', function (req, res) {
//     var body = req.body;
//     var userid = req.body.userid;
//     var genres = req.body.tag.genres;
//     var directors = req.body.tag.directors;
//     var movies = req.body.tag.movies;
//     var actors = req.body.tag.actors;

//     db.collection('my_type').insert(body);

//     res.send("\n"+ JSON.stringify(body) + "\n")
// });

// app.get ('/my-type/:id', async (req, res) => {
//     const userid = req.body.userid;
//     try {
//         const user = await user.findById(userid)
//         if (!user == false) {
//         res.status(400).send();
//         res.send(user);}else
//     } else {
//         res.status(200).send();
//     } catch (err) {
//         res.status(500).send();
//     }
// });


// app.put('/mytype', function (req, res) {
//     var body = req.body;
//     var userid =  req.body.userid;
//     db.getCollectin('Destiny').find("userid" = req.body.userid)
//         if (err) {
//             console.log(result);
//         }else {
//             console.log('data.id')
//         }
//     var update = {
//         genres = sanitizeHtml(req.body.tag.genres);
//         directors = sanitizeHtml(req.body.tag.directors);
//         movies = sanitizeHtml(req.body.tag.movies);
//         actors = sanitizeHtml(req.body.tag.actors);
//     }
//     model.findOneAndUpdate(conditions, update, function(err, res)){
//         if(err){
//             console.log(update error!)
//         } else {
//             console.log(result);
//         }
//     }

//     res.send("\n"+ JSON.stringify(body) + "\n")
// });

// app.get('/my-type', function (req, res) {
//     var body = req.body;
//     console.log(body);
// });

// app.listen(port, function () {
//     console.log('server on! ' + port);
// });



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