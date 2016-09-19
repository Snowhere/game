/**
 * 最小单元:方块
 */
function Square(id, color, fatherDom, length, top, left) {
    this.color = color;
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.className = color;
    this.dom.style.width = length * 0.9 + 'px';
    this.dom.style.height = length * 0.9 + 'px';
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.borderRadius = '5px';
    fatherDom.appendChild(this.dom);
}

//改变颜色
Square.prototype.changeColor = function(color) {
    this.color = color;
    this.dom.className = color;
}


/**
 * 游戏块
 */
function Brick(id, color, matrix, fatherDom, length, left, top, canDrag) {
    this.state = 1; //state 1 show,0 remove
    this.matrix = matrix;
    this.squares = [];
    this.color = color;
    //dom
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.style.width = length + 'px';
    this.dom.style.height = length + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.left = left + 'px';
    this.dom.style.top = top + 'px';
    //create Squares
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j]) {
                this.squares.push(new Square('bs-' + i + '-' + j, this.color, this.dom, length / 5, length / 5 * i, length / 5 * j));
            } else {
                // this.squares.push(new Square('bs-' + i + '-' + j, color.default, this.dom, length / 5 * 0.9, length / 5 * i * 0.9, length / 5 * j * 0.9));
            }
        }
    }
    fatherDom.appendChild(this.dom);
    if (canDrag) {
        var that = this;
        this.dom.onmousedown = function(e) {
            param.currentBrick = that;
            that.hide();
            //var x = page.layerX(e);
            //var y = page.layerY(e);
            param.dragBrick = new Brick('drag', that.color, that.matrix, document.body, gameWidth / tableCol * 5, getPosition(this).x, getPosition(this).y, false);
            param.x = page.layerX(e);
            param.y = page.layerY(e);
            document.onmouseup = up;
            document.onmousemove = move;
        }
    }
}

//移除
Brick.prototype.remove = function() {
    this.state = 0;
    this.dom.parentNode.removeChild(this.dom);
}

//隐藏
Brick.prototype.hide = function() {
    this.dom.style.visibility = 'hidden';
}

//展示
Brick.prototype.show = function() {
    this.dom.style.visibility = '';
}


/**
 * 游戏块列表
 */
function BrickList(gameWidth, brickAmout) {
    this.list = [];
    this.amount = brickAmout;
    this.dom = document.getElementById('bricks');
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth / brickAmout + 'px';

    for (var i = 0; i < brickAmout; i++) {
        this.list[i] = new Brick('b' + '-' + i, color.random(), matrix.random(), this.dom, gameWidth / brickAmout * 0.9, gameWidth / brickAmout * i, 0, true); //0.9防止相邻两个brick相连
    }
}

//空
BrickList.prototype.isEmpty = function(id) {
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].state == 1) return false;
    }
    return true;
}

//重新生成
BrickList.prototype.reCreate = function() {
    for (var i = 0; i < this.amount; i++) {
        this.list[i] = new Brick('b' + '-' + i, color.random(), matrix.random(), this.dom, gameWidth / this.amount * 0.9, gameWidth / this.amount * i, 0, true); //0.9防止相邻两个brick相连
    }
}


/**
 * 棋盘
 */
function Table(gameWidth, row, col) {
    this.matrix = [];
    this.squares = [];
    this.dom = document.getElementById('table');
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth / col * row + 'px';
    //create matrix and Squares;
    for (var i = 0; i < row; i++) {
        this.matrix[i] = []
        for (var j = 0; j < col; j++) {
            this.matrix[i][j] = 0;
            this.squares.push(new Square('t-' + i + '-' + j, color.default, this.dom, gameWidth / col, gameWidth / col * i, gameWidth / col * j));
        }
    }
}

//更新色块
Table.prototype.update = function(positionList, color) {
    for (var i = 0; i < positionList.length; i++) {
        this.matrix[positionList[i][0]][positionList[i][1]] = 1;
        this.squares[positionList[i][0] * this.matrix[0].length + positionList[i][1]].changeColor(color); //Square.changeColor
    }
}

//消除行列
Table.prototype.clear = function(rows, cols) {
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < this.matrix[0].length; j++) {
            this.matrix[rows[i]][j] = 0;
            this.squares[rows[i] * this.matrix[0].length + j].changeColor(color.default); //Square.changeColor
        }
    }
    for (var i = 0; i < cols.length; i++) {
        for (var j = 0; j < this.matrix.length; j++) {
            this.matrix[j][cols[i]] = 0;
            this.squares[j * this.matrix[0].length + cols[i]].changeColor(color.default); //Square.changeColor
        }
    }
}

//brick在棋盘table上是否重叠,i纵坐标,j横坐标
//return false 重叠
//return [[row,col], .. ],不重叠,table上的这些点需要变色
Table.prototype.checkNoCover = function(brick, i, j) {
    var result = [];
    if (i + brick.matrix.length > this.matrix.length || j + brick.matrix[0].length > this.matrix[0].length) return false;
    for (var n = 0; n < brick.matrix.length; n++) {
        for (var m = 0; m < brick.matrix[0].length; m++) {
            if (this.matrix[i + n][j + m] && brick.matrix[n][m]) {
                return false;
            }
            if (brick.matrix[n][m]) {
                result.push([i + n, j + m]);
            }
        }
    }
    return result;
}

//brickList中brick在棋盘table上是否可放置
//return false 不可放置
//return [[row,col], .. ],可放置,table上的这些点需要变色
Table.prototype.checkPossible = function(brickList) {
    for (var n = 0; n < brickList.list.length; n++) {
        if (brickList.list[n].state == 1) {
            for (var i = 0; i <= this.matrix.length - brickList.list[n].matrix.length; i++) {
                for (var j = 0; j <= this.matrix[0].length - brickList.list[n].matrix[0].length; j++) {
                    //定点i,j
                    var result = this.checkNoCover(brickList.list[n], i, j);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
    return false;
}

//table检测是否饱满要消除
//return false 不需要
//return [[row1,row2],[col1,col2]]需要清除的行列
Table.prototype.needClear = function() {
    var rows = [];
    var cols = [];
    for (var i = this.matrix.length - 1; i >= 0; i--) {
        var sum = 0;
        for (var j = this.matrix[0].length - 1; j >= 0; j--) {
            sum += this.matrix[i][j];
        }
        if (sum == this.matrix[0].length) { rows.push(i); }
    }
    for (var i = this.matrix[0].length - 1; i >= 0; i--) {
        var sum = 0;
        for (var j = this.matrix.length - 1; j >= 0; j--) {
            sum += this.matrix[j][i];
        }
        if (sum == this.matrix.length) { cols.push(i); }
    }
    return [rows, cols];
}
