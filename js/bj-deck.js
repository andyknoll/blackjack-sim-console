/*****************************************************************************

    bj-deck.js

    Andy Knoll
    November 2018

*****************************************************************************/

var br = "\r\n";


// BJCard "class"
var BJCard = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJCard";
    this.value;
    this.suit;
};
BJCard.prototype = Object.create(AKObject.prototype);
BJCard.prototype.constructor = BJCard;

BJCard.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".value: " + this.value + br;
    s += ".suit: "  + this.suit + br;
    return s;
};

// called by Deck when creating cards
BJCard.prototype.setFaceValue = function(value, suit) {
    this.value = value;
    this.suit = suit;
};

BJCard.prototype.faceValue = function() {
    return this.value + "-" + this.suit;
};

BJCard.prototype.pointValue = function() {
    switch (this.value) {
        case "2"  : return 2;
        case "3"  : return 3;
        case "4"  : return 4;
        case "5"  : return 5;
        case "6"  : return 6;
        case "7"  : return 7;
        case "8"  : return 8;
        case "9"  : return 9;
        case "10" :
        case "J"  : 
        case "Q"  :
        case "K"  : return 10;
        case "A"  : return 11;       // SPECIAL CASE - REVISIT THIS!
    }
};

BJCard.prototype.color = function() {
    switch (this.suit) {
        case "S" :
        case "C" : return "black";
        case "H" :
        case "D" : return "red";
    }
};






// BJDeck "class" - inherits from AKCollection
var BJDeck = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJDeck";
    this._createDeck();         // fill with cards at creation
};
BJDeck.prototype = Object.create(AKCollection.prototype);
BJDeck.prototype.constructor = BJDeck;

// getter
BJDeck.prototype.card = function(idx) { return this.object(idx); };

BJDeck.prototype._createDeck = function() {
    const suits  = ['D','H','C','S'];
    const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];    
    var card = null;
    var idx = 0;
    var id = "";

    for (var s = 0; s < suits.length; s++) {
        for (var v = 0; v < values.length; v++) {
            id = this.name() + "-card-" + idx;
            card = new BJCard(id, this);
            card.setFaceValue(values[v], suits[s]);
            this.addObject(card);
            idx++;
        }
    }
    //console.log("_createDeck");
};

BJDeck.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    return s;
};

// overridden to cshow Card values
BJDeck.prototype.childInfo = function(obj, idx) {
    var s = "  [" + idx + "]  " + obj.faceValue() + br;
    return s;
};

// alias method name
BJDeck.prototype.getNextCard = function() {
    return this.next();
};

// shuffle and point to first card
BJDeck.prototype.reset = function() {
    this.shuffle();
    this.first();
};







// BJMultiDeck "class" - a super Deck of Decks!
var BJMultiDeck = function(name, parent) {
    BJDeck.call(this, name, parent);
    this._className = "BJMultiDeck";
};
BJMultiDeck.prototype = Object.create(BJDeck.prototype);
BJMultiDeck.prototype.constructor = BJMultiDeck;

// override to do nothing
BJMultiDeck.prototype._createDeck = function() {
};

// adds individual deck cards to the master collection
BJMultiDeck.prototype.addDeck = function(deck) {
    var card;
    for (var i = 0; i < deck.count(); i++) {
        card = deck.card(i);
        this.addObject(card);
    }
    return this.count();
};




module.exports = {
    BJCard  : BJCard,
    BJDeck  : BJDeck,
    BJMultiDeck : BJMultiDeck
}

