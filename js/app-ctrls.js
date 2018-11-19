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

// the Controller starts the Blackjack Game
BJController.prototype.startGame = function() {
    this.output("Controller to Game object - startGame");   // to be interactive
    this.game.startGame();
    this.output(this.game.msg);

    this.output("Controller to Game object - shuffleDeck");
    this.game.shuffleDeck();
    this.output(this.game.msg);
    
    // loop goes here...
    // some players will run out of money
    // must check for aces = 1 or 11
    // must use rules for Hitting and Holding

    var NUM_GAMES = 20;
    for (var i = 0; i < NUM_GAMES; i++) {

        this.output("============== ROUND " + (i+1) + " ==============");

        this.output("Controller to Game object - initRound");
        this.game.initRound();
        //this.output(this.game.msg);
        
        this.output("Controller to Game object - dealCards");   // to be interactive
        this.game.dealCards();
        //this.output(this.game.msg);
        
        this.output("Controller to Game object - checkHands");  // to be interactive
        this.game.checkHands();
        //this.output(this.game.msg);
        
        this.output("Controller to Game object - calcScores");
        this.game.calcScores();
        //this.output(this.game.msg);
        
        this.output("Controller to Game object - calcStats");
        this.game.calcStats();
        //this.output(this.game.msg);    
    }

    this.output("");

    this.output("Controller to Game object - calcFinalStats");
    this.game.calcFinalStats();

    this.output("Controller to View object - showFinalStats");
    this.view.showFinalStats(this.game.numRounds);

};

// convenience method call
BJController.prototype.output = function(txt) {
    this.view.output(txt);
};

// actual app methods - called by tester
BJController.prototype.createObjects = function() {
    this.game.createObjects();
    this.view.createObjects();
};

BJController.prototype.initObjects = function() {
    this.game.initObjects();
    this.view.initObjects();
};



module.exports = AppCtrls;
