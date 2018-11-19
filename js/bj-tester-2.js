/*****************************************************************************

    bj-tester-2.js

    Andy Knoll
    November 2018

    Tester object for Blackjack simulation game - command line version.

*****************************************************************************/

var BJGame  = require('./bj-game.js');
var BJHand  = require('./bj-hand.js');
var Decks   = require('./bj-decks.js');
var Players = require('./bj-players.js');
var Rules   = require('./bj-rules.js');

var br = "\r\n";

// BJTester "class"
var BJTester = function (name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJTester";
    this.app = parent;

    this.models = this.app.models;
    this.views  = this.app.views;
    this.ctrls  = this.app.ctrls;

    // Blackjack-specific - could be other games in app
    this.game = this.models.bjGame;     
    this.view = this.views.bjView;
    this.ctrl = this.ctrls.bjCtrl;
};
BJTester.prototype = Object.create(AKObject.prototype);
BJTester.prototype.constructor = BJTester;


// convenience method
// redirect to the app's BJConsoleView object
BJTester.prototype.output = function (s) {
    this.view.output(s);
};


BJTester.prototype.runTest = function (n) {
    switch (n) {
        case "1": this.runTest1(); break;
        case "2": this.runTest2(); break;
        case "3": this.runTest3(); break;
        case "4": this.runTest4(); break;
        case "5": this.runTest5(); break;
        case "6": this.runTest6(); break;
        case "7": this.runTest7(); break;
        case "8": this.runTest8(); break;
        case "9": this.runTest9(); break;

        /*
        case "10": this.runTest10(); break;
        case "11": this.runTest11(); break;
        case "12": this.runTest12(); break;
        case "13": this.runTest13(); break;
        case "14": this.runTest14(); break;
        case "15": this.runTest15(); break;
        */
        default:   this.runTest1(); break;
    }
};


// the actual tests
BJTester.prototype.runTest1 = function () {
    this.output("");
    this.view.output("RUNNING TEST 1");
    this.view.output(new Date());
    this.view.output("");
    this.view.output("verifying basic App and Game objects");
    this.view.output("");

    this.ctrl.createObjects();      // actual app call
    this.ctrl.initObjects();        // actual app call

    this.view.output("=== APP OBJECTS ===");
    this.view.output("");
    this.view.output(this.app.info());
    this.view.output("");
    this.view.output(this.models.info());
    this.view.output("");
    this.view.output(this.views.info());
    this.view.output("");
    this.view.output(this.ctrls.info());
    this.view.output("");

    this.view.output("=== GAME OBJECTS ===");
    this.view.output("");
    this.view.output(this.game.info());
    this.view.output("");
    this.view.output(this.game.deck.infoShort());   // do not list cards!
    this.view.output("");
    this.view.output(this.game.dealer.info());
    this.view.output("");
    this.view.output(this.game.players.info());
    this.view.output("");
    this.view.output(this.game.rules.info());
    this.view.output("");
    this.view.output(this.game.rules.ruleSet(0).info());
    this.view.output("");
    //this.view.output(this.game.rules.ruleSet(0).matrix);
    //this.view.output("");

    this.view.output("=== PLAYER OBJECTS ===");
    this.view.output("");
    var player = this.game.players.player(0);
    this.view.output(player.info());
    this.view.output(player.hand.info());
    this.view.output("");

    var player = this.game.players.player(1);
    this.view.output(player.info());
    this.view.output(player.hand.info());
    this.view.output("");


    this.view.output("");
    this.view.output("TEST 1 COMPLETED.");
};

// using output() as a shortcut method here
BJTester.prototype.runTest2 = function () {
    this.output("");
    this.output("RUNNING TEST 2");
    this.output(new Date());
    this.output("");
    this.output("testing the BJConsoleView output");
    this.output("");

    this.ctrl.createObjects();      // actual app call
    this.ctrl.initObjects();        // actual app call

    var player0 = this.game.players.player(0);
    this.view.showPlayerFinalStats(player0);
    var player1 = this.game.players.player(1);
    this.view.showPlayerFinalStats(player1);
    var player2 = this.game.players.player(2);
    this.view.showPlayerFinalStats(player2);
    var player3 = this.game.players.player(3);
    this.view.showPlayerFinalStats(player3);

    this.view.showPlayerFinalStats(this.game.dealer);
    this.view.showGameRoundStats(this.game);
    this.view.showGameFinalStats(this.game);

    this.output("");
    this.output("TEST 2 COMPLETED.");
};


BJTester.prototype.runTest3 = function () {
    this.output("");
    this.output("RUNNING TEST 3");
    this.output(new Date());
    this.output("");
    this.output("Controller calling Game and View methods");
    this.output("");

    this.output("");
    this.output("TEST 3 COMPLETED.");
};













BJTester.prototype.runTest4 = function () {
    this.output("");
    this.output("RUNNING TEST 4");
    this.output(new Date());
    this.output("");
    this.output("testing the ...");
    this.output("");

    this.output("");
    this.output("TEST 4 COMPLETED.");
};


BJTester.prototype.runTest5 = function () {
    this.output("");
    this.output("RUNNING TEST 5");
    this.output(new Date());
    this.output("");
    this.output("testing the ...");
    this.output("");

    this.output("");
    this.output("TEST 5 COMPLETED.");
};


BJTester.prototype.runTest6 = function () {
    this.output("");
    this.output("RUNNING TEST 6");
    this.output("TEST 6 COMPLETED.");
};


BJTester.prototype.runTest7 = function () {
    this.output("");
    this.output("RUNNING TEST 7");
    this.output("TEST 7 COMPLETED.");
};


BJTester.prototype.runTest8 = function () {
    this.output("");
    this.output("RUNNING TEST 8");
    this.output("TEST 8 COMPLETED.");
};


BJTester.prototype.runTest9 = function () {
    this.output("");
    this.output("RUNNING TEST 9");
    this.output("TEST 9 COMPLETED.");
};


BJTester.prototype.runTest10 = function () {
    this.output("");
    this.output("RUNNING TEST 10");
    this.output("TEST 10 COMPLETED.");
};




module.exports = BJTester;
