function getTragedyAmount(perf) {
  let result = 40000;
  if (perf.audience > 30) {
    result += 1000 * (perf.audience - 30);
  }
  return result;
}

function getComedyAmount(perf) {
  let result = 30000;
  if (perf.audience > 20) {
    result += 10000 + 500 * (perf.audience - 20);
  }
  result += 300 * perf.audience;
  return result;
}

function getTragedyVolumeCredits(perf) {
  return Math.max(perf.audience - 30, 0);
}

function getComedyVolumeCredits(perf) {
  return Math.max(perf.audience - 30, 0) + Math.floor(perf.audience / 5);
}

function formatUSD(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function getTotalVolumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    switch (play.type) {
      case 'tragedy':
        volumeCredits += getTragedyVolumeCredits(perf);
        break;
      case 'comedy':
        volumeCredits += getComedyVolumeCredits(perf);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
  }
  return volumeCredits;
}

function getTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = getTragedyAmount(perf);
        break;
      case 'comedy':
        thisAmount = getComedyAmount(perf);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    totalAmount += thisAmount;
  }
  return totalAmount;
}

function getPerformancesDetails(invoice, plays) {
  let details = "";
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = getTragedyAmount(perf);
        break;
      case 'comedy':
        thisAmount = getComedyAmount(perf);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    // print line for this order
    details += `  ${play.name}: ${formatUSD(thisAmount)} (${perf.audience} seats)\n`;
  }
  return details;
}

function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  result += getPerformancesDetails(invoice, plays);
  result += `Amount owed is ${formatUSD(getTotalAmount(invoice, plays))}\n`;
  result += `You earned ${(getTotalVolumeCredits(invoice, plays))} credits\n`;
  return result;
}

module.exports = statement;
