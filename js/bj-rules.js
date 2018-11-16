/*****************************************************************************

    bj-rules.js

    Andy Knoll
    November 2018

    Trying this approach to handle multiple style games
    Vegas, Atlantic City, etc.

    This will be owned by the Game object. (perhaps the Player or Hand?)

*****************************************************************************/

var br = "\r\n";


// BJRules "class"
var BJRules = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJRules";
};
BJRules.prototype = Object.create(AKObject.prototype);
BJRules.prototype.constructor = BJRules;

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



// BJAtlanticRules "class"
var BJAtlanticRules = function(name, parent) {
    BJRules.call(this, name, parent);
    this._className = "BJAtlanticRules";
};
BJAtlanticRules.prototype = Object.create(BJRules.prototype);
BJAtlanticRules.prototype.constructor = BJAtlanticRules;






// BJRulesCollection "class"
var BJRulesCollection = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "BJRulesCollection";
};
BJRulesCollection.prototype = Object.create(AKCollection.prototype);
BJRulesCollection.prototype.constructor = BJRulesCollection;

// getter
BJRulesCollection.prototype.rule = function(idx) { return this.object(idx); };

BJRulesCollection.prototype.addRules = function(rulesObj) {
    return this.addObject(rulesObj);
};






module.exports = { 
    BJRules : BJRules,
    BJVegasRules : BJVegasRules,
    BJAtlanticRules : BJAtlanticRules,
    BJRulesCollection : BJRulesCollection
}
    
