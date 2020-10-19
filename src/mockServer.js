const functions = require('firebase-functions');
const express = require('express');
const matchMock = require('./scripts/matchMock');
const app = express();

app.use(matchMock);
//firebase 被墙，用express得
//exports.api = functions.https.onRequest(app);
//ip 的插件
const ip = require('ip')
const IP = ip.address();

var server = app.listen(3002, function () {
    var port = server.address().port;
    console.info('mock server:', 'http://'+IP+':'+port)
});