var readline = require('readline');
var allCommands = require('./allCommands');
var KeyValueStore  = require('./keyValueStore');
var keyValueStoreObj = new KeyValueStore();
var CommandsFunctions = require('./commandsFunctions');
var commandsFunctionsObj = new CommandsFunctions(keyValueStoreObj, allCommands);
var createInterface = commandsFunctionsObj.build();

module.exports = CliInterface;

function CliInterface(){
    this.createCliInterface = readline.createInterface(process.stdin, process.stdout);
}

function onLineInput(oneCommand) {
    oneCommand = oneCommand.replace(/\s+/g, ' ').trim().replace(/, /g, ',').toLowerCase().split(' ');
    createInterface.runCmd(oneCommand);
    this.prompt();
}

CliInterface.prototype.promptCli = function(){
    this.createCliInterface
        .on('line',onLineInput)
        .setPrompt('Store>');
    return this.createCliInterface;
}

