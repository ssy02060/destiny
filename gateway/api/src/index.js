const express = require('express');
const request = require('request');
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;

app.get('/', function (req, res) {
    res.send();
});
// -------------------------------------------------------------
// Get the list of reviews from the review microservice.
// -------------------------------------------------------------
app.get('/review', (req, res) => {
    http.request(
        {
            host: `review`,
            path: `/review`,
            method: `GET`,
        },
        (response) => {
            let data = "";
            response.on("data", chunk => {
                data += chunk;
            });

            response.on("end", () => {
                // data를 기반으로 렌더링하는 작업 필요
                res.send(data);
            });

            response.on("error", err => {
                console.error("Failed to get video list.");
                console.error(err || `Status code: ${response.statusCode}`);
                res.sendStatus(500);
            });
        }
    ).end();
});
// -------------------------------------------------------------
// Get the list of user's type from the my-type microservice.
// -------------------------------------------------------------
app.get('/my-type', (req, res) => {
    http.request(
        {
            host: `my-type`,
            path: `/my-type`,
            method: `GET`,
        },
        (response) => {
            let data = "";
            response.on("data", chunk => {
                data += chunk;
            });

            response.on("end", () => {
                // data를 기반으로 렌더링하는 작업 필요
                res.send(data);
            });

            response.on("error", err => {
                console.error("Failed to get video list.");
                console.error(err || `Status code: ${response.statusCode}`);
                res.sendStatus(500);
            });
        }
    ).end();
});

app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});

