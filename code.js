
var addOne = function(x) {
    return x+1;
}

var addTwo = function(x) {
    return x+3;
}

var addSix = function(x) {
    var temp1 = module.exports.addOne(x);
    var temp2 = module.exports.addTwo(temp1);

    return temp2+3;
}

module.exports = {addOne, addTwo, addSix}