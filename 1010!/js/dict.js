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