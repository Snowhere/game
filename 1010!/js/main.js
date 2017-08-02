var gameWidth = document.body.clientWidth < 520 ? (document.body.clientWidth - 50) : 500;
document.getElementById('info').style.display = 'none';
/**
 * game start
 */
//init table
var tableRow = 8;
var tableCol = 8;
var table = new Table(gameWidth, tableRow, tableCol);

//init bircks
var brickAmount = 3;
var brickList = new BrickList(gameWidth, brickAmount);

//immediate create brick
var immediate = true;

var squareWidth = gameWidth / tableCol;
var score = 0;
//mouse event
function up(e) {
    e.preventDefault();
    if ('ontouchend' in document) { e = e.touches[0]; }
    var updatePosition = false;
    var dragPosition = getPosition(param.dragBrick.dom);
    var tablePosition = getPosition(table.dom);
    if (dragPosition.x < tablePosition.x - squareWidth / 2 || dragPosition.y < tablePosition.y - squareWidth / 2 || dragPosition.x - table.dom.offsetWidth > tablePosition.x + squareWidth / 2 || dragPosition.y - table.dom.offsetHeight > tablePosition.y + squareWidth / 2) {
        updatePosition = false; //越界
    } else {
        updatePosition = table.checkNoCover(param.dragBrick, Math.round((dragPosition.y - tablePosition.y) / squareWidth), Math.round((dragPosition.x - tablePosition.x) / squareWidth));
    }
     //删掉dragBrick
    param.dragBrick.remove();
    if (updatePosition) {
        param.currentBrick.remove();
        //更新blockList
        if (immediate || brickList.isEmpty()) {
            brickList.reCreate();
        }
        //更新table
        table.update(updatePosition, param.dragBrick.color);
        var clearPosition = table.needClear();
        if (clearPosition[0].length || clearPosition[1].length) {
            setTimeout(function(){table.clear(clearPosition[0], clearPosition[1])},100);//不知道为什么必须延迟才有动画效果
            score += getScore(clearPosition[0].length + clearPosition[1].length);
            document.getElementById('score').innerHTML = score;
        }
        //game over
        var notOver = table.checkPossible(brickList);
        if (!notOver) {
            document.getElementById('titleInfo').innerHTML = 'game over';
            document.getElementById('info').style.display = 'block';
        }
    } else {
        param.currentBrick.show();
    }
    //异常鼠标事件
    document.onmouseup = null;
    document.onmousemove = null;
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', up);
}

function move(e) {
    e.preventDefault();
    if ('ontouchend' in document) { e = e.touches[0]; }
    var tx = page.pageX(e) - param.x;
    var ty = page.pageY(e) - param.y;
    param.dragBrick.dom.style.left = tx + "px";
    param.dragBrick.dom.style.top = ty + "px";
}

//根据单次消除的行列计算得分
function getScore(num){
    return Math.pow(2,(num-1));
}