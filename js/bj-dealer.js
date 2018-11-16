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
    this.game = parent;     // alias
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

BJDealer.prototype.shuffleDeck = function() {
    this.deck.shuffle();
};

// assign one card from deck to one player's hand object
// Note: this does not pop() the card off the deck
BJDealer.prototype.dealCardTo = function(player) {
    var card = null;
    if (!player) return;
    card = this.deck.getNextCard();
    player.hand.addCard(card);
    //
};

BJDealer.prototype.dealFirstCards = function() {
    var players = this.game.players;
    for (var n = 0; n < 2; n++) {
        for (var p = 0; p < players.count(); p++) {
            this.dealCardTo(players.player(p));       // only players 
        }
        this.dealCardTo(this);                        // now the Dealer 
    }
};



module.exports = { 
    BJDealer : BJDealer
}

