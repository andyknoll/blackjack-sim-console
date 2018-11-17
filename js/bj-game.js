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

    This is the single Model in the Blackjack App and contains all others.
    It is created by and belongs to the app's Models collection.

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

var AKObjects = require('./vendor/ak-objects.js');

var Decks   = require('./bj-decks.js');
var Dealer  = require('./bj-dealer.js');
var Players = require('./bj-players.js');
var Rules   = require('./bj-rules.js');

//var BJHand  = require('./bj-hand.js');

// something like this...
var gameConfig = {
    playerCount : 5,
    deckCount   : 1,      // 1 thru 8
    startCash   : 200,
    gameAnte    : 15,
    gameCount   : 20
};


// BJGame - inherits from AKObject
BJGame = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJGame";
    this.msg = "";
    this.numRounds = 0;
    this.config = gameConfig;       // bring in the global

    // the main Game properties
    this.deck    = null;
    this.dealer  = null;
    this.players = null;
    this.rules   = null;

    // for passing to Views
    this.props = {
        name : this.name(),
        parent : this.parent().name(),
        className : this.className()
    };
};
BJGame.prototype = Object.create(AKObject.prototype);
BJGame.prototype.constructor = BJGame;

// getters
BJGame.prototype.playerCount = function() { return this.players.count(); };
BJGame.prototype.currRules = function() { return this.rules.currObject(); };

BJGame.props = {}


BJGame.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    // new properties go here...
    s += ".deck: "    + this.deck + br;
    s += ".dealer: "  + this.dealer + br;
    s += ".players: " + this.players + br;
    s += ".rules: "   + this.rules + br;
    return s;
};

// create all the main Game objects
// can we get some of these values from the config object?
BJGame.prototype.createObjects = function() {
    this.deck    = new Decks.BJMultiDeck("deck", this);
    this.dealer  = new Dealer.BJDealer("dealer", this, this.deck);   // pass Deck
    this.players = new Players.BJPlayers("players", this);
    this.rules   = new Rules.BJRulesCollection("rules", this);

    this.deck.createAndAddDecks(4);         // using four decks
    this.players.createAndAddPlayers(4);    // four players
};

// can we get some of these values from the config object?
BJGame.prototype.initObjects = function() {
    var player = null;
    var rules  = null;

    this.dealer.nickname = "Mr. Dealer";
    this.dealer.cash = 1000000;

    player = this.players.player(0);
    player.nickname = "Huey";
    player.cash = 200;

    player = this.players.player(1);
    player.nickname = "Dewey";
    player.cash = 200;

    player = this.players.player(2);
    player.nickname = "Louey";
    player.cash = 200;

    player = this.players.player(3);
    player.nickname = "Scrooge";
    player.cash = 200;

    rules = new Rules.BJVegasRules("Vagas Rules", this.rules);
    this.rules.addRules(rules);
    rules = new Rules.BJAtlanticRules("Atlantic Rules", this.rules);
    this.rules.addRules(rules);
    this.setCurrRules(0);
};

BJGame.prototype.setCurrRules = function(idx) {
    this.rules.setCurrIndex(idx);
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
