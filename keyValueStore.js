module.exports = StoreKeyValue;
function StoreKeyValue() {
    this.map = {};
}

StoreKeyValue.prototype.add = function(key, value){
    if(this.map[key]){
        console.log("ERROR: Key \'" + key + "\' already exists.")
        return;
    }
    this.map[key] = value;
};

StoreKeyValue.prototype.get = function(key){
    if(this.map[key])
        return this.map[key];
    else
        console.log("ERROR: Key \'" + key + "\' does not exist.");
};

StoreKeyValue.prototype.list = function(){
    console.log(this.map);
};

StoreKeyValue.prototype.remove = function(key){
    if(this.map[key])
        delete this.map[key];
    else
        console.log("ERROR: Key \'" + key + "\' does not exist.");
};