/*****************************************************************************

    bj-players.js

    Andy Knoll
    November 2018

*****************************************************************************/

var BJPlayer = require("./bj-player.js");

var br = "\r\n";


// BJPlayers collection "class"
var BJPlayers = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJPlayers";
};
BJPlayers.prototype = Object.create(AKCollection.prototype);
BJPlayers.prototype.constructor = BJPlayers;

// getter
BJPlayers.prototype.player = function(idx) { return this.object(idx); };

BJPlayers.prototype.addPlayer = function(player) {
    return this.addObject(player);
};

BJPlayers.prototype.createAndAddPlayers = function(num) {
    var player = null;
    for (var i = 0; i < num; i++) {
        player = new BJPlayer("player" + i, this);
        this.addPlayer(player);
    }
};

BJPlayers.prototype.cardFaceValues = function() {
    var s = "";
    var player = null;
    for (var p = 0; p < this.count(); p++) {
        player = this.player(p);
        s += player.cardFaceValues();
    }
    return s;
};

BJPlayers.prototype.cardValues = function() {
    var s = "";
    var player = null;
    for (var p = 0; p < this.count(); p++) {
        player = this.player(p);
        s += player.cardValues();
    }
    return s;
};

BJPlayers.prototype.cardValuesAndPointTotal = function() {
    var s = "";
    var player = null;
    for (var p = 0; p < this.count(); p++) {
        player = this.player(p);
        s += player.cardValuesAndPointTotal();
    }
    return s;
};

// remember to do this before each game
BJPlayers.prototype.clearHands = function() {
    for (var p = 0; p < this.count(); p++) {
        this.player(p).clearHand();
    }
};

BJPlayers.prototype.anteAllUp = function() {
    for (var p = 0; p < this.count(); p++) {
        this.player(p).anteUp();
    }
};

/***
BJPlayers.prototype.cardValues = function() {
    var s = "";
    var player = null;
    for (var p = 1; p < this.count(); p++) {
        player = this.player(p);
        s += player.nickname.padEnd(15) + player.hand.cardValues() + br;
    }
    s += this.dealer.nickname.padEnd(15) + this.dealer.hand.cardValues() + br;
    return s;
};
***/


module.exports = BJPlayers;
