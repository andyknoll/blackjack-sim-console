/*****************************************************************************

    bj-game.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    Modules (objects) :

        Card
        Deck
        Players (+ Dealer)
        Hand
        Game

*****************************************************************************/

// The Duck Tales guys are going to the casino and they want to simulate 20 games of black jack.
// Each player starts with 200 dollars.  Each game is $15.
// If they lose all their money they can no longer play.
// Simulate the outcome.
// At the end output the player and how much they each won / lost.

// RULES
// Number of Decks between 1-8
// Dealer Hits on 16 and Below
// Scrooge, Huey, Dewey and Louie.

var br = "\n";

var AKObject = require('./ak-objects.js');
//var Card = require('./js/bj.card.js');


// something like this...
var config = {
    playerCount : 5,
    deckCount : 1,      // 1 thru 8
    startCash : 200,
    gameCost : 15,
    gameCount : 20
};


// BJGame - inherits from AKObject
BJGame = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJGame";
    this.msg = "";
    this.numRounds = 0;
};
BJGame.prototype = Object.create(AKObject.prototype);
BJGame.prototype.constructor = BJGame;

BJGame.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    // new properties go here...
};


// "public" methods called by controller
BJGame.prototype.startGame = function() {
    this.msg = "BJGame.startGame";
    this.numRounds = 0;
};

BJGame.prototype.shuffleDeck = function() {
    this.msg = "BJGame.shuffleDeck";
};

BJGame.prototype.initRound = function() {
    this.msg = "BJGame.initRound";
};

BJGame.prototype.dealCards = function() {
    this.msg = "BJGame.dealCards";
};

BJGame.prototype.checkHands = function() {
    this.msg = "BJGame.checkHands";
};

BJGame.prototype.calcScores = function() {
    this.msg = "BJGame.calcScores";
};

BJGame.prototype.calcStats = function() {
    this.msg = "BJGame.calcStats";
    this.numRounds++;
};

BJGame.prototype.calcFinalStats = function() {
    this.msg += "BJGame.calcFinalStats \r\n";
};


module.exports = BJGame;
