/*****************************************************************************

    app.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    THIS IS THE CONSOLE APP WHICH HOSTS THE GAME OBJECT

    This App object implements a tiny MVC approach where only the
    Controller object can access the Models and Views.

    This maintains separation between the logic and UI (console).

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
            Rules

*****************************************************************************/

// base JS "classes" supporting inheritance and polymorphism
var AKObject  = require('./js/ak-objects.js');

var AppModels = require('./js/app-models.js');
var AppViews  = require('./js/app-views.js');
var AppCtrls  = require('./js/app-ctrls.js');

var Decks     = require('./js/bj-deck.js');
var BJHand    = require('./js/bj-hand.js');
var BJTester  = require('./js/bj-tests.js');
var BJPlayers = require('./js/bj-players.js');


var br = "\r\n";

// BJConsoleApp "class"
BJConsoleApp = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJConsoleApp";

    // the app's MVC objects
    this.models = new AppModels("models", null);   // no access 
    this.views  = new AppViews("views", null);     // no access
    this.ctrls  = new AppCtrls("ctrls", this);     // can access parent app
};
BJConsoleApp.prototype = Object.create(AKObject.prototype);
BJConsoleApp.prototype.constructor = BJConsoleApp;

BJConsoleApp.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    // new properties go here...
    s += ".models: " + this.models.name() + br;
    s += ".views: "  + this.views.name()  + br;
    s += ".ctrls: "  + this.ctrls.name()  + br;
    //s += br;
    //s += this.models.info() + br;
    //s += this.views.info()  + br;
    //s += this.ctrls.info()  + br;
    return s;
};

// keep output destination unknown to the App code
// view will output to console (or browser if web app)
BJConsoleApp.prototype.output = function(s) {
    this.views.bjView.output(s);    // to console
};

BJConsoleApp.prototype.run = function() {
    this.output("");
    this.output("running '" + this.name() + "' @ " + new Date());
    this.output("");
    //this.output(this.info());
    this.ctrls.bjCtrl.startGame();
    this.output("");
    this.output("completed simulation @ " + new Date());
};

BJConsoleApp.prototype.runTests = function() {
    var tester = new BJTester("tester", this);
    tester.runTests();
};

var app = new BJConsoleApp("Blackjack Console App", null);      // no parent
//app.run();
app.runTests();
