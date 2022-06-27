const TragedyCalculator = require("./tragedyCalculator");
const ComedyCalculator = require("./comedyCalculator");

module.exports = function createCalculator(type) {
    let calculator;
    switch (type) {
        case 'tragedy':
            calculator = new TragedyCalculator();
            break;
        case 'comedy':
            calculator = new ComedyCalculator();
            break;
        default:
            throw new Error(`unknown type: ${type}`);
    }
    return calculator;
};