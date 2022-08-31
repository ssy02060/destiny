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
DB_PASSWORD = process.env.DB_PASSWORD

mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false
DB_HOST = `mongodb://root:${DB_PASSWORD}@${process.env.WRITER_ENDPOINT}:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
// Connect to MongoDB
mongoose.connect(DB_HOST)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/mytype', require('./routes/MyTypes'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

