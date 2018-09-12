/**
 * 最小单元:方块
 */
function Square(id, color, fatherDom, length, top, left) {
    this.color = color;
    this.dom = document.createElement('div');
    this.dom.id = id;
    this.dom.className = color.colorList[color];
    this.dom.style.width = length * 0.9 + 'px';
    this.dom.style.height = length * 0.9 + 'px';
    this.dom.style.top = top + 'px';
    this.dom.style.left = left + 'px';
    this.dom.style.position = 'absolute';
    this.dom.style.borderRadius = '3px';
    fatherDom.appendChild(this.dom);
}

//改变颜色
Square.prototype.changeColor = function(color) {
    this.color = color;
    this.dom.className = color.colorList[color];
}


/**
 * 游戏块
 */
function Brick(id, color, matrix, fatherDom, length, left, top, canDrag) {
    this.state = 1; //state 1 show,0 remove
    this.size = 0;
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
    this.draw();
    fatherDom.appendChild(this.dom);

    var that = this;
    if (canDrag) {

        if ('ontouchend' in document) {
            this.dom.addEventListener('touchstart', function(e) {
                e = e.touches[0];
                param.currentBrick = that;
                that.hide();
                //var x = page.layerX(e);
                //var y = page.layerY(e);
                param.dragBrick = new Brick('drag', that.color, that.matrix, document.body, that.length, getPosition(this).x, getPosition(this).y, false);
                param.x = page.pageX(e) - getPosition(this).x;
                param.y = page.pageY(e) - getPosition(this).y;
                document.addEventListener('touchmove', move, false);
                document.addEventListener('touchend', up, false);
            }, false);
        } else {
            this.dom.onmousedown = function(e) {
                param.currentBrick = that;
                param.clickBrick = that;
                //边框
                for (var i = 0; i < brickList.list.length; i++) {
                    if (i == this.id.split('-')[1]) {
                        brickList.list[i].clickStyle(true);
                    } else {
                        brickList.list[i].clickStyle(false);
                    }
                }
                that.hide();
                //var x = page.layerX(e);
                //var y = page.layerY(e);
                param.dragBrick = new Brick('drag', that.color, that.matrix, document.body, that.length, getPosition(this).x, getPosition(this).y, false);
                param.x = page.layerX(e);
                param.y = page.layerY(e);
                document.onmouseup = up;
                document.onmousemove = move;
            }
        }
    }
}
//改变点击样式
Brick.prototype.clickStyle = function(click) {
    for (var i = 0; i < this.squares.length; i++) {
        if (click) {
            this.squares[i].dom.style.border = '1px solid blue';
        } else {
            this.squares[i].dom.style.border = '';
        }
    }
}

//绘制
Brick.prototype.draw = function() {
    var size = 0;
    var color = this.color;
    for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix[0].length; j++) {
            if (this.matrix[i][j]) {
                this.squares.push(new Square('bs-' + i + '-' + j, this.color, this.dom, squareWidth, squareWidth * i, squareWidth * j));
                size++;
            }
        }
    }
    this.size = size;
}
//旋转
Brick.prototype.rotate = function() {
    var that = this;
    this.matrix = this.matrix.reverse()[0].map(function(col, i) {
        return that.matrix.map(function(row) {
            return row[i];
        })
    });
    this.dom.innerHTML = '';
    this.squares = [];
    this.draw();
    this.clickStyle(true);
}
//翻转
Brick.prototype.reversal = function() {
    this.matrix.reverse();
    this.dom.innerHTML = '';
    this.squares = [];
    this.draw();
    this.clickStyle(true);
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
function BrickList(dom, gameWidth, brickAmout) {
    this.list = [];
    this.amount = brickAmout;
    this.dom = dom;
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth + 'px';

    for (var i = 0; i < brickAmout; i++) {
        //FIXME 
        this.list[i] = new Brick('b' + '-' + i, color.random(), matrixList[i], this.dom, squareWidth * 5, squareWidth * 5 * (i % 5), squareWidth * 5 * parseInt(i / 5), true); //0.9防止相邻两个brick相连
    }
}

//空
BrickList.prototype.isEmpty = function(id) {
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].state == 1) return false;
    }
    return true;
}
//剩余面积
BrickList.prototype.getSize = function(id) {
    var totalSize=0;
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].state == 1) {
            totalSize += this.list[i].size;
        }
    }
    return totalSize;
}


