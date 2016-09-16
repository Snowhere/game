var color = {
    default: 'default';
    colorList: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
    random: function() {
        return colorList[Math.floor(Math.random() * colorList.length)];
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
        return matrixList[Math.floor(Math.random() * matrixList.length)];
    }
};

var params = {
    currentBrick = null,
    flag: false
};
