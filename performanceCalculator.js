/**
 *  @abstract
 */
module.exports = class PerformanceCalculator {
    /**
     *  @abstract
     */
    getAmount(perf) {
    }

    /**
     *  @abstract
     */
    getVolumeCredits(perf) {
        return Math.max(perf.audience - 30, 0);
    }
}