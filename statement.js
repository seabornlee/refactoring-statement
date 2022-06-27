const createCalculator = require("./createCalculator")
const Invoice = require("./invoice")

function formatUSD(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function getPerformancesDetails(invoice, plays) {
  let details = "";
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    details += `  ${play.name}: ${formatUSD(createCalculator(play.type).getAmount(perf))} (${perf.audience} seats)\n`;
  }
  return details;
}

function statement(invoice, plays) {
  const invoiceInstance = new Invoice(invoice);
  let result = `Statement for ${invoiceInstance.customer}\n`;
  result += getPerformancesDetails(invoice, plays);
  result += `Amount owed is ${formatUSD(invoiceInstance.getTotalAmount(plays))}\n`;
  result += `You earned ${(invoiceInstance.getTotalVolumeCredits(plays))} credits\n`;
  return result;
}

module.exports = statement;
