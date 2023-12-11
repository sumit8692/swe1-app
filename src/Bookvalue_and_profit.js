export default function getBookValueAndProfit(stockSymbol, stocksStatsData) {
    const statsData = stocksStatsData.stocksStatsData[0];
    
    if (statsData.hasOwnProperty(stockSymbol)) {
      const { profit, bookValue } = statsData[stockSymbol];
      return { profit, bookValue};
    } else {
      return null; // Handle the case where the stock symbol is not found
    }
  }
  