/*****************************************************************************

    app-views.js

    Andy Knoll
    November 2018

    Tester object for Blackjack simulation game - command line version.

*****************************************************************************/

// base JS "classes" supporting inheritance and polymorphism
var AKObject = require('./ak-objects.js');
var Decks = require('./bj-deck.js');
var BJHand = require('./bj-hand.js');
var Players = require('./bj-players.js');
var Rules = require('./bj-rules.js');

var br = "\r\n";

// BJTester "class"
var BJTester = function (name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJTester";
    this.app = parent;
    this.createTestObjects();
};
BJTester.prototype = Object.create(AKObject.prototype);
BJTester.prototype.constructor = BJTester;

// redirect to the app's output
BJTester.prototype.output = function (s) {
    this.app.output(s);
};

BJTester.prototype.createTestObjects = function () {

    // 4 decks
    this.d0 = new Decks.BJDeck("d0", this);
    this.d1 = new Decks.BJDeck("d1", this);
    this.d2 = new Decks.BJDeck("d2", this);
    this.d3 = new Decks.BJDeck("d3", this);

    // 4 cards
    this.card0 = new Decks.BJCard("card0", this);
    this.card1 = new Decks.BJCard("card1", this);
    this.card2 = new Decks.BJCard("card2", this);
    this.card3 = new Decks.BJCard("card3", this);

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
        default: this.runTest1(); break;
    }
};


BJTester.prototype.runTest1 = function () {
    this.output("RUNNING TEST 1");
    this.output("");

    this.output("creating multiDeck object");
    this.multiDeck = new Decks.BJMultiDeck("multiDeck", this);
    this.output("created object: " + this.multiDeck.name());
    this.output("className: " + this.multiDeck.className());
    this.output("");

    this.output("adding 4 decks");
    this.multiDeck.addDeck(this.d0);
    this.multiDeck.addDeck(this.d1);
    this.multiDeck.addDeck(this.d2);
    this.multiDeck.addDeck(this.d3);
    this.output("multiDeck.count: " + this.multiDeck.count());
    this.output("");

    this.output("showing first 13 cards");
    this.output(this.multiDeck.showRange(0, 12));
    this.output("shuffling multideck - testing .shuffle()");
    this.multiDeck.shuffle();
    this.output("showing first 13 cards");
    this.output(this.multiDeck.showRange(0, 12));
    this.output("");
    this.output("TEST 1 COMPLETED.");
};



BJTester.prototype.runTest2 = function () {
    this.output("RUNNING TEST 2");
    this.output("");

    this.output("creating card Hand object");
    this.hand = new BJHand("hand", this);
    this.output("");
    this.output("created object: " + this.hand.name());
    this.output(this.hand.info());
    this.output("");

    this.multiDeck = new Decks.BJMultiDeck("multiDeck", this);
    this.multiDeck.addDeck(this.d0);
    this.multiDeck.addDeck(this.d1);
    this.multiDeck.addDeck(this.d2);
    this.multiDeck.addDeck(this.d3);
    this.multiDeck.shuffle();

    this.output("shuffling deck and adding 3 cards to Hand");
    this.output("testing Deck.getNextCard() and Hand.addCard()");
    this.hand.addCard(this.multiDeck.getNextCard());
    this.hand.addCard(this.multiDeck.getNextCard());
    this.hand.addCard(this.multiDeck.getNextCard());
    this.output("");
    this.output("showing Hand info:");
    this.output(this.hand.info());

    this.output("showing Hand.cardFaceValues()");
    this.output(this.hand.cardFaceValues());
    this.output("showing Hand.cardPointValues()");
    this.output(this.hand.cardPointValues());
    this.output("");
    this.output("is it a bust Hand? " + this.hand.isBust());
    this.output("is it a Blackjack? " + this.hand.isBlackjack());
    this.output("");

    this.output("clearing - testing Hand.clear()");
    this.hand.clear();
    this.output("");
    this.output("showing Hand info:");
    this.output(this.hand.info());
    this.output("");
    this.output("TEST 2 COMPLETED.");
};


