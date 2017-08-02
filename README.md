# game
## 1010! is a game.
It is responsive and configurable.
``` javascript
//init table
var tableRow = 10;
var tableCol = 14;
var table = new Table(gameWidth, tableRow, tableCol);

//init bircks
var brickAmount = 5;
var brickList = new BrickList(gameWidth,brickAmount);
```

[在线play](https://snowhere.github.io/game/1010!/)

### TODO:

* 调整在鼠标按下时方块由小变大的位置与按下时不成比例的情况, 优化用户体验
* 代码重构
* 增加本地存储, 以便在刷新页面之后, 可以保持游戏状态

