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
        var player = new Player(socket.id, socket, color.random(), false, false, 0);
        playerList.push(player);
        socket.emit('number', i++);
        //退出
        socket.on('disconnect', function() {
            playerList.remove(player);
            i--;
        });
        //ready
        socket.on('ready', function() {
            player.ready = true;
            //all ready,game start
            if (allReady()) {
                startGame();
            }
        });
        //refresh 
        socket.on('refresh',function(){

        });
    });
}

function allReady() {
    for (var player in playerList) {
        if (!player.ready) {
            return false;
        }
    }
    return true;
}

function startGame() {
    //补全玩家
    for (var i = 0; i < 4; i++) {
        if (playerList[i] == null) {
            playerList[i] = new Player('ai' + i, null, color.random(), true, true, 0);
        }
    }
    io.emit('game', 'start');
    var step = 0; //玩家循环行动
    var overFlag = 0; //一轮4名玩家都无操作，则结束游戏
    //游戏循环
    while (true) {
        var player = playerList[step % 4];
        var result;
        //玩家行动
        if (player.isAI) {
            result = player.play();
        } else {
            player.socket.emit('your turn', true);
            socket.on('action', function(updateInfo) {
                result = updateInfo;
            })
        }
        io.emit('action', {
            'position': result,
            'color': player.color
        });
        //更新分数
        if (result) {
            player.score += result.length;
            overFlag = 0;
            io.emit('score', '');
        } else {
            overFlag++;
            if (overFlag >= 4) {
                io.emit('game', 'game over');
                break;
            }
        }
        step++;
    }
}