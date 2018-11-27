/*****************************************************************************

    bj-view.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    This is the BJConsoleView - output for the Blackjack simulation.

*****************************************************************************/

var BJHand = require("./bj-hand.js");       // is this cheating?

var br = "\r\n";    // CRLF for text files
//var br = "\r";        // CR only for screen

var hr = "============================================================";    // 60 chars


// BJConsoleView "class"
var BJConsoleView = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJConsoleView";
    this.msg = "";
};
BJConsoleView.prototype = Object.create(AKObject.prototype);
BJConsoleView.prototype.constructor = BJConsoleView;

// output to console (not browser) in this version
BJConsoleView.prototype.output = function(txt) {
    //console.log(txt + br);
    console.log(txt);
};


// "public" methods called by the BJ Controller


// called only once at app startup
BJConsoleView.prototype.createObjects = function() {
    this.msg = "BJConsoleView.createObjects";
};

// called only once at app startup
BJConsoleView.prototype.initObjects = function() {
    this.msg = "BJConsoleView.initObjects";
};


BJConsoleView.prototype.initRounds = function() {
    this.msg = "BJConsoleView.initRounds";
};


// called many times - once each loop
BJConsoleView.prototype.startRound = function(game) {
    this.msg = "BJConsoleView.startRound";
    this.output("Playing Round " + (game.currRound));
    this.output("using " + game.currRules().name());
};

BJConsoleView.prototype.clearAllHands = function() {
    this.msg = "BJConsoleView.clearAllHands";
    this.output("Players and Dealer clearing hands.")
};

BJConsoleView.prototype.shuffleDeck = function() {
    this.msg = "BJConsoleView.shuffleDeck";
    this.output("Dealer shuffling deck.")
};

BJConsoleView.prototype.anteAllUp = function() {
    this.msg = "BJConsoleView.anteAllUp";
    this.output("Players putting in their chips.")
};

BJConsoleView.prototype.dealFirstCards = function() {
    this.msg = "BJConsoleView.dealFirstCards";
    this.output("Dealer dealing first two cards.")
    this.output("")
};

BJConsoleView.prototype.dealPlayerCard = function(player) {
    this.msg = "BJConsoleView.dealPlayerCard";
    //this.output("Dealing a card to " + player.nickname);
    this.showCardFaceValues(player);
};

BJConsoleView.prototype.showDealerUpCard = function(upCard) {
    this.msg = "BJConsoleView.showDealerUpCard";
    this.output("")
    this.output("Dealer's up card is:  " + upCard.faceValue());
};


BJConsoleView.prototype.showHandStatus = function(status) {
    if (status == BJHand.BLACKJACK) {
        this.output("Hand status is BLACKJACK");
    } else if (status == BJHand.OVER) {
        this.output("Hand status is OVER");
    } else {
        this.output("Hand status is UNDER");
    }
};



BJConsoleView.prototype.playAllHands = function() {
    this.output("")
    this.msg = "BJConsoleView.playAllHands";
    this.output("Playing all Players hands...")
};

BJConsoleView.prototype.playPlayerHand = function(player) {
    this.msg = "BJConsoleView.playPlayerHand";
    this.output("");
    this.output("Playing hand for " + player.nickname);
};

BJConsoleView.prototype.scorePlayerHand = function(player, dealer) {
    this.msg = "BJConsoleView.scorePlayerHand";
};



BJConsoleView.prototype.completeRound = function() {
    this.msg = "BJConsoleView.completeRound";
};


BJConsoleView.prototype.showRoundStats = function(game) { 
    //this.output("--BJConsoleView.showRoundStats");
    var players = game.players;
    var player = null;
    var currRound = game.currRound.toString();
    var s = "";
    /*
    var name   = "";
    var rounds = "";
    var wins   = "";
    var losses = "";
    var cash   = "";
    */

    // output the heading
    s += br + hr + br;
    s += "Round: " + currRound.padEnd(13) + "G     W     L     T Cash Remaining" + br;
    s += br;

    // show players' stats
    for (var i = 0; i < players.count(); i++) {
        player = players.player(i);
        var name   = player.nickname;
        var rounds = player.roundCount().toString();
        var wins   = player.winCount.toString();
        var losses = player.lossCount.toString();
        var ties   = player.tieCount.toString();
        var cash   = player.cash;
        s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(10) + lpad(cash, 8, " ") + br;     // TO DO: add tieCOunt!
    }

    // show dealer's stats
    player = game.dealer;
    name   = player.nickname;
    rounds = player.roundCount().toString();
    wins   = player.winCount.toString();
    losses = player.lossCount.toString();
    cash   = player.cash;
    // dealer's cash starts more to the left
    s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(10) + lpad(cash, 8, " ") + br;
    s += hr;
    this.output(s);
};

