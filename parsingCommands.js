var EventEmitter = require('events').EventEmitter;

module.exports = new ParsingCommands();

function ParsingCommands(commands){
    this.commandName = commands;
    this.fullCommands = [];
    this.args = [];
}

ParsingCommands.prototype.__proto__ = EventEmitter.prototype;

ParsingCommands.prototype.parseCommand = function(name) {
    var args = name.split(/ +/);
    var cmd = new ParsingCommands(args.shift());
    this.fullCommands.push(cmd);
    cmd.getCmdArgs(args);
    cmd.parent = this;
    return cmd;
};

ParsingCommands.prototype.getCmdArgs = function(args) {
    if (!args.length)
        return;
    var self = this;
    args.forEach(function (oneArg) {
        var argDetails = {
            value: '',
            required: false
        };

        if (oneArg[0]==='<') {
            argDetails.isRequired = true;
            argDetails.value = oneArg.slice(1, -1);
        }
        self.args.push(argDetails);
    });
    return this;
};

ParsingCommands.prototype.action = function(command) {
    var self = this;
    var listener = function (args) {
        var isArgMissing = false;
        self.args.forEach(function (oneArg,i) {
            if (oneArg.isRequired && args[i] == null) {
                self.missingArgument(oneArg.value);
                isArgMissing = true;
            }
        });

        if (!isArgMissing)
            command.apply(self, args);
    };
    this.parent.on(this.commandName, listener);
    return this;
};

ParsingCommands.prototype.runCmd = function(args) {
    this.emit(args.shift(), args);
    return this;
};

ParsingCommands.prototype.missingArgument = function(name) {
    console.log("error: missing required argument `%s'", name);
};


