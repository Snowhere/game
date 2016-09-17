var gameWidth = window.screen.width < 520 ? (window.screen.width - 50) : 500;

/**
 * game start
 */

//init table
var tableRow = 10;
var tableCol = 16;
var table = new Table(gameWidth, tableRow, tableCol);

//init bircks
var brickAmount = 5;
var brickList = new BrickList(gameWidth,brickAmount);
/*
//TODO get square height and width;
var squareHeight = squareWidth = 0;

//add mouse event
document.onmouseup = function(e) {
    if (params.flag) {
        //TODO 获取brick左上角相对于table左上角的距离left和top
        var left,top;

        var updatePosition = table.checkNoCover(params.currentBrick,Math.round(top/squareHeight),Math.round(left/squareWidth));
        if (updatePosition) {
            //更新block
            params.currentBrick.remove();
            //更新blockList
            if(brickList.isEmpty()){
                brickList.reCreate();
            }
            //更新table
            table.update(updatePosition, params.currentBrick.color);
            var clearPosition = table.needClear()
            if (clearPosition) {
                table.clear(clearPosition[0], clearPosition[1], color.default);
            }
            //game over
            var notOver = table.checkPossible(brickList);
            if (!notOver) {
                alert('game over');
            }
        }
    }
}
document.onmousemove = function(event) {
    if (params.flag) {
        //TODO 动画效果
    }
}
*/