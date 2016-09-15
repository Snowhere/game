/**
 * game start
 */

//init table
var tableRow = 10;
var tableCol = 10;
var table = new Table(position, tableRow, tableCol);

//init bircks
var brickAmount = 3;
var brickList = new BrickList(position,brickAmount);

//TODO get square height and width;
var squareHeight = squareWidth = ;

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
