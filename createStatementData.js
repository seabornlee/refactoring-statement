class PerformanceCalculator {
    constructor(aPerformance) {
        this.performance = aPerformance;
    }
}

function createStatementData(invoice, plays) {
    function enrichPerformance(aPerformance) {
        const play = playFor(result);

        const performanceCalculator = new PerformanceCalculator(aPerformance);
        const result = Object.assign({} , aPerformance)
        result.play = play;
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ('comedy' === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    function playFor(perf) {
        return plays[perf.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }

        return result;
    }

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }

    const statementDate = {};
    statementDate.customer = invoice.customer;
    statementDate.performances = invoice.performances.map(enrichPerformance);
    statementDate.totalAmount = totalAmount(statementDate);
    statementDate.totalVolumeCredits = totalVolumeCredits(statementDate);
    return statementDate;
}

module.exports = createStatementData;