var Players = require('./lib/Players.js');
var Player = require('./lib/Player.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'qwer',
    port: '3306',
    database: 'game',
});

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.get('/1010', function(req, res) {
    res.sendfile('1010.html');
});
app.get('/2020', function(req, res) {
    res.sendfile('2020.html');
});

var getSql = 'SELECT count(1) as num FROM score where score>? ';

var addSql = 'INSERT INTO score(score) VALUES(?)';


var players = new Players.Players();
/**
 *记录分数
 */
app.get('/score', function(req, res) {
    pool.query(addSql, [parseInt(req.query.score)], function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
    });
    pool.query(getSql, [parseInt(req.query.score)], function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        res.send(result);
    });
});
/**
 *手动更新聊天记录
 */

io.on('connection', function(socket) {
    console.log('a user connected');

    var player = players.addPlayer(socket);

    //通知玩家数量
    io.emit('play number', players.amount);

    socket.on('disconnect', function() {
        console.log('user disconnected');
        //通知玩家数量
        io.emit('play number', players.amount);
    });

    //action
    socket.on('action', function(score) {
        pool.query(addSql, score, function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
    })

    /*//游戏结束分数
        socket.on('score',function(score){
            pool.query(addSql, score, function(err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
            });
        })*/
});

http.listen(3001, function() {
    console.log('listening on *:3000');
});
