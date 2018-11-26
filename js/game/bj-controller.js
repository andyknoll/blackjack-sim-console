/*****************************************************************************

    bj-controller.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    This is the BJController for the Blackjack simulation.
    This is the main driver of the program and makes calls to the
    Game API and updates the view(s) from the Game model values.

    In this sense it acts as a broker between the Models and Views.

*****************************************************************************/

var br = "\r\n";        // CRLF for output


// BJController "class"
// can access Game model and Game view
var BJController = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJController";

    this.app = this.parent().app;             // alias
    this.models = this.app.models;
    this.views = this.app.views;

    this.game = this.models.bjGame;
    this.view = this.views.bjView;
};
BJController.prototype = Object.create(AKObject.prototype);
BJController.prototype.constructor = BJController;

BJController.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".game: " + this.game.name() + br;
    s += ".view: "  + this.view.name() + br;
    return s;
};


// convenience method call
BJController.prototype.output = function(txt) {
    this.view.output(txt);
};

// convenience method call
BJController.prototype.debug = function(txt) {
    //this.view.output(txt);
};



// actual app methods - called by tester
BJController.prototype.run = function() {
    // called only once at app startup
    this.output("");
    this.output("running '" + this.app.name() + "' @ " + new Date());
    this.output("");

    this.createObjects();
    this.initObjects();
    this.playRounds();      // loops many games until completion
    this.showFinalStats();

    this.output("");
    this.output("completed simulation @ " + new Date());    
};



// called only once at app startup
BJController.prototype.createObjects = function() {
    this.output("BJController.createObjects");
    this.game.createObjects();
    this.debug(this.game.msg);
    this.view.createObjects();
    this.debug(this.view.msg);
    this.output("");
};

// called only once at app startup
BJController.prototype.initObjects = function() {
    this.output("BJController.initObjects");
    this.game.initObjects();
    this.debug(this.game.msg);
    this.view.initObjects();
    this.debug(this.view.msg);
    this.output("");
};


// loop the rounds many times
BJController.prototype.playRounds = function() {
    this.output("BJController.playRounds");
    this.output("");
    for (var i = 1; i <= this.game.maxRounds; i++) {
        this.playRound();
        this.output("");
    }
};

// called many times - once each loop
BJController.prototype.playRound = function() {
    //this.output("BJController.playRound - Round: " + (this.game.currRound+1));
    this.startRound();              // shuffle, anteUp, deal, etc.
    this.clearAllHands();           // remove cards from last round
    this.shuffleDeck();             // all decks' cards
    this.anteAllUp();               // subtract from players cash
    this.dealFirstCards();          // two cards to everyone
    this.playAllHands();            // some will Hit or Stay
    //this.checkForBusts();         // take money or Dealer pays all
    //this.playRemainingHands();    // only Players still in
    this.completeRound();           // finish up, tally scores
};

// this would be event driven in an interactive game!
BJController.prototype.startRound = function() {
    //this.output("BJController.startRound");
    this.game.startRound();
    this.debug(this.game.msg);
    this.view.startRound(this.game);
    this.debug(this.view.msg);
};

BJController.prototype.clearAllHands = function() {
    //this.output("BJController.clearAllHands");
    this.game.clearAllHands();
    this.debug(this.game.msg);
    this.view.clearAllHands();
    this.debug(this.view.msg);
};

BJController.prototype.shuffleDeck = function() {
    //this.output("BJController.shuffleDeck");
    this.game.shuffleDeck();
    this.debug(this.game.msg);
    this.view.shuffleDeck();
    this.debug(this.view.msg);
};

BJController.prototype.anteAllUp = function() {
    //this.output("BJController.anteAllUp");
    this.game.anteAllUp();
    this.debug(this.game.msg);
    this.view.anteAllUp();
    this.debug(this.view.msg);
};

