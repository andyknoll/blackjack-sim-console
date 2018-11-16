/*****************************************************************************

    bj-dealer.js

    Andy Knoll
    November 2018

*****************************************************************************/

var Players = require('./bj-players.js');

var br = "\r\n";


// BJDealer "class" - inherits from BJPlayer
// must provide Deck to constructor (injection?)
var BJDealer = function(name, parent, deck) {
    Players.BJPlayer.call(this, name, parent);
    this._className = "BJDealer";
    this.deck = deck;
};
BJDealer.prototype = Object.create(Players.BJPlayer.prototype);
BJDealer.prototype.constructor = BJDealer;

// getter
BJDealer.prototype.deckCount = function() { return this.deck.count(); }

BJDealer.prototype.info = function() {
	var s = "";
    s += Players.BJPlayer.prototype.info.call(this);
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



module.exports = { 
    BJDealer : BJDealer
}

