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
    this.inAnte = 0;
    this.hand = new BJHand(this.name() + "_hand", this);

    this.isBusted   = false;      // set each round
    this.roundCount = 0;
    this.winCount   = 0;
    this.lossCount  = 0;
};
BJPlayer.prototype = Object.create(AKObject.prototype);
BJPlayer.prototype.constructor = BJPlayer;

// getters
BJPlayer.prototype.game = function() { return this.parent().parent(); };
BJPlayer.prototype.currRules = function() { return this.game().currRules(); };


BJPlayer.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".nickname: " + this.nickname + br;
    s += ".cash: " + this.cash + br;
    s += ".hand: " + this.hand + br;
    s += ".game: " + this.game() + br;
    return s;
};

// should be an initPlayer() method

BJPlayer.prototype.clearHand = function() {
    this.hand.clear();
    this.isBusted = false;
    this.inAnte = 0;
};

// move from avail cash to ante
// can still accept a deal if ante
BJPlayer.prototype.anteUp = function() {
    var anteAmt = this.game().anteAmount;
    if (this.cash >= anteAmt) {
        this.cash = this.cash - anteAmt;
        this.inAnte = anteAmt;  // instead of Boolean
    }
};

BJPlayer.prototype.isHitting = function() {
    var upCard = this.game().dealer.upCard();
    return this.currRules().isHandHitting(this.hand, upCard.pointValue());
};



// THESE SHOULD BE VIEW METHODS!
/*
BJPlayer.prototype.cardFaceValues = function() {
    var s = this.nickname.padEnd(15) + this.hand.cardFaceValues() + br;
    return s;
};

BJPlayer.prototype.cardValues = function() {
    var s = this.nickname.padEnd(15) + this.hand.cardValues() + br;
    return s;
};

BJPlayer.prototype.cardValuesAndPointTotal = function() {
    var s = this.nickname.padEnd(15) + this.hand.cardValues() + this.hand.pointTotal() + br;
    return s;
};
*/





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


module.exports = { 
    BJPlayer  : BJPlayer,
    BJPlayers : BJPlayers
}

