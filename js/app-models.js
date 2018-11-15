/*****************************************************************************

    app-models.js

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
var BjGame = require('./bj-game.js');        // the Blackjack Game "class"

var br = "\n";      // newline for output



// AppModels "class"
var AppModels = function(name, parent) {
    AKObject.call(this, name, parent);
    this._className = "AppModels";

    this.bjGame = new BjGame("bjGame", this);

    // the varous Game model objects are defined in their own files
    // Cards, Decks, Players, etc. - they are all props of this single Game
};
AppModels.prototype = Object.create(AKObject.prototype);
AppModels.prototype.constructor = AppModels;

AppModels.prototype.info = function() {
	var s = "";
    s += AKObject.prototype.info.call(this);
    s += ".bjGame: " + this.bjGame.name() + br;
    return s;
};

module.exports = AppModels;
