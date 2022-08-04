const express = require('express');
const path = require("path");
const http = require("http");
const app = express();

const port = process.env.PORT;
const REACT_PATH = process.env.REACT_PATH;

app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
    res.json({
        hello: "this is recommendation service"
    });
});


app.listen(port, function () {
    console.log('server on! ' + port);
});