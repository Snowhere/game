var color = {
    default: 'default',
    colorList: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    random: function() {
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }
};

var matrix = {
    matrixList: [
        //one block
        [[1]],
        //row
        [[1,1,1,1,1]],
        [[1,1,1,1]],
        [[1,1,1]],
        [[1,1]],
        //column
        [[1],[1],[1],[1],[1]],
        [[1],[1],[1],[1]],
        [[1],[1],[1]],
        [[1],[1]],
        //2*2 blocks
        [[1,1],[1,1]],
        [[1,1],[1,0]],
        [[1,1],[0,1]],
        [[1,0],[1,1]],
        [[0,1],[1,1]],
        //3*3 blocks
        [[1,1,1],[1,1,1],[1,1,1]],
        [[1,1,1],[1,0,0],[1,0,0]],
        [[1,1,1],[0,0,1],[0,0,1]],
        [[1,0,0],[1,0,0],[1,1,1]],
        [[0,0,1],[0,0,1],[1,1,1]]
    ],
    random: function() {
        return this.matrixList[Math.floor(Math.random() * this.matrixList.length)];
    }
};


var page = {
    event: function(evt) {
        var ev = evt || window.event;
        return ev;
    },
    pageX: function(evt) {
        var e = this.event(evt);
        return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
    },
    pageY: function(evt) {
        var e = this.event(evt);
        return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop);

    },
    layerX: function(evt) {
        var e = this.event(evt);
        return e.layerX || e.offsetX;
    },
    layerY: function(evt) {
        var e = this.event(evt);
        return e.layerY || e.offsetY;
    }
}

var param = {
    //移动的brick
    dragBrick:null,
    //选中的brick
    currentBrick:null,
    //触摸位置在dragBrick中位置，用于移动计算绝对位置
    x:null,
    y:null
};


function getPosition(e) {
    var x = 0,
        y = 0;
    while (e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return { x: x, y: y };
}
