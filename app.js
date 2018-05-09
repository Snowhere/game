/*var Players = require('./lib/Players.js');
var Player = require('./lib/Player.js');*/
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('page/index.html');
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
