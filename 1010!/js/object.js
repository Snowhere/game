/**
 * 最小单元:方块
 */
function Square(id, color, position) {
    this.color = color;
    //TODO create Element and set id, position and color. eg:this.dom = document.createElement();
    this.dom
    this.dom.className = color;
}

//改变颜色
Square.prototype.changeColor = function(color) {
    this.color = color;
    this.dom.className = color;
}

/**
 * 可拖动的游戏块
 */
function Brick(id, color, position, matrix) {
    this.state = 1; //state 1 show,0 remove
    this.matrix = matrix;
    this.color = color;
    this.dom;
    this.squars = [];
    //TODO create Element and set id, position.  eg:this.dom = document.createElement();

    //create Squares
    for (var n = 0; n < matrix.length; n++) {
        for (var m = 0; m < matrix[0].length; m++) {
            if (matrix[n][m]) {
                squars.push(new Square(squarId, this.color, squarePosition));//TODO squarePositon 通过n,m和设定的边长确定
            } else {
                squars.push(new Square(squarId, color.default, squarePosition));
            }
        }
    }

    this.dom.addEventListener('mousedown', function(e) {
        param.flag = true;
        param.currenBrick = this;
        //TODO addDragEvent
    });
}

//移除
Brick.prototype.remove = function() {
    this.state = 0;
    //TODO this.dom.remove
}

/**
 * 游戏块列表
 */
function BrickList(position, brickAmout) {
    this.list = [];
    this.dom;
    //TODO create Element and set  position.  eg:this.dom = document.createElement();

    //TODO create bricks
    for (var i = 0; i < brickAmout; i++) {
        list[i] = new Brick(i, color.random(), position, matrix.random());
    }
}
//移除
BrickList.prototype.remove = function(id) {
    this.list[id].remove();
}

//空
BrickList.prototype.isEmpty = function(id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].state == 1) return false;
    }
    return true;
}
//
BrickList.prototype.reCreate = function() {
    for (var i = 0; i < brickAmout; i++) {
        list[i] = new Brick(i, color.random(), position, matrix.random());
    }
}
/**
 * 棋盘
 */
function Table(position, row, col) {
    this.matrix = [];
    this.squars = [];
    this.dom;
    //create matrix and Squares;
    for (var i = 0; i <= 100; i++) {
        this.matrix[i] = []
        for (var j = 0; j <= 100; j++) {
            this.matrix[i][j] = 0;
            squars.push(new Square(squarId, color.default, squarPosition));
        }
    }
    //TODO create Element and set id, position. eg:this.dom = document.createElement();
}

//更新色块
Table.prototype.update = function(positionList, color) {
    for (var i = 0; i < positionList.length; i++) {
        this.matrix[positionList[i][0], positionList[i][1]] = 1;
        this.squars[positionList[i][0] * this.matrix[0].length + positionList[i][1]].changeColor(color); //Square.changeColor
    }
}

//消除行列
Table.prototype.clear = function(rows, cols) {
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            this.matrix[rows[i], j] = 0;
            this.squars[rows[i] * this.matrix[0].length + j].changeColor(color.default); //Square.changeColor
        }
    }
    for (var i = 0; i < cols.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            this.matrix[j, cols[i]] = 0;
            this.squars[j * this.matrix[0].length + cols[i]].changeColor(color.default); //Square.changeColor
        }
    }
}

/**
 * brick在棋盘table上是否重叠
 * return false 重叠
 * return [[row,col], .. ],不重叠,table上的这些点需要变色
 */
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

/**
 * brickList中brick在棋盘table上是否可放置
 * return false 不可放置
 * return [[row,col], .. ],可放置,table上的这些点需要变色
 */
Table.prototype.checkPossible = function(brickList) {
    for (var n = 0; n < brickList.length; n++) {
        if (brickList[n].state == 1) {
            for (var i = 0; i <= this.matrix.length - brickList[n].matrix.length; i++) {
                for (var j = 0; j <= this.matrix[0].length - brickList[n].matrix[0].length; j++) {
                    //定点i,j
                    var result = this.checkNoCover(brickList[n], i, j);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
    return false;
}

/*
 * table检测是否饱满要消除
 * return false 不需要
 * return [[row1,row2],[col1,col2]]需要清除的行列
 */
function needClear() {

}
