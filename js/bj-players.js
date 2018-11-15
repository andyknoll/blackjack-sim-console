/*****************************************************************************

    bj-players.js

    Andy Knoll
    November 2018

*****************************************************************************/

var BJHand    = require('./bj-hand.js');

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





// BJDealer "class" - inherits from BJPlayer
// must provide Deck to constructor (injection?)
var BJDealer = function(name, parent, deck) {
    BJPlayer.call(this, name, parent);
    this._className = "BJDealer";
    this.deck = deck;
};
BJDealer.prototype = Object.create(BJPlayer.prototype);
BJDealer.prototype.constructor = BJDealer;

// getter
BJDealer.prototype.deckCount = function() { return this.deck.count(); }

BJDealer.prototype.info = function() {
	var s = "";
    s += BJPlayer.prototype.info.call(this);
    s += ".deck: " + this.deck + br;
    s += ".deckCount: " + this.deckCount() + br;
    return s;
};

// assign one card from deck to one player's hand object
BJDealer.prototype.dealCardTo = function(player) {
    var card = null;
    if (!player) return;
    card = this.deck.getNextCard();
    player.hand.addCard(card);
    //
};

BJDealer.prototype.shuffleDeck = function() {
    this.deck.shuffle();
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
BJPlayers.prototype.dealer = function() { return this.first(); };

BJPlayers.prototype.addPlayer = function(player) {
    return this.addObject(player);
};

BJPlayers.prototype.getInitialCards = function(num) {
    if (this.isEmpty()) return;
    for (var n = 0; n < num; n++) {
        for (var p = 1; p < this.count(); p++) {
            this.dealer().dealCardTo(this.player(p));       // skip Dealer 
        }
        this.dealer().dealCardTo(this.player(0));           // now the Dealer 
    }
};

BJPlayers.prototype.cardFaceValues = function() {
    var s = "";
    var player = null;
    for (var p = 1; p < this.count(); p++) {
        player = this.player(p);
        s += player.nickname.padEnd(15) + player.hand.cardFaceValues() + br;
    }
    player = this.dealer();
    s += player.nickname.padEnd(15) + player.hand.cardFaceValues() + br;
    return s;
};

BJPlayers.prototype.cardValues = function() {
    var s = "";
    var player = null;
    for (var p = 1; p < this.count(); p++) {
        player = this.player(p);
        s += player.nickname.padEnd(15) + player.hand.cardValues() + br;
    }
    player = this.dealer();
    s += player.nickname.padEnd(15) + player.hand.cardValues() + br;
    return s;
};



module.exports = { 
    BJPlayer  : BJPlayer,
    BJDealer  : BJDealer,
    BJPlayers : BJPlayers
}

