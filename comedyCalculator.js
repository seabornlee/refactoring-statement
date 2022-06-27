const PerformanceCalculator = require("./performanceCalculator")

module.exports = class ComedyCalculator extends PerformanceCalculator {
    getAmount(perf) {
        let result = 30000;
        if (perf.audience > 20) {
            result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        return result;
    }

    getVolumeCredits(perf) {
        return super.getVolumeCredits(perf) + Math.floor(perf.audience / 5);
    }
}