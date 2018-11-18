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

    this.models = this.app.models;
    this.views  = this.app.views;
    this.ctrls  = this.app.ctrls;

    this.game = this.models.bjGame;     // BJ specific
    this.view = this.views.bjView;
    this.ctrl = this.ctrls.bjCtrl;
};
BJTester.prototype = Object.create(AKObject.prototype);
BJTester.prototype.constructor = BJTester;

// redirect to the app's console View
BJTester.prototype.output = function (s) {
    this.app.views.bjView.output(s);
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

        case "10": this.runTest10(); break;
        case "11": this.runTest11(); break;
        case "12": this.runTest12(); break;
        case "13": this.runTest13(); break;
        case "14": this.runTest14(); break;
        case "15": this.runTest15(); break;
        default:   this.runTest1(); break;
    }
};


// the actual tests
BJTester.prototype.runTest1 = function () {
    this.output("RUNNING TEST 1");
    this.output(new Date());
    this.output("");
    this.output("testing the main Game object, getProps() and View output");
    this.output("");

    this.output("calling view.outputGameProps(this.game.getProps())");
    this.view.outputGameProps(this.game.getProps());
    this.output("");

    this.output("calling game.createObjects()");
    this.output("");
    this.game.createObjects();
    this.output("calling view.outputGameProps(this.game.getProps())");
    this.view.outputGameProps(this.game.getProps());
    this.output("");
    this.output("calling standard output(this.game.info())");
    this.output(this.game.info());
    this.output("");

    this.output("TEST 1 COMPLETED.");
};

BJTester.prototype.runTest2 = function () {
    this.output("RUNNING TEST 2");
    this.output(new Date());
    this.output("");
    this.output("testing main properties of the Game object");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    this.output(this.game.deck.infoShort());
    this.output(this.game.dealer.info());
    this.output(this.game.players.info());
    this.output(this.game.players.player(0).info());        // show 1 player
    this.output(this.game.rules.info());

    this.output("TEST 2 COMPLETED.");
};


BJTester.prototype.runTest3 = function () {
    this.output("RUNNING TEST 3");
    this.output(new Date());
    this.output("");
    this.output("showing Dealer and Players details");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    this.output("showing Dealer object details");
    this.output(this.game.dealer.info());

    var players = this.game.players;
    this.output("showing PLayers collection details");
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
    this.output("showing Rules and Decision Matrix details");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    var rules = this.game.rules;
    this.output(rules.info());

    this.output(rules.ruleSet(0).info());
    this.output(rules.ruleSet(1).info());

    this.output("");
    this.output("TEST 4 COMPLETED.");
};


BJTester.prototype.runTest5 = function () {
    this.output("RUNNING TEST 5");
    this.output(new Date());
    this.output("");
    this.output("testing Deck.shuffle() and Dealer.dealCardTo()");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    var dealer = this.game.dealer;
    var deck   = dealer.deck;
    var player = this.game.players.player(0);

    this.output(dealer.info());
    this.output(deck.infoShort());
    this.output("showing Deck's first ten cards before shuffling");
    this.output(deck.showRange(0, 9));
    this.output("shuffling deck");
    this.output("");
    dealer.shuffleDeck();
    this.output("showing Deck's first ten cards after shuffling");
    this.output(deck.showRange(0, 9));

    this.output("dealing first three cards to " + player.nickname);
    dealer.dealCardTo(player);
    dealer.dealCardTo(player);
    dealer.dealCardTo(player);
    this.output(player.hand.info());

    this.output("dealing first three cards to " + dealer.nickname);
    dealer.dealCardTo(dealer);
    dealer.dealCardTo(dealer);
    dealer.dealCardTo(dealer);
    this.output(dealer.hand.info());

    this.output("showing hand.cardFaceValues()");
    this.output("");
    this.output(player.nickname.padEnd(15) + player.hand.cardFaceValues());
    this.output(dealer.nickname.padEnd(15) + dealer.hand.cardFaceValues());
    this.output("");
    
    this.output("showing Deck's first ten cards again");
    this.output(deck.showRange(0, 9));

    this.output("");
    this.output("TEST 5 COMPLETED.");
};

