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

var br = "\n";

var Decks   = require('./bj-decks.js');
var Dealer  = require('./bj-dealer.js');
var Players = require('./bj-players.js');
var Rules   = require('./bj-rules.js');


// the Game config object - global settings
var gameConfig = {
    maxDecks   : 4,      // 1 thru 8
    maxRounds  : 1,
    startCash  : 200,
    anteAmount : 15,
    houseCash  : 1000000,
    ruleSet    : 1,
    dealer : { nickname : "Dealer Scrooge" },
    players : [
        { nickname : "Huey"   },
        { nickname : "Dewey"  },
        { nickname : "Louie"  },
        { nickname : "Donald" }
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
    this.currRound  = 0;
    this.maxRounds  = this.config.maxRounds;
    this.maxDecks   = this.config.maxDecks;
    this.ruleSet    = this.config.ruleSet;
    this.houseCash  = this.config.houseCash;
    this.anteAmount = this.config.anteAmount;
    this.msg = "";      // for passing info
};
BJGame.prototype = Object.create(AKObject.prototype);
BJGame.prototype.constructor = BJGame;

// getters
BJGame.prototype.playerCount = function() { return this.players.count(); };
BJGame.prototype.currRules = function() { return this.rules.currObject(); };

BJGame.prototype.configPlayerCount = function() { return this.config.players.length; };

/*
// copy values for passing to the Views - testing this out
BJGame.prototype.getProps = function() {
    this.props = {
        name : this.name(),
        parent : this.parent().name(),
        className : this.className()
    };
    return this.props;
};
*/

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
    s += ".houseCash: "  + this.houseCash + br;    
    s += ".anteAmount: " + this.anteAmount + br;    
    s += "playerCount: " + this.configPlayerCount() + br;    
    s += "currRules: "   + this.currRules().name() + br;    
    return s;
};


// "public" methods called by the BJ Controller


// create all the main Game objects
// some of these values are from the config object
BJGame.prototype.createObjects = function() {
    this.msg = "BJGame.createObjects";
    this.deck    = new Decks.BJMultiDeck("deck", this);
    this.dealer  = new Dealer.BJDealer("dealer", this, this.deck);   // pass Deck
    this.players = new Players.BJPlayers("players", this);
    this.rules   = new Rules.BJRules("rules", this);

    this.deck.createAndAddDecks(this.maxDecks);                      // using four decks
    this.players.createAndAddPlayers(this.configPlayerCount());      // four players
};

// init objects based on config object
BJGame.prototype.initObjects = function() {
    this.msg = "BJGame.initObjects";
    var player = null;
    var rules  = null;

    this.dealer.nickname = this.config.dealer.nickname;
    this.dealer.cash = this.config.houseCash;

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




// called many times - once each loop
BJGame.prototype.startRound = function() {
    this.currRound++;
    this.msg = "BJGame.startRound";
};

BJGame.prototype.clearAllHands = function() {
    this.msg = "BJGame.clearAllHands";
    this.players.clearHands();
    this.dealer.clearHand();
};

BJGame.prototype.shuffleDeck = function() {
    this.msg = "BJGame.shuffleDeck";
    this.dealer.shuffleDeck();    
};

BJGame.prototype.anteAllUp = function() {
    this.msg = "BJGame.anteAllUp";
    this.players.anteAllUp();
};

BJGame.prototype.dealFirstCards = function() {
    this.msg = "BJGame.dealFirstCards";
};

BJGame.prototype.dealPlayerCard = function(player) {
    this.msg = "BJGame.dealPlayerCard";
    this.dealer.dealCardTo(player);    
};



BJGame.prototype.checkForBusts = function() {
    this.msg = "BJGame.checkForBusts";
};

BJGame.prototype.checkPlayerForBust = function(player) {
    this.msg = "BJGame.checkPlayerForBust";
    return player.hand.isBust();
};

BJGame.prototype.setPlayerIsBusted = function(player) {
    this.msg = "BJGame.setPlayerIsBusted";
    return player.isBusted = true;
};



BJGame.prototype.playAllHands = function() {
    this.msg = "BJGame.playAllHands";
};

BJGame.prototype.playPlayerHand = function(player) {
    this.msg = "BJGame.playPlayerHand";
};

BJGame.prototype.playRemainingHands = function() {
    this.msg = "BJGame.playRemainingHands";
};



BJGame.prototype.completeRound = function() {
    this.msg = "BJGame.completeRound";
};




module.exports = BJGame;
