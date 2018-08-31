var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: '',
    password: '',
    port: '3306',
    database: 'say',
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('page/index.html');
});

//chat
app.get('/chat', function(req, res) {
    res.sendfile('page/chat.html');
});
require('./lib/chat/main.js').chat(app,io.of('/chat'),pool);
//zzu
app.get('/zzu', function(req, res) {
    res.sendfile('page/zzu.html');
});
//1010
app.get('/1010', function(req, res) {
    res.sendfile('page/1010.html');
});
//kaer
app.get('/kaer', function(req, res) {
    res.sendfile('page/kaer.html');
});
//swing
app.get('/swing',function(req,res){
    res.sendfile('page/swing.html');
});
//square
app.get('/square', function(req, res) {
    res.sendfile('page/square.html');
});
require('./lib/square/main.js').play(io.of('/square'));


http.listen(3001, function() {
    console.log('listening on *:3001');
});