BJTester.prototype.runTest6 = function () {
    this.output("RUNNING TEST 6");
    this.output(new Date());
    this.output("");
    this.output("testing dealer.dealFirstCards() and players.cardFaceValues()");
    this.output("");

    var game = this.game;
    game.createObjects();
    game.initObjects();

    var dealer = game.dealer;
    var players = game.players;

    this.output("dealer dealing first cards before shuffling");
    this.output("");
    dealer.dealFirstCards();
    this.output(players.cardFaceValues());
    this.output(dealer.nickname.padEnd(15) + dealer.hand.cardFaceValues());

    this.output("");
    this.output("players clearing hands and dealer shuffling deck");
    players.clearHands();
    dealer.clearHand();
    dealer.shuffleDeck();
    this.output("");

    this.output("dealer dealing first cards after shuffling");
    this.output("");
    dealer.dealFirstCards();
    this.output(players.cardFaceValues());
    this.output(dealer.nickname.padEnd(15) + dealer.hand.cardFaceValues());

    this.output("");
    this.output("TEST 6 COMPLETED.");
};


BJTester.prototype.runTest7 = function () {
    this.output("RUNNING TEST 7");
    this.output(new Date());
    this.output("");
    this.output("testing Hand values and dealer.dealCardsTo()");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();
    var dealer = this.game.dealer;

    var numCards = 5;
    this.output("dealer dealing " + numCards + " card Hand to himself");
    this.output("");
    dealer.shuffleDeck();
    dealer.dealCardsTo(dealer, numCards);
    this.output(dealer.nickname.padEnd(15) + dealer.hand.cardFaceValues());
    this.output("");
    this.output(dealer.hand.info());

    this.output("");
    this.output("TEST 7 COMPLETED.");
};


BJTester.prototype.runTest8 = function () {
    this.output("RUNNING TEST 8");
    this.output(new Date());
    this.output("");
    this.output("testing Ace values");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    var card = null;
    var hand = null;
    var NUM_CARDS = 11;

    this.output("creating rigged Hand containing " + NUM_CARDS + " cards - all Aces");
    this.output("");
    hand = new BJHand("hand", this);
    this.output("showing empty Hand");
    this.output("");
    this.output(hand.info());

    // rig deck with all Aces
    for (var i = 0; i < NUM_CARDS; i++) {
        card = new Decks.BJCard("card" + i, hand);
        card.setFaceValue("A", "S");
        this.output(card.name() + "   " + card.faceValue());
        hand.addCard(card);    
    }

    this.output("");
    this.output("showing hand.cardFaceValues()");
    this.output("");
    this.output(hand.info());
    this.output(hand.cardFaceValues());
    this.output("");
    this.output("Total points in this hand: " + hand.pointTotal());

    this.output("");
    this.output("TEST 8 COMPLETED.");
};

BJTester.prototype.runTest9 = function () {
    this.output("RUNNING TEST 9");
    this.output(new Date());
    this.output("");
    this.output("testing 3-card Hands");
    this.output("");

    this.game.createObjects();
    this.game.initObjects();

    var game = this.game;
    var dealer = game.dealer;
    var players = game.players;
    var player = null;

    this.output("");
    this.output("dealer.shuffleDeck()");
    dealer.shuffleDeck();
    this.output("players.clearHands()");
    players.clearHands();
    this.output("dealer.dealFirstCards()");
    dealer.dealFirstCards();
    this.output("dealer dealCardTo() everyone");
    dealer.dealCardTo(players.player(0));
    dealer.dealCardTo(players.player(1));
    dealer.dealCardTo(players.player(2));
    dealer.dealCardTo(players.player(3));
    dealer.dealCardTo(dealer);

    this.output("showing collection's players.cardFaceValues()");
    this.output("");
    this.output(players.cardValuesAndPointTotal());
    this.output(dealer.cardValuesAndPointTotal());

    this.output("manually formatting player nickname and point totals");
    this.output("");
    player = players.player(0);

    this.output(player.nickname.padEnd(15) + player.hand.pointTotal());
    player = players.player(1);
    this.output(player.nickname.padEnd(15) + player.hand.pointTotal());
    player = players.player(2);
    this.output(player.nickname.padEnd(15) + player.hand.pointTotal());
    player = players.player(3);
    this.output(player.nickname.padEnd(15) + player.hand.pointTotal());
    this.output("");
    player = dealer;
    this.output(player.nickname.padEnd(15) + player.hand.pointTotal());
    
    
    this.output("");
    this.output("TEST 9 COMPLETED.");
};

