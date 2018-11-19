/*****************************************************************************

    app-views.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    Modules (objects) :

        App
            AppModels
            AppViews
            AppCtrls

        Game
            Card
            Deck
            Players (+ Dealer)
            Hand

*****************************************************************************/

var br = "\r\n";    // CRLF for text files
//var br = "\r";        // CR only for screen

var hr = "=======================================================";


// AppViews "class"
var AppViews = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "AppViews";

    this.bjView = new BJConsoleView("bjView", this);
    this.addObject(this.bjView);

};
AppViews.prototype = Object.create(AKCollection.prototype);
AppViews.prototype.constructor = AppViews;

AppViews.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    //s += ".bjView: " + this.bjView.name() + br;
    return s;
};

/*
AppViews.prototype.output = function(txt) {
    this.bjView.output(txt);
};
*/





// BJConsoleView "class"
var BJConsoleView = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJConsoleView";
};
BJConsoleView.prototype = Object.create(AKObject.prototype);
BJConsoleView.prototype.constructor = BJConsoleView;

// output to console (not browser) in this version
BJConsoleView.prototype.output = function(txt) {
    //console.log(txt + br);
    console.log(txt);
};

BJConsoleView.prototype.createObjects = function() {
    this.output("BJConsoleView.createObjects");
};

BJConsoleView.prototype.initObjects = function() {
    this.output("BJConsoleView.initObjects");
};


// trying this - we can print individual props
BJConsoleView.prototype.outputGameInfo = function(game) {
    /*
    console.log(game.name());
    console.log(game.parent().name());
    console.log(game.className());
    console.log(game.deck.name());
    console.log(game.dealer.name());
    console.log(game.players.name());
    console.log(game.rules.name());
    */
    console.log(game.info());
};

BJConsoleView.prototype.outputGameProps = function(props) {
    console.log("VIEW DISPLAYING PROPS" + br);
    console.log(props.name + br);
    console.log(props.parent + br);
    console.log(props.className + br);
    // cannot overwrite - will be back next call :-)
    props.name = "";
};

// THIS WAS ORIGINALLY A MODEL METHOD - moved to View
BJConsoleView.prototype.showCardFaceValues = function(player) {
    var s = player.nickname.padEnd(15) + player.hand.cardFaceValues() + br;
    console.log(s);
};

BJConsoleView.prototype.showCardValues = function(player) {
    var s = player.nickname.padEnd(15) + player.hand.cardValues() + br;
    console.log(s);
};

BJConsoleView.prototype.showCardValuesAndPointTotal = function(player) {
    var s = player.nickname.padEnd(15) + player.hand.cardValues() + player.hand.pointTotal() + br;
    console.log(s);
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

BJConsoleView.prototype.showGameRoundStats = function(game) { 
    var players = game.players;
    var player = null;
    var s = "";
    var name = "";
    var games = "";
    var wins = "";
    var losses = "";
    var cash = "";
    s += hr + br;
    s += "Round: " + game.currRound + br;
    s += "                    G     W     L     Cash Remaining" + br;
    s += br;
    for (var i = 0; i < players.count(); i++) {
        player = players.player(i);
        name   = player.nickname;
        rounds = player.roundCount.toString();
        wins   = player.winCount.toString();
        losses = player.lossCount.toString();
        cash   = "$ " + player.cash;
        s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + cash.padEnd(6) + br;
    }
    player = game.dealer;
    name   = player.nickname;
    rounds = player.roundCount.toString();
    wins   = player.winCount.toString();
    losses = player.lossCount.toString();
    cash   = "$ " + player.cash;
    s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + cash.padEnd(6) + br;
    s += hr + br;
    this.output(s);
};


BJConsoleView.prototype.showGameFinalStats = function(game) { 
    var players = game.players;
    var player = null;
    var s = "";
    var name = "";
    var games = "";
    var wins = "";
    var losses = "";
    var cash = "";
    s += hr + br;
    s += "Rounds: " + game.MAX_ROUNDS + br;
    s += "                    G     W     L     Cash Remaining" + br;
    s += br;
    for (var i = 0; i < players.count(); i++) {
        player = players.player(i);
        name   = player.nickname;
        rounds = player.roundCount.toString();
        wins   = player.winCount.toString();
        losses = player.lossCount.toString();
        cash   = "$ " + player.cash;
        s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + cash.padEnd(6) + br;
    }
    player = game.dealer;
    name   = player.nickname;
    rounds = player.roundCount.toString();
    wins   = player.winCount.toString();
    losses = player.lossCount.toString();
    cash   = "$ " + player.cash;
    s += name.padEnd(20) + rounds.padEnd(6) + wins.padEnd(6) + losses.padEnd(6) + cash.padEnd(6) + br;
    s += hr + br;
    this.output(s);
};



module.exports = AppViews;
