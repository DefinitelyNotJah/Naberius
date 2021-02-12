function Store () {
    this.store = {
    	typing : false
    };
}

Store.prototype.set = function(node, v) {
    this.store[node] = v;
}

Store.prototype.get = function(node) {
    return this.store[node];
}

Store.prototype.has = function(node) {
    return this.store[node] !== undefined
}

module.exports = Store