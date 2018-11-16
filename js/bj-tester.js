/*****************************************************************************

    bj-tester.js

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
};
BJTester.prototype = Object.create(AKObject.prototype);
BJTester.prototype.constructor = BJTester;

// redirect to the app's output
BJTester.prototype.output = function (s) {
    this.app.output(s);
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
        default:  this.runTest1(); break;
    }
};


// the actual tests
BJTester.prototype.runTest1 = function () {
    this.output("RUNNING TEST 1");
    this.output(new Date());
    this.output("");
    this.output("testing the main Game object");
    this.output("");

    this.output("creating BJGame object");
    this.testGame = new BJGame("testGame", this);
    this.output(this.testGame.info());

    this.output("calling game.createObjects()");
    this.testGame.createObjects();
    this.output(this.testGame.info());
    this.output("");

    this.output("TEST 1 COMPLETED.");
};

BJTester.prototype.runTest2 = function () {
    this.output("RUNNING TEST 2");
    this.output(new Date());
    this.output("");
    this.output("testing main properties of the Game object");
    this.output("");

    this.testGame = new BJGame("testGame", this);
    this.testGame.createObjects();
    this.testGame.initObjects();

    this.output(this.testGame.deck.infoShort());
    this.output(this.testGame.dealer.info());
    this.output(this.testGame.players.info());
    this.output(this.testGame.players.player(0).info());        // show 1 player
    this.output(this.testGame.rules.info());

    this.output("TEST 2 COMPLETED.");
};


BJTester.prototype.runTest3 = function () {
    this.output("RUNNING TEST 3");
    this.output(new Date());
    this.output("");
    this.output("showing Dealer and Players details");
    this.output("");

    this.testGame = new BJGame("testGame", this);
    this.testGame.createObjects();
    this.testGame.initObjects();

    this.output(this.testGame.dealer.info());

    var players = this.testGame.players;
    this.output(players.info());

    this.output(players.player(0).info());
    this.output(players.player(1).info());
    this.output(players.player(2).info());
    this.output(players.player(3).info());

    this.output("TEST 3 COMPLETED.");
};


BJTester.prototype.runTest4 = function () {
    this.output("RUNNING TEST 4");
    this.output(new Date());
    this.output("");
    this.output("showing Rules details");
    this.output("");

    this.testGame = new BJGame("testGame", this);
    this.testGame.createObjects();
    this.testGame.initObjects();

    var rules = this.testGame.rules;
    this.output(rules.info());

    this.output(rules.rule(0).info());
    this.output(rules.rule(1).info());

    this.output("");
    this.output("TEST 4 COMPLETED.");
};


BJTester.prototype.runTest5 = function () {
    this.output("RUNNING TEST 5");
    this.output(new Date());
    this.output("");
    this.output("testing the...");
    this.output("");

    this.output("");
    this.output("TEST 5 COMPLETED.");
};

BJTester.prototype.runTest6 = function () {
    this.output("RUNNING TEST 6");
    this.output(new Date());
    this.output("");
    this.output("testing the...");
    this.output("");

    this.output("");
    this.output("TEST 6 COMPLETED.");
};


BJTester.prototype.runTest7 = function () {
    this.output("RUNNING TEST 7");
    this.output(new Date());
    this.output("");
    this.output("TEST 7 COMPLETED.");
};

BJTester.prototype.runTest8 = function () {
    this.output("RUNNING TEST 8");
    this.output(new Date());
    this.output("");
    this.output("TEST 8 COMPLETED.");
};

BJTester.prototype.runTest9 = function () {
    this.output("RUNNING TEST 9");
    this.output(new Date());
    this.output("");
    this.output("TEST 9 COMPLETED.");
};



module.exports = BJTester;
