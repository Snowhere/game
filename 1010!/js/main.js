var gameWidth = window.screen.width < 520 ? (window.screen.width - 50) : 500;

/**
 * game start
 */

//init table
var tableRow = 10;
var tableCol = 10;
var table = new Table(gameWidth, tableRow, tableCol);

//init bircks
var brickAmount = 3;
var brickList = new BrickList(gameWidth, brickAmount);

var squareWidth = gameWidth / tableCol;
var score = 0;
//mouse event
function up(e) {
    var updatePosition = false;
    var dragPosition = getPosition(param.dragBrick.dom);
    var tablePosition = getPosition(table.dom);
    if (dragPosition.x < tablePosition.x || dragPosition.y < tablePosition.y || dragPosition.x - table.dom.offsetWidth > tablePosition.x || dragPosition.y - table.dom.offsetHeight > tablePosition.y) {
        updatePosition = false; //越界
    } else {
        updatePosition = table.checkNoCover(param.dragBrick, Math.round((dragPosition.y - tablePosition.y) / squareWidth), Math.round((dragPosition.x - tablePosition.x) / squareWidth));
    }
    if (updatePosition) {
        param.currentBrick.remove();
        //更新blockList
        if (brickList.isEmpty()) {
            brickList.reCreate();
        }
        //更新table
        table.update(updatePosition, param.dragBrick.color);
        var clearPosition = table.needClear();
        if (clearPosition[0].length||clearPosition[1].length) {
            table.clear(clearPosition[0], clearPosition[1], color.default);
            score+=clearPosition[0].length+clearPosition[1].length;
        }
        //game over
        var notOver = table.checkPossible(brickList);
        if (!notOver) {
            document.getElementById('info').innerHTML = 'game over,score:'+score;
        }
    } else {
        param.currentBrick.show();
    }
    //删掉dragBrick
    param.dragBrick.remove();
    //异常鼠标事件
    document.onmouseup = null;
    document.onmousemove = null;
}

function move(e) {
    var tx = page.pageX(e) - param.x;
    var ty = page.pageY(e) - param.y;
    param.dragBrick.dom.style.left = tx + "px";
    param.dragBrick.dom.style.top = ty + "px";
}
