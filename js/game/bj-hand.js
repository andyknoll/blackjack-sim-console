/*****************************************************************************

    bj-hand.js

    Andy Knoll
    November 2018

    A Hand is a collection of Card objects. It is owned by a Player.

*****************************************************************************/

var br = "\r\n";

// BJHand "class"
var BJHand = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJHand";
    //this.numAces = 0;
    this.player = parent;
};
BJHand.prototype = Object.create(AKCollection.prototype);
BJHand.prototype.constructor = BJHand;

// getter
BJHand.prototype.card = function(idx) { return this.object(idx); };
BJHand.prototype.currRules = function() { return this.player.currRules(); };

// methods
BJHand.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    s += ".count: "      + this.count() + br;
    s += ".pointTotal: " + this.pointTotal() + br;
    s += ".currRules: "  + this.currRules.name() + br;
    //s += ".numAces: " + this.numAces + br;        // not used
    return s;
};

BJHand.prototype.addCard = function(card) {
    if (card.value == "A") this.numAces++;  // is this still needed?
    return this.addObject(card);
};

// is this needed?
BJHand.prototype.clear = function() {
    this.numAces = 0;
    return AKCollection.prototype.clear.call(this);     // super
};

// overridden to show face values
BJHand.prototype.childInfo = function(card, idx) {
    var s = "";
    var faceVal = card.faceValue();
    s += "  [" + idx + "] " + faceVal.padEnd(5) + br;
    return s;
};

// this should be a View method!
BJHand.prototype.cardFaceValues = function() {
    var s = "";
    for (var i = 0; i < this.count(); i++) {
        s += this.card(i).faceValue().padEnd(5) + " ";
    }
    return s;
};

// this should be a View method!
BJHand.prototype.cardValues = function() {
    var s = "";
    for (var i = 0; i < this.count(); i++) {
        s += this.card(i).value.padEnd(5) + " ";
    }
    return s;
};


// special cases if there is one or more than one Ace
BJHand.prototype.pointTotal = function() {
    var total = 0;
    var deduct = 0
    for (var i = 0; i < this.count(); i++) {
        total += this.card(i).pointValue();
    }
    if (total <= 21) return total;
    if (this.numAces == 1) deduct = 10;
    if (this.numAces > 1) {
        deduct = (this.numAces - 1) * 10;
    }
    return total - deduct;
};


/*
// no need to use Rules objects here
BJHand.prototype.isUnder = function() {
    return this.pointTotal() <= 21;
    //return this.currRules().isHandUnder(this);
};

BJHand.prototype.isBust = function() {
    return this.pointTotal() > 21;
    //return this.currRules().isHandBust(this);
};

BJHand.prototype.isBlackjack = function() {
    return (this.pointTotal() == 21) && (this.count() == 2);
    //return this.currRules().isHandBlackjack(this);
};
*/


// new 11/26/2018
BJHand.prototype.getStatus = function() {
    var points = this.pointTotal();
    var status = BJHand.UNDER;
    if ((points == 21) && (this.count() == 2)) {
        status = BJHand.BLACKJACK;
    } else if (points > 21) {
        status = BJHand.OVER;
    }
    return  status;
};

// MUST USE THE RULES GRID HERE!!!
BJHand.prototype.decideAction = function() {
    var action = BJHand.STAY;
    var game = this.player.game();
    if (this.player == game.dealer) {
        if (this.pointTotal() <= 16) action = BJHand.HIT;
        return action;
    }
    // now use the grid for Players
    if (this.pointTotal() <= Math.floor(Math.random() * 40)) {
        action = BJHand.HIT;
    }
    return action;
};

// status codes
BJHand.UNDER     = 0;
BJHand.OVER      = 1;
BJHand.BLACKJACK = 2;

// action codes
BJHand.STAY = 0;
BJHand.HIT  = 1;


module.exports = BJHand;
