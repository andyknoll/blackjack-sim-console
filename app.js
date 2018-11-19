/*****************************************************************************

    app.js

    Andy Knoll
    November 2018

    Blackjack simulation game - command line version.

    THIS IS THE CONSOLE APP WHICH HOSTS THE GAME OBJECT

    This App object implements a tiny MVC approach where only the
    Controller object can access the Models and Views.

    This maintains separation between the logic and UI (console).

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
            Rules



    Players - 2 down
    Dealer  - 1 down 1 up

    
*****************************************************************************/

var AppModels = require('./js/app-models.js');
var AppViews  = require('./js/app-views.js');
var AppCtrls  = require('./js/app-ctrls.js');

var BJTester  = require('./js/bj-tester-2.js');


var br = "\r\n";    // CRLF

// BJConsoleApp "class"
BJConsoleApp = function(name, parent) {
    AKMvcApp.call(this, name, parent);
    this._className = "BJConsoleApp";
    this.msg = "";
};
BJConsoleApp.prototype = Object.create(AKMvcApp.prototype);
BJConsoleApp.prototype.constructor = BJConsoleApp;


BJConsoleApp.prototype.info = function() {
	var s = "";
    s += AKMvcApp.prototype.info.call(this);
    // new properties go here...
    return s;
};

// override in cutom apps
BJConsoleApp.prototype.createModels = function() { 
    return new AppModels("models", this);
};

BJConsoleApp.prototype.createViews = function() { 
    return new AppViews("views", this);
};

BJConsoleApp.prototype.createControllers = function() { 
    return new AppCtrls("ctrls", this);
};


BJConsoleApp.prototype.run = function() {
    var args = process.argv;        // Node command line
    var testIdx = args[3];
    if (args[2] == "test") {
        this.runTests(testIdx);     // runTests(n)
    } else {
        this.ctrls.bjCtrl.run();    // run the Blackjack controller
    }
};

BJConsoleApp.prototype.runTests = function(n) {
    var tester = new BJTester("tester", this);
    tester.runTest(n);
};



// create and run the app object
// now uses command line arguments "node app.js test 4"
var app = new BJConsoleApp("Blackjack Console App", null);      // no parent
app.run();
