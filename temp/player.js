if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}

var matrixList= [
        [[1]],

        [[1,1]],
        [[1,1,1]],
        [[1,1,1,1]],
        [[1,1,1,1,1]],
    
        [[1,1],[1,1]],
        [[1,1],[1,0]],
        
        [[1,0,0],[1,1,1]],
        [[1,0,0],[1,0,0],[1,1,1]],
        [[1,0,0,0],[1,1,1,1]],
        [[1,1,0,0],[1,1,1,1]],
        [[1,1,0],[0,1,1]],
        [[1,1,0,0],[0,1,1,1]],

        [[1,1,0],[0,1,0],[0,1,1]],

        [[1,1,0],[0,1,1],[0,0,1]],
        [[0,1,0],[1,1,1],[0,1,0]],
        [[0,1,0],[1,1,1]],
        [[0,1,0,0],[1,1,1,1]],
        [[0,1,0],[0,1,0],[1,1,1]],
        [[1,0,1],[1,1,1]],
        [[0,1,0],[1,1,1],[1,0,0]],
    ];


var color = {
    default: 'default',
    colorList: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    random: function() {
        return 'c1';
    }
};

function Player(id,socket,color,isAI,ready,score){
   
    this.id = id;
    this.socket = socket;
    this.color = color;
    this.isAI = isAI;
    //init brickList
    this.brickList = matrixList.shuffle().map(function(brick){
        return new Brick(brick)
    });
     this.ready = ready;
    this.score = score;
}
Player.prototype.play = function() {
    for (n = 0; n < this.brickList.length; n++) {
        if (brickList[n].state == 1) {
            for (var i = 0; i <= matrix.length - brickList.list[n].matrix.length; i++) {
                for (var j = 0; j <= matrix[0].length - brickList.list[n].matrix[0].length; j++) {
                    //定点i,j  8种角度
                    if (matrix[i][j] == 0) {
                        for (temp = 0; temp < 8; temp++) {
                            temp % 2 == 1 ? brickList.list[n].rotate() : brickList.list[n].reversal();
                            var result = canPut(brickList.list[n], i, j);
                            if (result) {
                                change(result);
                                brickList.list[n].state = 0;
                               
                                return result;
                            }
                        }
                    }
                }
            }
        }
    }
}
function Brick(matrix){
    this.state = 1; //state 1 show,0 remove
    this.size = 0;
    this.matrix = matrix;
    this.color = color;
    for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix[0].length; j++) {
            if (this.matrix[i][j]) {
                this.size++;
            }
        }
    }
}
//旋转
Brick.prototype.rotate = function() {
    var that = this;
    this.matrix = this.matrix.reverse()[0].map(function(col, i) {
        return that.matrix.map(function(row) {
            return row[i];
        })
    });
}
//翻转
Brick.prototype.reversal = function() {
    this.matrix.reverse();
}


var playList = [];
playList.push(new Player())

//brick在棋盘table上是否可放置,i纵坐标,j横坐标
//return false 不能
//return [[row,col], .. ],可以,table上的这些点需要变色
function canPut(brick, i, j) {
    var result = [];
    //出界
    if (i + brick.matrix.length > matrix.length || j + brick.matrix[0].length > matrix[0].length) return false;
    //第一块要在角落
    if (firstBrick) {
        var corner = false;
        for (var n = 0; n < brick.matrix.length; n++) {
            for (var m = 0; m < brick.matrix[0].length; m++) {
                if (brick.matrix[n][m]) {
                    if (((i + n == matrix.length - 1 && (j + m == matrix[0].length - 1 || j + m == 0)) ||
                            (i + n == 0 && (j + m == matrix[0].length - 1 || j + m == 0))) &&
                        matrix[i + n][j + m] == 0) {
                        corner = true;
                    }
                    //需要更新的块
                    result.push([i + n, j + m]);
                }
            }
        }
        if (corner) {
            firstBrick = false;
            return result;
        } else {
            return false;
        }
    } else {
        var temp = false;
        for (var n = 0; n < brick.matrix.length; n++) {
            for (var m = 0; m < brick.matrix[0].length; m++) {
                //重叠
                if (matrix[i + n][j + m] && brick.matrix[n][m]) {
                    return false;
                }
                if (brick.matrix[n][m]) {
                    //边不能对边
                    if (i + n + 1 < matrix.length && brick.matrix[n][m] == matrix[i + n + 1][j + m]) {
                        return false;
                    }
                    if (i + n - 1 >= 0 && brick.matrix[n][m] == matrix[i + n - 1][j + m]) {
                        return false;
                    }
                    if (j + m + 1 < matrix[0].length && brick.matrix[n][m] == matrix[i + n][j + m + 1]) {
                        return false;
                    }
                    if (j + m - 1 >= 0 && brick.matrix[n][m] == matrix[i + n][j + m - 1]) {
                        return false;
                    }
                    //角对角
                    if (i + n + 1 < matrix.length && j + m + 1 < matrix[0].length && brick.matrix[n][m] == matrix[i + n + 1][j + m + 1]) {
                        temp = true;
                    }
                    if (i + n + 1 < matrix.length && j + m - 1 >= 0 && brick.matrix[n][m] == matrix[i + n + 1][j + m - 1]) {
                        temp = true;
                    }
                    if (i + n - 1 >= 0 && j + m + 1 < matrix[0].length && brick.matrix[n][m] == matrix[i + n - 1][j + m + 1]) {
                        temp = true;
                    }
                    if (i + n - 1 >= 0 && j + m - 1 >= 0 && brick.matrix[n][m] == matrix[i + n - 1][j + m - 1]) {
                        temp = true;
                    }
                    //需要更新的块
                    result.push([i + n, j + m]);
                }
            }
        }
        if (!temp) {
            return false;
        } else {
            return result;
        }
    }
}