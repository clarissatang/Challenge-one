var parsingCommands = require('./parsingCommands');

module.exports = CommandsFunctions;

 function CommandsFunctions(currEvent,allCommands){
    this.currEvent = currEvent;
    this.allCommands = allCommands;
}

CommandsFunctions.prototype.add = function(key, value) {
    this.currEvent.add(key, value);
};

CommandsFunctions.prototype.get = function(key) {
    var value = this.currEvent.get(key);
    if (value) {
        console.log(value);
    }
};

CommandsFunctions.prototype.list = function(){
    this.currEvent.list();
};

CommandsFunctions.prototype.remove = function(key){
    this.currEvent.remove(key);
};

CommandsFunctions.prototype.build = function() {
    Object.keys(this.allCommands).forEach(function (key) {
        var oneCommand = this.allCommands[key];
        var runCurrFunction = this[key];
        parsingCommands
            .parseCommand(oneCommand.syntax)
            .action(runCurrFunction.bind(this));
    }, this);
    return parsingCommands;
};
