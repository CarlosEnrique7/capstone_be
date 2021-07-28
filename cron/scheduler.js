const cron = require("node-cron");
const Price = require("../models/price");
const apiCall = require("./apiCalls");

const symbols = ["BTC", "ETH", "ADA", "DOGE", "DOT", "XMR"];

module.exports = {
  coinRequestCrons: () => {
    cron.schedule("*/5 * * * * *", async () => {
      // every 5 seconds... change to 15 seconds after testing
      for (let i = 0; i < symbols.length; i++) {
        await apiCall.getCoinCurrentPrice(symbols[i]);
      }
    });
    cron.schedule("*/15 * * * *", async () => {
      // every 15th minute
      apiCall.getCoinDailyPriceHistory("BTC");
    });
    cron.schedule("0 */4 * * *", async () => {
      // every 4 hours
      apiCall.getCoinWeeklyPriceHistory("BTC");
    });
    cron.schedule("0 11 * * *", async () => {
      // once a day at 11 am
      apiCall.getCoinYearlyPriceHistory("BTC");
    });
  },
};
