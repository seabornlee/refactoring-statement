const PerformanceCalculator = require("./performanceCalculator")

module.exports = class TragedyCalculator extends PerformanceCalculator {
    constructor() {
        super();

    }

    getAmount(perf) {
        let result = 40000;
        if (perf.audience > 30) {
            result += 1000 * (perf.audience - 30);
        }
        return result;
    }

    getVolumeCredits(perf) {
        return super.getVolumeCredits(perf);
    }
}