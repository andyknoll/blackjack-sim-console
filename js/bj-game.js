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
    maxDecks   : 4,      // 1 thru 8
    maxRounds  : 20,
    startCash  : 200,
    roundAnte  : 15,
    houseCash  : 5000000,
    ruleSet    : 0,
    dealer : { nickname : "MR. SCROOGE" },
    players : [
        { nickname : "HUEY"  },
        { nickname : "DEWEY" },
        { nickname : "LOUIE" },
        { nickname : "POOEY" },
        { nickname : "CAROL" },
        { nickname : "ANDY" },
    ]
};


// BJGame - inherits from AKObject
BJGame = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJGame";
    this.config = gameConfig;       // bring in the global

    // the main Game properties
    this.deck    = null;        // BJMultiDeck
    this.dealer  = null;        // BJDealer
    this.players = null;        // BJPlayers
    this.rules   = null;        // BJRules

    // for passing to Views - test this more
    this.props = {};
    this.currRound = 0;
    this.maxRounds = this.config.maxRounds;
    this.maxDecks  = this.config.maxDecks;
    this.ruleSet   = this.config.ruleSet;
    this.msg = "";      // for passing info
};
BJGame.prototype = Object.create(AKObject.prototype);
BJGame.prototype.constructor = BJGame;

// getters
BJGame.prototype.playerCount = function() { return this.players.count(); };
BJGame.prototype.currRules = function() { return this.rules.currObject(); };

BJGame.prototype.configPlayerCount = function() { return this.config.players.length; };

// copy values for passing to the Views - testing this out
BJGame.prototype.getProps = function() {
    this.props = {
        name : this.name(),
        parent : this.parent().name(),
        className : this.className()
    };
    return this.props;
};

BJGame.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    // new properties go here...
    s += ".deck: "       + this.deck + br;
    s += ".dealer: "     + this.dealer + br;
    s += ".players: "    + this.players + br;
    s += ".rules: "      + this.rules + br;
    s += ".maxDecks: "   + this.maxDecks + br;
    s += ".maxRounds: "  + this.maxRounds + br;    
    s += "playerCount: " + this.configPlayerCount() + br;    
    s += "currRules: "   + this.currRules().name() + br;    
    return s;
};

// create all the main Game objects
// some of these values are from the config object
BJGame.prototype.createObjects = function() {
    this.deck    = new Decks.BJMultiDeck("deck", this);
    this.dealer  = new Dealer.BJDealer("dealer", this, this.deck);   // pass Deck
    this.players = new Players.BJPlayers("players", this);
    this.rules   = new Rules.BJRules("rules", this);

    this.deck.createAndAddDecks(this.maxDecks);                      // using four decks
    this.players.createAndAddPlayers(this.configPlayerCount());      // four players
};

// init objects based on config object
BJGame.prototype.initObjects = function() {
    var player = null;
    var rules  = null;

    this.dealer.nickname = this.config.dealer.nickname;
    this.dealer.cash = this.config.houseCash;

    console.log("*** CONFIG *** " + this.config.players);
    for (var i = 0; i < this.configPlayerCount(); i++) {
        player = this.players.player(i);
        player.nickname = this.config.players[i].nickname;
        player.cash = this.config.startCash;
    }

    rules = new Rules.BJNoviceRules("Novice Rules", this.rules);
    this.rules.addRuleSet(rules);
    rules = new Rules.BJGreedyRules("Greedy Rules", this.rules);
    this.rules.addRuleSet(rules);

    this.setCurrRules(this.ruleSet);
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
