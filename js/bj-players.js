/*****************************************************************************

    bj-players.js

    Andy Knoll
    November 2018

*****************************************************************************/

var BJHand = require('./bj-hand.js');

var br = "\r\n";

// BJPlayer "class"
var BJPlayer = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJPlayer";
    this.nickname = "";
    this.cash = 0;
    this.hand = new BJHand(this.name() + "_hand", this);
};
BJPlayer.prototype = Object.create(AKObject.prototype);
BJPlayer.prototype.constructor = BJPlayer;

BJPlayer.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".nickname: " + this.nickname + br;
    s += ".cash: " + this.cash + br;
    s += ".hand: " + this.hand + br;
    //s += ".hand: " + this.hand.name() + br;
    return s;
};

BJPlayer.prototype.clearHand = function() {
    this.hand.clear();
};





// BJPlayers collection "class" - add Dealer first! (unless built-in)
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
        s += player.nickname.padEnd(15) + player.hand.cardFaceValues() + br;        // MOVE THESE TO PLAYER (+ DEALER)
    }
    return s;
};

BJPlayers.prototype.cardValues = function() {
    var s = "";
    var player = null;
    for (var p = 0; p < this.count(); p++) {
        player = this.player(p);
        s += player.nickname.padEnd(15) + player.hand.cardValues() + br;
    }
    return s;
};

// remember to do this before each game
BJPlayers.prototype.clearHands = function() {
    var player = null;
    for (var p = 0; p < this.count(); p++) {
        this.player(p).clearHand();
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


module.exports = { 
    BJPlayer  : BJPlayer,
    BJPlayers : BJPlayers
}

