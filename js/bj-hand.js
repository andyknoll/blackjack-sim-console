/*****************************************************************************

    bj-hand.js

    Andy Knoll
    November 2018

*****************************************************************************/

var br = "\r\n";

// BJHand "class"
var BJHand = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJHand";
    this.rules = null;      // e.g. "Vegas Rules"
};
BJHand.prototype = Object.create(AKCollection.prototype);
BJHand.prototype.constructor = BJHand;

// getter
BJHand.prototype.card = function(idx) { return this.object(idx); };

// methods
BJHand.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    if (this.rules)
        s += ".rules: " + this.rules.name() + br;
    else
        s += ".rules: null" + br;
    return s;
};

BJHand.prototype.addCard = function(card) {
    return this.addObject(card);
};

// overridden for info() string
BJHand.prototype.childrenInfo = function() {
    var s = "";
    var card = null;
    for (var i = 0; i < this.count(); i++) {
        card = this.card(i);
        s += "  [" + i + "] " + card.faceValue().padEnd(5) + br;
    }
    return s;
};

BJHand.prototype.cardFaceValues = function() {
    var s = "";
    for (var i = 0; i < this.count(); i++) {
        s += this.card(i).faceValue().padEnd(5) + "    ";
    }
    return s;
};

BJHand.prototype.cardValues = function() {
    var s = "";
    for (var i = 0; i < this.count(); i++) {
        s += this.card(i).value + "    ";
    }
    return s;
};


// THIS IS WRONG! MULTIPLE VALUES ARE POSSIBLE WITH ACES
BJHand.prototype.cardPointValues = function() {
    var total = 0;
    for (var i = 0; i < this.count(); i++) {
        total += this.card(i).pointValue();
    }
    return total;
};

// THIS IS THE MAIN HAND VALUES ALGORITHM!
// Aces can count as 1 or 11 - hands can also have multiple Aces
// must also filter out duplicates - only UNIQUE possibilities!
BJHand.prototype.cardPossibleValues = function() {
    // 2 to the n possibilites
    let total = 0;
    var card = null;
    var aceCount = 0;
    var possibles = [];
    var values = [];
    for (var i = 0; i < this.count(); i++) {
        card = this.card(i);
        if (card.value = "A") {
            //console .log("FOUND AN ACE IN POS " + i);
            //possibles.push(i);      // for now...
            aceCount++;
        }
        total += card.pointValue();
    }
    possibles.push("aces: " + aceCount);      // for now...
    return possibles;
};

BJHand.prototype.setRules = function(rulesObject) {
    this.rules = rulesObject;
};

// now using Rules objects!
BJHand.prototype.isBust = function() {
    if (!this.rules) return false;
    //return this.cardPointValues() > 21;
    return this.rules.isHandBust(this);
};

// now using Rules objects!
BJHand.prototype.isBlackjack = function() {
    if (!this.rules) return false;
    //return this.cardPointValues() == 21;
    return this.rules.isHandBlackjack(this);
};

// THIS IS THE MAIN DECISION ALGORITHM
// NEED TO SUPPORT RULES FOR 2 STYLES OF PLAY
// NEED TO SUPPORT MULTIPLE HAND VALUES (ACES)

// now using Rules objects!
BJHand.prototype.isHitting = function() {
    //return true;       // for now
    return this.rules.isHandHitting(this);
};





module.exports = BJHand;
