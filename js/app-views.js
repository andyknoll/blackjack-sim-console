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

var br = "\r\n";    // CRLF

// AppViews "class"
var AppViews = function(name, parent) {
    AKCollection.call(this, name, parent);
    this._className = "AppViews";

    this.bjView = new BJConsoleView("bjView", this);
};
AppViews.prototype = Object.create(AKCollection.prototype);
AppViews.prototype.constructor = AppViews;

AppViews.prototype.info = function() {
	var s = "";
    s += AKCollection.prototype.info.call(this);
    s += ".bjView: " + this.bjView.name() + br;
    return s;
};

AppViews.prototype.output = function(txt) {
    this.bjView.output(txt);
};






// BJConsoleView "class"
var BJConsoleView = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "BJConsoleView";
};
BJConsoleView.prototype = Object.create(AKObject.prototype);
BJConsoleView.prototype.constructor = BJConsoleView;

// output to console (not browser) in this version
BJConsoleView.prototype.output = function(txt) {
    console.log(txt + br);
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