BJTester.prototype.runTest3 = function () {
    this.output("RUNNING TEST 3");
    this.output("");

    this.output("creating Hand and multiDeck of 4 Decks");
    this.hand = new BJHand("hand", this);
    this.multiDeck = new Decks.BJMultiDeck("multiDeck", this);
    this.multiDeck.addDeck(this.d0);
    this.multiDeck.addDeck(this.d1);
    this.multiDeck.addDeck(this.d2);
    this.multiDeck.addDeck(this.d3);

    this.output("shuffling and dealing 10 Hand objects of 3 Cards");
    this.multiDeck.shuffle();
    this.output("");

    var NUM_LOOPS = 10;
    for (var i = 0; i < NUM_LOOPS; i++) {
        this.hand.addCard(this.multiDeck.getNextCard());
        this.hand.addCard(this.multiDeck.getNextCard());
        this.hand.addCard(this.multiDeck.getNextCard());
        this.output("Hand " + (i + 1) + ": showing cardFaceValues()");
        this.output(this.hand.cardFaceValues());
        //this.output("HOLDING? " + this.hand.isHolding());
        if (this.hand.isBlackjack()) this.output("!!! BLACKJACK !!!");
        this.output("POINTS: " + this.hand.cardPointValues());
        if (this.hand.isBust()) this.output("BUSTED!");
        if (!this.hand.isBust()) this.output("YOU'RE OK - NOT A BUST");
        this.output("");
        this.hand.clear();
    }

    this.output("");
    this.output("TEST 3 COMPLETED.");
};



BJTester.prototype.runTest4 = function () {
    this.output("RUNNING TEST 4");
    this.output("");

    this.output("creating Player and Dealer objects");
    this.output("");
    this.player1 = new Players.BJPlayer("player1", this);
    this.dealer1 = new Players.BJDealer("dealer1", this, this.d0);
    this.output(this.player1.info());
    this.output(this.dealer1.info());

    this.output("initializing Player and Dealer objects");
    this.output("");
    this.player1.nickname = "Huey";
    this.player1.cash = "200";
    this.dealer1.nickname = "Mr. Magoo";
    this.dealer1.cash = "1000000";

    this.output(this.player1.info());
    this.output(this.dealer1.info());

    this.output("creating and initializing second Player object");
    this.output("");
    this.player2 = new Players.BJPlayer("player2", this);
    this.player2.nickname = "Louie";
    this.player2.cash = "200";
    this.output(this.player2.info());

    this.output("");
    this.output("TEST 4 COMPLETED.");
};


BJTester.prototype.runTest5 = function () {
    this.output("RUNNING TEST 5");
    this.output("");

    this.output("creating Vegas Rules object");
    this.output("");
    this.rules1 = new Rules.BJVegasRules("Vegas Rules", this);
    this.output(this.rules1.info());

    this.output("creating Hand object");
    this.output("");
    this.hand1 = new BJHand("hand1", this);
    this.output(this.hand1.info());
    this.output("");

    this.output("setting Rules for Hand object");
    this.output("");
    this.hand1.setRules(this.rules1);
    this.output(this.hand1.info());
    this.output("");

    this.output("adding three Card objects to Hand");
    this.output("");
    this.card1.setFaceValue("6", "H");
    this.card2.setFaceValue("7", "C");
    this.card3.setFaceValue("8", "D");
    this.hand1.addCard(this.card1);
    this.hand1.addCard(this.card2);
    this.hand1.addCard(this.card3);
    this.output(this.hand1.info());
    this.output("");

    this.output("check Hand.isBust() - testing Rules object");
    this.output(this.hand1.isBust());
    this.output("check Hand.isBlackjack() - testing Rules object");
    this.output(this.hand1.isBlackjack());
    this.output("");

    this.output("");
    this.output("TEST 5 COMPLETED.");
};


BJTester.prototype.runTest6 = function () {
    this.output("RUNNING TEST 6");
    this.output("");

    this.output("testing multiple Hand values with Aces");
    this.output("");

    this.output("creating Vegas Rules object");
    this.rules1 = new Rules.BJVegasRules("Vegas Rules", this);

    this.output("creating Hand object and assigning Rules");
    this.hand1 = new BJHand("hand1", this);
    this.hand1.setRules(this.rules1);

    this.output("adding three Card objects to Hand");
    this.output("");
    this.card1.setFaceValue("A", "H");
    this.card2.setFaceValue("A", "C");
    this.card3.setFaceValue("A", "D");
    this.hand1.addCard(this.card1);
    this.hand1.addCard(this.card2);
    this.hand1.addCard(this.card3);
    this.output(this.hand1.info());

    this.output("basic cardPointValues (Ace = 11): " + this.hand1.cardPointValues());
    this.output("");
    this.output("possible cardPointValues array: " + this.hand1.cardPossibleValues());
    this.output("");

    this.output("");
    this.output("TEST 6 COMPLETED.");
};


