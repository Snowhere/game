function Player(id, socket) {
    this.id = id;
    this.socket = socket;
    this.gg = false;
}
module.exports.Player = Player;