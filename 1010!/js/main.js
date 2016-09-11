var color = {
    default: '';
    colorList: ['', '', '', ''],
    random: function() {
        return colorList[Math.floor(Math.random() * colorList.length)];
    }
};
var matrix = {
    matrixList: ['', '', ''],
    random: function() {
        return matrixList[Math.floor(Math.random() * matrixList.length)];
    }
};

var params = {
    currentBrick = null,
    flag: false
};
/*
 * game start
 */
//init table
var tableRow = 10;
var tableCol = 10;
var table = new Table(position, tableRow, tableCol);
//init bircks
var brickAmount = 3;
var brickList = [];
for (var i = 0; i < brickAmount; i++) {
     brickList[i]=new Brick(i, color.random(), position, matrix.random());
}

//add mouse event
document.onmouseup = function(e) {
    if (params.flag) {
        var updatePosition = table.checkNoCover(params.currentBrick);
        if (updatePosition) {

            //更新table
            table.update(updatePosition, params.currentBrick.color);
            //更新block
            params.currentBrick.remove();
            //TODO 更新blockList
            /*for (var i = 0; i < brickAmount; i++) {
                brickList[i]=new Brick(id, color.random(), position, matrix.random());
            }*/
            //行列满
            var clearPosition = table.needClear()
            if (clearPosition) {
                table.clear(clearPosition[0], clearPosition[1], color.default);
            }
            //game over
            var notOver = table.checkPossible(brickList);
            if (!notOver) {
                gameOver();
            }
        }
    }
}
document.onmousemove = function(event) {
    if (params.flag) {
        //TODO 
    }
}