/**
 * 棋盘
 */
function Table(dom, gameWidth, row, col) {
    this.matrix = [];
    this.squares = [];
    this.dom = dom;
    this.dom.style.width = gameWidth + 'px';
    this.dom.style.height = gameWidth + 'px';
    //create matrix and Squares;
    for (var i = 0; i < row; i++) {
        this.matrix[i] = []
        for (var j = 0; j < col; j++) {
            this.matrix[i][j] = 0;
            this.squares.push(new Square('t-' + i + '-' + j, color.default, this.dom, squareWidth, squareWidth * i, squareWidth * j));
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

//brick在棋盘table上是否可放置,i纵坐标,j横坐标
//return false 不能
//return [[row,col], .. ],可以,table上的这些点需要变色
Table.prototype.canPut = function(brick, i, j) {
    var result = [];
    //出界
    if (i + brick.matrix.length > this.matrix.length || j + brick.matrix[0].length > this.matrix[0].length) return false;
    //第一块要在角落
    if (firstBrick) {
        var corner = false;
        for (var n = 0; n < brick.matrix.length; n++) {
            for (var m = 0; m < brick.matrix[0].length; m++) {
                if (brick.matrix[n][m]) {
                    if (((i + n == this.matrix.length - 1 && (j + m == this.matrix[0].length - 1 || j + m == 0)) ||
                            (i + n == 0 && (j + m == this.matrix[0].length - 1 || j + m == 0))) &&
                        this.matrix[i + n][j + m] == 0) {
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
                if (this.matrix[i + n][j + m] && brick.matrix[n][m]) {
                    return false;
                }
                if (brick.matrix[n][m]) {
                    //边不能对边
                    if (i + n + 1 < this.matrix.length && brick.matrix[n][m] == this.matrix[i + n + 1][j + m]) {
                        return false;
                    }
                    if (i + n - 1 >= 0 && brick.matrix[n][m] == this.matrix[i + n - 1][j + m]) {
                        return false;
                    }
                    if (j + m + 1 < this.matrix[0].length && brick.matrix[n][m] == this.matrix[i + n][j + m + 1]) {
                        return false;
                    }
                    if (j + m - 1 >= 0 && brick.matrix[n][m] == this.matrix[i + n][j + m - 1]) {
                        return false;
                    }
                    //角对角
                    if (i + n + 1 < this.matrix.length && j + m + 1 < this.matrix[0].length && brick.matrix[n][m] == this.matrix[i + n + 1][j + m + 1]) {
                        temp = true;
                    }
                    if (i + n + 1 < this.matrix.length && j + m - 1 >= 0 && brick.matrix[n][m] == this.matrix[i + n + 1][j + m - 1]) {
                        temp = true;
                    }
                    if (i + n - 1 >= 0 && j + m + 1 < this.matrix[0].length && brick.matrix[n][m] == this.matrix[i + n - 1][j + m + 1]) {
                        temp = true;
                    }
                    if (i + n - 1 >= 0 && j + m - 1 >= 0 && brick.matrix[n][m] == this.matrix[i + n - 1][j + m - 1]) {
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


//brickList中brick在棋盘table上是否可放置
//return false 不可放置
//return [[row,col], .. ],可放置,table上的这些点需要变色
Table.prototype.checkPossible = function(brickList) {
    for (var n = 0; n < brickList.list.length; n++) {
        if (brickList.list[n].state == 1) {
            for (var i = 0; i <= this.matrix.length - brickList.list[n].matrix.length; i++) {
                for (var j = 0; j <= this.matrix[0].length - brickList.list[n].matrix[0].length; j++) {
                    //定点i,j
                    var result = this.canPut(brickList.list[n], i, j);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
    return false;
}