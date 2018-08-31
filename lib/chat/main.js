var getSql = 'SELECT * FROM say order by id desc limit 0,? ';
var addSql = 'INSERT INTO say(name,time,content) VALUES(?,?,?)';
var number = 0;

exports.chat = function(app, io, pool) {
    //聊天记录
    app.get('/getMessageList', function(req, res) {
        pool.query(getSql, [parseInt(req.query.num)], function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            res.send(result);
        });
    });
    //手动更新聊天记录
    io.on('connection', function(socket) {
        console.log('a user connected');
        //通知所有用户数量
        io.emit('chat number', ++number);

        socket.on('disconnect', function() {
            console.log('user disconnected');
            io.emit('chat number', --number);
        });
        //聊天
        socket.on('chat message', function(msg) {
            pool.query(addSql, [msg.name, msg.time, msg.content], function(err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
            });
            io.emit('chat message', msg);
        });
    });
}