/*****************************************************************************

    app-views.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

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

*****************************************************************************/

var AKObject = require('./ak-objects.js');

var br = "\r\n";

// AppViews "class"
var AppViews = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "AppViews";

    this.bjView = new BJConsoleView("bjView", this);
};
AppViews.prototype = Object.create(AKObject.prototype);
AppViews.prototype.constructor = AppViews;

AppViews.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".bjView: " + this.bjView.name() + br;
    return s;
};


// BJConsoleView "class"
var BJConsoleView = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJConsoleView";
};
BJConsoleView.prototype = Object.create(AKObject.prototype);
BJConsoleView.prototype.constructor = BJConsoleView;

// output to console (not browser) in this version
BJConsoleView.prototype.output = function(s) {
    console.log(s + "\r");
};


BJConsoleView.prototype.showFinalStats = function(numRounds) {
    var s = "";
    s += br;
    s += "============================================" + br;
    s += br;
    s += "Rounds played: " + numRounds + br;
    s += br;
    s += "============================================" + br;
    s += br;
    this.output(s);
};


module.exports = AppViews;
