/*****************************************************************************

    app-ctrls.js

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

var br = "\r\n";        // CRLF for output

// AppCtrls "class"
var AppCtrls = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "AppCtrls";

    this.app = this.parent();           // alias
    this.models = this.app.models;      // can access app's Models
    this.views = this.app.views;        // can access app's Views

    this.bjCtrl = new BJController("bjCtrl", this);
    this.addObject(this.bjCtrl);

};
AppCtrls.prototype = Object.create(AKCollection.prototype);
AppCtrls.prototype.constructor = AppCtrls;

AppCtrls.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    s += ".models: " + this.models.name() + br;
    s += ".views: "  + this.views.name() + br;
    //s += ".bjCtrl: " + this.bjCtrl.name() + br;
    return s;
};





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
    this.clearAllHands();
    this.shuffleDeck();
    this.anteAllUp();
    this.dealFirstCards();
    this.playFirstHands();          // some will Hit or Stay
    //this.checkForBusts();           // take money or Dealer pays all
    //this.playRemainingHands();      // only Players still in
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
    }

    this.view.showDealerUpCard(dealer.upCard());
};

/*
BJController.prototype.dealPlayerFirstCards = function(player) {
    //this.output("BJController.dealPlayerFirstCards");
    this.game.dealPlayerFirstCards(player);
    this.debug(this.game.msg);
    this.view.dealPlayerFirstCards(player);
    this.debug(this.view.msg);
};
*/

BJController.prototype.dealPlayerCard = function(player) {
    //this.output("BJController.dealPlayerCard");
    this.game.dealPlayerCard(player);
    this.debug(this.game.msg);
    this.view.dealPlayerCard(player);
    this.debug(this.view.msg);
};

BJController.prototype.playFirstHands = function() {
    //this.output("BJController.playFirstHands");
    // each Player and Dealer
    this.game.playFirstHands();
    this.debug(this.game.msg);
    this.view.playFirstHands();
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

    console.log("FIRST SCAN...");
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



module.exports = AppCtrls;