// Controller should do this - not the Dealer!
BJController.prototype.dealFirstCards = function() {
    //this.output("BJController.dealFirstCards");
    var dealer = this.game.dealer;
    this.game.dealFirstCards();
    this.debug(this.game.msg);
    this.view.dealFirstCards();
    this.debug(this.view.msg);

    for (var c = 0; c < 2; c++) {
        for (var i = 0; i < this.game.players.count(); i++) {
            var player = this.game.players.player(i);
            if (player.inAnte > 0) this.dealPlayerCard(player);
        }
        this.dealPlayerCard(dealer);      // and the Dealer too
        this.output("");
    }

    this.view.showDealerUpCard(dealer.upCard());
};

BJController.prototype.dealPlayerCard = function(player) {
    //this.output("BJController.dealPlayerCard");
    this.game.dealPlayerCard(player);
    this.debug(this.game.msg);
    this.view.dealPlayerCard(player);
    this.debug(this.view.msg);
};

BJController.prototype.playAllHands = function() {
    //this.output("BJController.playAllHands");
    // each Player and Dealer
    this.game.playAllHands();
    this.debug(this.game.msg);
    this.view.playAllHands();
    this.debug(this.view.msg);
    for (var i = 0; i < this.game.players.count(); i++) {
        var player = this.game.players.player(i);
        this.playPlayerHand(player);
    }
    this.playPlayerHand(this.game.dealer);      // and the Dealer too
};

BJController.prototype.playPlayerHand = function(player) {
    //this.output("BJController.playPlayerHand");
    // each Player and Dealer
    var dealer = this.game.dealer;
    this.game.playPlayerHand(player);
    this.debug(this.game.msg);
    this.view.playPlayerHand(player);
    this.debug(this.view.msg);

    console.log(player.hand.pointTotal());
    
    if (player.hand.isBust()) {
        console.log("BUSTED!!!");       // TO DO: call the View here
    }
    if (player.hand.isBlackjack()) {
        console.log("BLACKJACK!!!");
    }
    if (player.hand.isUnder()) {
        //console.log("UNDER");
    }

    while (player.isHitting()) {
        console.log("HITTING...");
        dealer.dealCardTo(player);
        this.view.showCardFaceValues(player);

        if (player.hand.isBust()) {
            console.log("BUSTED!!!");
        }
        if (player.hand.isBlackjack()) {
            console.log("BLACKJACK!!!");
        }
        if (player.hand.isUnder()) {
            //console.log("UNDER");
        }
    }
    console.log("STAYING");

};









BJController.prototype.playRemainingHands = function() {
    //this.output("BJController.playRemainingHands");
    // each Player and Dealer
    this.game.playRemainingHands();
    this.debug(this.game.msg);
    this.view.playRemainingHands();
    this.debug(this.view.msg);
    for (var i = 0; i < this.game.players.count(); i++) {
        var player = this.game.players.player(i);
        this.playPlayerHand(player);
    }
    this.playPlayerHand(this.game.dealer);      // and the Dealer too
};

BJController.prototype.checkForBusts = function() {
    //this.output("BJController.checkForBusts");
    // each Player and Dealer
    this.game.checkForBusts();
    this.debug(this.game.msg);
    this.view.checkForBusts();
    this.debug(this.view.msg);
    for (var i = 0; i < this.game.players.count(); i++) {
        var player = this.game.players.player(i);
        this.checkPlayerForBust(player);
    }
    this.checkPlayerForBust(this.game.dealer);      // and the Dealer too
};


BJController.prototype.checkPlayerForBust = function(player) {
    //this.output("BJController.checkPlayerForBust");
    // each Player and Dealer
    var isBusted = this.game.checkPlayerForBust(player);
    this.debug(this.game.msg);
    if (isBusted) {
        this.game.setPlayerIsBusted(player);
        this.debug(this.game.msg);
        this.view.setPlayerIsBusted(player);
        this.debug(this.view.msg);
    }
};





BJController.prototype.completeRound = function() {
    //this.output("BJController.completeRound");
    // calculate round stats
    this.game.completeRound();
    this.debug(this.game.msg);
    // show round stats
    this.view.completeRound();
    this.debug(this.view.msg);
    this.view.showRoundStats(this.game);
};

BJController.prototype.showFinalStats = function() {
    this.output("BJController.showFinalStats");
    this.view.showFinalStats(this.game);
    this.output("");
};



module.exports = BJController;
