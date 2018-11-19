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

// actual app methods - called by tester
BJController.prototype.run = function() {
    // called only once at app startup
    this.output("");
    this.output("running '" + this.app.name() + "' @ " + new Date());
    this.output("");

    this.createObjects();
    this.initObjects();

    this.playRounds();

    this.showFinalStats();

    this.output("");
    this.output("completed simulation @ " + new Date());    
};



BJController.prototype.createObjects = function() {
    this.output("BJController.createObjects");
    this.game.createObjects();
    this.output(this.game.msg);
    this.view.createObjects();
    this.output("");
};

BJController.prototype.initObjects = function() {
    this.output("BJController.initObjects");
    this.game.initObjects();
    this.output(this.game.msg);
    this.view.initObjects();
    this.output("");
};

BJController.prototype.playRounds = function() {
    this.output("BJController.playRounds");
    this.output("");

    for (var r = 1; r <= this.game.maxRounds; r++) {
        this.startRound();
        this.completeRound();    
    }

    this.output("");
};


BJController.prototype.startRound = function() {
    this.output("BJController.startRound");
    this.output("Round: " + (this.game.currRound+1));
    this.game.startRound();
    this.output(this.game.msg);
    this.view.startRound();
};

BJController.prototype.completeRound = function() {
    this.output("BJController.completeRound");
    this.game.completeRound();
    this.output(this.game.msg);
    this.view.completeRound();
    this.output("");
};

BJController.prototype.showFinalStats = function() {
    this.output("BJController.showFinalStats");
    this.view.showFinalStats(this.game);
    this.output("");
};



module.exports = AppCtrls;
