/*****************************************************************************

    bj-rules.js

    Andy Knoll
    November 2018

    Trying this approach to handle multiple style games
    Vegas, Atlantic City, etc.

    This will be owned by the Game object. (perhaps the Player or Hand?)

*****************************************************************************/

var br = "\r\n";

// BJRule "class"
var BJRule = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJRule";
};
BJRule.prototype = Object.create(AKObject.prototype);
BJRule.prototype.constructor = BJRule;




// BJRules "class"
var BJRules = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJRules";
};
BJRules.prototype = Object.create(AKCollection.prototype);
BJRules.prototype.constructor = BJRules;

BJRules.prototype.addRule = function(rule) {
    return this.addObject(rule);
};

BJRules.prototype.isHandBust = function(hand) {
    return hand.cardPointValues() > 21;
};

// not really - must be only first two cards!
BJRules.prototype.isHandBlackjack = function(hand) {
    return hand.cardPointValues() == 21;    
};

// THIS IS THE MAIN DECISION ALGORITHM
// NEED TO SUPPORT RULES FOR 2 STYLES OF PLAY
// NEED TO SUPPORT MULTIPLE HAND VALUES (ACES)

BJRules.prototype.isHandHitting = function(hand) {
    return true;    // FIX THIS - TEST ONLY
};




// BJVegasRules "class"
var BJVegasRules = function(name, parent) {
    BJRules.call(this, name, parent);
    this._className = "BJVegasRules";
};
BJVegasRules.prototype = Object.create(BJRules.prototype);
BJVegasRules.prototype.constructor = BJVegasRules;

/*
// this is an inherited rule method - not needed
BJVegasRules.prototype.isHandBust = function(hand) {
    return hand.cardPointValues() > 21;
};
*/



module.exports = { 
    BJRule : BJRule,
    BJRules : BJRules,
    BJVegasRules : BJVegasRules
}
    
