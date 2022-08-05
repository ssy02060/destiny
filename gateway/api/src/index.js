const express = require('express');
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser")

app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;

app.get('/', function (req, res) {
    res.send("hello");
})

app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});

