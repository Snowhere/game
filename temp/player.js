if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
function Player(id,color,isAI,brickList){
    this.id = id;
    this.color = color;
    this.isAI = isAI;
    //init brickList
    this.brickList = brickList;
}

var playList = [];
playList.push(new Player())

var array = [1,2,3,4,5,6,7,8];
console.log(array.shuffle())