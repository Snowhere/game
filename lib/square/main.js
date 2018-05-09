Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var playerList = [];
var i = 0;
exports.play = function(io) {
    io.on('connection', function(socket) {
        playerList.push(socket);
        socket.emit('number', i++);
        socket.on('disconnect', function() {
            playerList.remove(socket);
            i--;
        });
        //updatePosition and color
        socket.on('action', function(updateInfo) {
            io.emit('action', updateInfo);
        })
    });
}

//var players = new Players.Players();
/*
io.on('connection', function(socket) {
    console.log('a user connected');

    //var player = players.addPlayer(socket);

    //通知玩家数量
    //io.emit('play number', players.amount);

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

    /
/游戏结束分数
socket.on('score', function(score) {
pool.query(addSql, score, function(err, result) {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }
});
}) 
});*/