BJTester.prototype.runTest10 = function () {
    this.output("RUNNING TEST 10");
    this.output(new Date());
    this.output("");
    this.output("testing 3-card Hands and outcomes");
    this.output("");

    this.ctrl.createObjects();          // actual app calls
    this.ctrl.initObjects();
    this.output("");

    var game = this.game;
    var dealer = game.dealer;
    var players = game.players;
    var player = null;
    var s, s2;


    var NUM_ROUNDS = 5;
    this.output("playing " + NUM_ROUNDS + " rounds");
    this.output("");
    for (var r = 1; r <= NUM_ROUNDS; r++) {
        this.output("ROUND " + r);
        players.clearHands();
        dealer.clearHand();
        dealer.shuffleDeck();
        dealer.dealFirstCards();
        dealer.dealCardTo(players.player(0));
        dealer.dealCardTo(players.player(1));
        dealer.dealCardTo(players.player(2));
        dealer.dealCardTo(players.player(3));
        dealer.dealCardTo(dealer);

        // players
        for (var i = 0; i < 4; i++) {
        player = players.player(i);
        player.rules = game.currRules();
        s = player.nickname.padEnd(15) + player.hand.pointTotal() + "  ";
        s2 = s.padEnd(20);
        if (player.hand.isUnder()) s2 += "UNDER";
        if (player.hand.isBust()) s2 += "BUST";
        if (player.hand.isBlackjack()) s2 += "*BLACKJACK*";    
        this.output(s2);
        }

        // dealer
        s = "";
        player = dealer;
        s = player.nickname.padEnd(15) + player.hand.pointTotal() + "  ";
        s2 = s.padEnd(20);
        if (player.hand.isUnder()) s2 += "UNDER";
        if (player.hand.isBust()) s2 += "BUST";
        if (player.hand.isBlackjack()) s2 += "*BLACKJACK*";    
        this.output(s2);
        this.output("");
    }

    this.output("");
    this.output("TEST 10 COMPLETED.");
};



BJTester.prototype.runTest11 = function () {
    this.output("RUNNING TEST 11");
    this.output(new Date());
    this.output("");
    this.output("testing App's Game Controller and methods");
    this.output("");

    this.output(this.game.info());      // no need to create
    this.output("calling CONTROLLER'S ctrl.createObjects()");
    this.ctrl.createObjects();          // actual app calls
    this.output("calling CONTROLLER'S ctrl.initObjects()");
    this.ctrl.initObjects();
    this.output("");

    this.output(this.game.info());      // has props now

    this.output("");
    this.output("TEST 11 COMPLETED.");
};


// Rules and Decision Matrix testing here
BJTester.prototype.runTest12 = function () {
    this.output("RUNNING TEST 12");
    this.output(new Date());
    this.output("");
    this.output("testing Matrix and array syntx");
    this.output("");

    this.ctrl.createObjects();          // actual app calls
    this.ctrl.initObjects();

    var currRules = this.game.currRules();
    this.output("outputting game.currRules()");
    this.output("");
    this.output(currRules.info());

    this.output("outputting currRules.matrix[0][0] - should be 0");
    this.output(currRules.matrix[0][0]);

    this.output("outputting currRules.matrix[21][11] - should be 0");
    this.output(currRules.matrix[21][11]);

    this.output("outputting currRules.matrix[0][1] - should be 1");
    this.output(currRules.matrix[0][1]);

    this.output("outputting currRules.matrix[0][9] - should be 9");
    this.output(currRules.matrix[0][9]);

    this.output("");
    this.output("TEST 12 COMPLETED.");
};





BJTester.prototype.runTest13 = function () {
    this.output("RUNNING TEST 13");
    this.output(new Date());
    this.output("");
    this.output("testing Player hit or stay using Decision Matrix");
    this.output("");

    this.ctrl.createObjects();
    this.ctrl.initObjects();

    var game = this.game;
    var dealer = game.dealer;
    var player0 = game.players.player(0);
    var currRules = player0.currRules();
    this.output("using " + currRules.name());

    this.output("");
    this.output(dealer.nickname + " dealing two cards to " + player0.nickname);
    this.output("");

    dealer.shuffleDeck();
    dealer.dealCardTo(player0);
    dealer.dealCardTo(player0);
    this.output(player0.hand.cardFaceValues());
    this.output("Total: " + player0.hand.pointTotal());

    this.output("");
    this.output("Player deciding to hit or stay using Rules and Decision Matrix");
    this.output(player0.hand.isHitting());

    this.output("");
    this.output("TEST 13 COMPLETED.");
};

BJTester.prototype.runTest14 = function () {
    this.output("RUNNING TEST 14");
    this.output(new Date());
    this.output("");
    this.output("testing...");
    this.output("");

    this.output("");
    this.output("TEST 14 COMPLETED.");
};

BJTester.prototype.runTest15 = function () {
    this.output("RUNNING TEST 15");
    this.output(new Date());
    this.output("");
    this.output("testing...");
    this.output("");

    this.output("");
    this.output("TEST 15 COMPLETED.");
};



module.exports = BJTester;