BJTester.prototype.runTest7 = function () {
    this.output("RUNNING TEST 7");
    this.output("");

    this.output("testing Player and Dealer objects");
    this.output("");

    this.output("creating and initializing Player and Dealer objects");
    this.output("");
    this.players = new Players.BJPlayers("players", this);
    this.dealer1 = new Players.BJDealer("dealer1", this, this.d0);
    this.player1 = new Players.BJPlayer("player1", this);
    this.player2 = new Players.BJPlayer("player2", this);

    this.players.addPlayer(this.dealer1);       // add dealer first
    this.players.addPlayer(this.player1);
    this.players.addPlayer(this.player2);
    this.output("showing Players collection object");
    this.output(this.players.info());

    this.dealer1.nickname = "Mr. Magoo";
    this.dealer1.cash = "1000000";
    this.player1.nickname = "Huey";
    this.player1.cash = "200";
    this.player2.nickname = "Dewey";
    this.player2.cash = "200";

    this.output(this.dealer1.info());
    this.output(this.player1.info());
    this.output(this.player2.info());

    this.output("testing Dealer shuffle() and dealTo() 3 cards");
    this.output("");
    this.dealer1.shuffleDeck();
    this.dealer1.dealCardTo(this.player1);
    this.dealer1.dealCardTo(this.player2);
    this.dealer1.dealCardTo(this.player1);
    this.dealer1.dealCardTo(this.player2);
    this.dealer1.dealCardTo(this.player1);
    this.dealer1.dealCardTo(this.player2);

    this.output("first 3 Player1.Hand cards");
    this.output(this.player1.hand.info());
    this.output("");

    this.output("first 3 Player2.Hand cards");
    this.output(this.player2.hand.info());
    this.output("");

    this.output("calling inherited dealer1.deck.showRange(0, 5)");
    this.output("first 6 Dealer.Deck cards - should be same but alternating");
    this.output(this.dealer1.deck.showRange(0, 5));

    this.output("");
    this.output("TEST 7 COMPLETED.");
};


BJTester.prototype.runTest8 = function () {
    this.output("RUNNING TEST 8");
    this.output("");

    this.output("testing Player and Dealer objects");
    this.output("same as TEST 7 but using Players collection");
    this.output("");

    this.output("creating and initializing Player and Dealer objects");
    this.output("");
    this.players = new Players.BJPlayers("players", this);
    this.dealer1 = new Players.BJDealer("dealer1", this, this.d0);
    this.player1 = new Players.BJPlayer("player1", this);
    this.player2 = new Players.BJPlayer("player2", this);

    var players = this.players;
    players.addPlayer(this.dealer1);
    players.addPlayer(this.player1);
    players.addPlayer(this.player2);

    // access collection
    var dealer1 = players.player(0);
    var player1 = players.player(1);
    var player2 = players.player(2);

    dealer1.nickname = "Mr. Magoo";
    dealer1.cash = "1000000";
    player1.nickname = "Huey";
    player1.cash = "200";
    player2.nickname = "Dewey";
    player2.cash = "200";

    this.output("showing Players collection object");
    this.output(players.info());

    this.output(dealer1.info());
    this.output(player1.info());
    this.output(player2.info());

    this.output("testing Players.getInitialCards(2)");
    this.output("");
    dealer1.shuffleDeck();

    players.getInitialCards(2);     // include Dealer

    this.output("Player1.Hand cards");
    this.output(player1.hand.info());
    this.output("");

    this.output("Player2.Hand cards");
    this.output(player2.hand.info());
    this.output("");

    this.output("Dealer1.Hand cards");
    this.output(dealer1.hand.info());
    this.output("");

    this.output("calling inherited dealer1.deck.showRange(0, 5)");
    this.output("first 6 Dealer.Deck cards - should be same but alternating");
    this.output(dealer1.deck.showRange(0, 5));

    this.output("showing Players.cardFaceValues()");
    this.output(players.cardFaceValues());
    this.output("");

    this.output("showing Players.cardValues()");
    this.output(players.cardValues());
    this.output("");


    this.output("");
    this.output("TEST 8 COMPLETED.");
};


BJTester.prototype.runTest9 = function () {
    this.output("RUNNING TEST 9");
    this.output("");
    this.output("no test written here yet");
    this.output("");
    this.output("TEST 9 COMPLETED.");
};

BJTester.prototype.runTest10 = function () {
    this.output("RUNNING TEST 10");
    this.output("");
    this.output("no test written here yet");
    this.output("");
    this.output("TEST 10 COMPLETED.");
};



module.exports = BJTester;