// this is the longest method in this View object!
BJConsoleView.prototype.showFinalStats = function(game) { 
    //this.output("--BJConsoleView.showFinalStats");
    var players = game.players;
    var player = null;
    var numRounds = game.currRound.toString();
    var s = "";

    // output the heading
    s += br + hr + br;
    s += "Final stats for Blackjack simulation" + br;
    s += hr + br;
    s += "Rounds:   " + numRounds.padEnd(10) + "G     W     L     T       AVG       Cash" + br;
    s += br;

    // show players' stats
    for (var i = 0; i < players.count(); i++) {
        player = players.player(i);
        var name   = player.nickname;
        var rounds = player.roundCount().toString();
        var wins   = player.winCount.toString();
        var losses = player.lossCount.toString();
        var ties   = player.tieCount.toString();
        var pct    = player.winPercent();
        var cash   = player.cash;
        s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + ties.padEnd(6);
        s += pct.toFixed(3) + lpad(cash, 11, " ") + br;
    }

    // show dealer's stats
    player = game.dealer;
    name   = player.nickname;
    rounds = player.roundCount().toString();
    wins   = player.winCount.toString();
    losses = player.lossCount.toString();
    ties   = player.tieCount.toString();
    pct    = player.winPercent();
    cash   = player.cash;
    // dealer's cash starts more to the left
    s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + ties.padEnd(6);
    s += pct.toFixed(3) + lpad(cash, 11, " ") + br;
    s += hr + br;

    // determine house outcome and pretty output
    var profit = game.dealer.cash - game.houseCash;
    if (profit > 0) {
        s += "The house is ahead by $" + profit;
    } else if (profit < 0) {
        s += "The house lost $" + Math.abs(profit);
    } else {
        s += "The house came out even";
    }
    s += " after " + numRounds + " rounds." + br;
    s += hr + br;
    this.output(s);
};


// general purpose formatter
function lpad(value, numChars, char) {
    var result = new Array(numChars+1).join(char);
    return (result + value).slice(-numChars);
}




// these were originally Model methods - moved here to View
BJConsoleView.prototype.showCardFaceValues = function(player) {
    var s = player.nickname.padEnd(16) + player.hand.cardFaceValues();
    this.output(s);
};

BJConsoleView.prototype.showCardValues = function(player) {
    var s = player.nickname.padEnd(16) + player.hand.cardValues();
    this.output(s);
};

BJConsoleView.prototype.showCardValuesAndPointTotal = function(player) {
    var s = player.nickname.padEnd(16) + player.hand.cardValues() + player.hand.pointTotal();
    this.output(s);
};



// test method - pass in copies of props for safety
BJConsoleView.prototype.outputGameProps = function(props) {
    console.log("VIEW DISPLAYING PROPS" + br);
    console.log(props.name + br);
    console.log(props.parent + br);
    console.log(props.className + br);
    // cannot overwrite - will be back next call :-)
    props.name = "";
};


BJConsoleView.prototype.showPlayerGameStats = function(player) { 
    var s = "";
    s += "Game Stats for "  + player.nickname + br;
    s += "Hand:      " + br;
    s += "Points:    " + br;
    s += "Outcome:   " + br;
    this.output(s);
};

BJConsoleView.prototype.showPlayerFinalStats = function(player) { 
    var s = "";
    s += "Final Stats for "  + player.nickname + br;
    s += "Cash:      " + player.cash + br;
    s += "Rounds:    " + player.roundCount + br;
    s += "Wins:      " + player.winCount + br;
    s += "Losses:    " + player.lossCount + br;
    this.output(s);
};


module.exports = BJConsoleView;
