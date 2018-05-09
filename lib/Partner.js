function Players() {
    this.list = [];
    this.amount=0;
}

Players.prototype.isEmpty = function() {
    for (var i = this.list.length - 1; i >= 0; i--) {
        if (!this.list[i].gg) return false;
    }
    return true;
}
Players.prototype.addPlayer = function(socket) {
    var player;
    this.amount++;
    if (this.isEmpty()) {
        player = new Player(this.list.length, socket);
        this.list.push(player);
        return player;
    } else {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].gg) {
                this.list[i] = player = new Player(i, socket);
                return player;
            }
        }
    }

}
Players.prototype.removePlayer = function(id){
    this.list[id].gg=true;
    this.amount--;
}


module.exports = Players;