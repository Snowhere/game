var   matrixList= [
        [[1]],

        [[1,1]],
        [[1,1,1]],
        [[1,1,1,1]],
        [[1,1,1,1,1]],
    
        [[1,1],[1,1]],
        [[1,1],[1,0]],
        
        [[1,0,0],[1,1,1]],
        [[1,0,0],[1,0,0],[1,1,1]],
        [[1,0,0,0],[1,1,1,1]],
        [[1,1,0,0],[1,1,1,1]],
        [[1,1,0],[0,1,1]],
        [[1,1,0,0],[0,1,1,1]],

        [[1,1,0],[0,1,0],[0,1,1]],

        [[1,1,0],[0,1,1],[0,0,1]],
        [[0,1,0],[1,1,1],[0,1,0]],
        [[0,1,0],[1,1,1]],
        [[0,1,0,0],[1,1,1,1]],
        [[0,1,0],[0,1,0],[1,1,1]],
        [[1,0,1],[1,1,1]],
        [[0,1,0],[1,1,1],[1,0,0]],
    ];


var color = {
    default: 'default',
    colorList: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    random: function() {
        return 'c1';
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
    dragBrick:null,
    currentBrick:null,
    clickBrick:null,
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
