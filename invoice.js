const createCalculator = require("./createCalculator")
module.exports = class Invoice {
    constructor(props) {
        Object.assign(this, props);
    }

    getTotalAmount(plays) {
        let totalAmount = 0;
        for (let perf of this.performances) {
            const play = plays[perf.playID];
            totalAmount += createCalculator(play.type).getAmount(perf);
        }
        return totalAmount;
    }

    getTotalVolumeCredits(plays) {
        let volumeCredits = 0;
        for (let perf of this.performances) {
            const play = plays[perf.playID];
            volumeCredits += createCalculator(play.type).getVolumeCredits(perf);
        }
        return volumeCredits;
    }
};