function roundToDecimalPlaces(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

function getBookValueAndProfit(stockSymbol, stocksStatsData) {
  const statsData = stocksStatsData.stocksStatsData[0];
  
  if (statsData.hasOwnProperty(stockSymbol)) {
    const { profit, bookValue } = statsData[stockSymbol];
    return { profit, bookValue};
  } else {
    return null; // Handle the case where the stock symbol is not found
  }
}

function getSummaryFromStockProfileData(value, stockSummaryData){
    const summ = stockSummaryData.stocksProfileData[0];

    if (summ.hasOwnProperty(value)) {
      const  summary = summ[value].summary;
      return summary;
    } 
    return null;
}

document.addEventListener('DOMContentLoaded', async function () {
  console.log('DOM content has been fully loaded');

  let stockStatsData = {};
  let stockSummaryData = {};
  let stocksdata = {};

  // Fetching the summary of any stock data from the API
  const stocksStatsDataUrl = "https://stocks3.onrender.com/api/stocks/getstockstatsdata";
  const stocksSummaryDataUrl = 'https://stocks3.onrender.com/api/stocks/getstocksprofiledata';
  const stocksDataUrl = "https://stocks3.onrender.com/api/stocks/getstocksdata";

  try {
    const response_stats = await fetch(stocksStatsDataUrl);
    const response_summary = await fetch(stocksSummaryDataUrl);
    const response_stocksDataUrl = await fetch(stocksDataUrl);

    if (!response_stats.ok || !response_summary.ok || !response_stocksDataUrl.ok) {
      throw new Error(`HTTP error! Status: ${response_stats.status || response_summary.status || response_stocksDataUrl.status}`);
    }

    stockStatsData = await response_stats.json();
    stockSummaryData = await response_summary.json();
    stocksdata = await response_stocksDataUrl.json();

    console.log(stockStatsData);
    console.log(stockSummaryData);
    console.log(stocksdata);

    create_btns_stock_summ(stockStatsData);

  } catch (error) {
    console.error("Fetch error:", error);
  }

  function create_btns_stock_summ(data) {
    const stockKeys = Object.keys(data.stocksStatsData[0]);

    // Get the container where buttons will be added
    const container = document.querySelector(".stocks_list");

    // Create buttons for each key
    stockKeys.forEach(stockSymbol => {
      if (stockSymbol !== "_id") {
        const bookValue = data.stocksStatsData[0][stockSymbol].bookValue;
        const profit = data.stocksStatsData[0][stockSymbol].profit;

        // Create a div element with the class "list_i"
        const myDiv = document.createElement("div");
        myDiv.classList.add('list_i');

        // Create the button
        const button = document.createElement("button");
        button.textContent = `${stockSymbol}`;
        button.classList.add('aside_btn');
        button.value = stockSymbol;

        button.addEventListener('mouseenter', function () {
          // Change cursor to pointer on hover
          button.style.cursor = 'pointer';
        });
    
        button.addEventListener("click", function () {

          console.log(`Button for ${stockSymbol} clicked`);
          const h2inSummDiv = document.querySelector('.summary_heading');
          h2inSummDiv.textContent = button.value; 


          
          const {profit, bookValue} = getBookValueAndProfit(button.value, stockStatsData);
          
          (profit == 0? profit_in_summary.style.color = 'red': profit_in_summary.style.color = 'rgb(12, 86, 12')
          
          profit_in_summary.textContent = `${profit}%`;
          bookValue_in_summary.textContent = `$${bookValue}`;

          const summ = getSummaryFromStockProfileData(button.value, stockSummaryData);

          const SummDiv = document.querySelector('.summary');
          const paraInSumm = SummDiv.querySelector('p');
          paraInSumm.textContent = summ; 
          
        });

        // Append the button to the div
        myDiv.appendChild(button);

        // Create the first span element
        const span1 = document.createElement('span');
        span1.textContent = roundToDecimalPlaces(bookValue, 3);
        span1.classList.add('span_style');
        myDiv.appendChild(span1);

        // Create the second span element
        const span2 = document.createElement('span');
        span2.textContent = `${roundToDecimalPlaces(profit, 2)}%`;
        profit == 0 ? span2.style.color = 'red' : span2.style.color = '#54d67f';
        span2.classList.add('span_style');
        myDiv.appendChild(span2);

        // Append the div to the container
        container.appendChild(myDiv);
      }
    });


      const firstStockKey = Object.keys(stockSummaryData.stocksProfileData[0]);
      console.log(firstStockKey);

      const firstStockSymbol = firstStockKey[0];
      console.log(firstStockSymbol);

      const firstStockSummary = stockSummaryData.stocksProfileData[0][firstStockKey[0]].summary;
      console.log('Value of the first key:', firstStockSummary);

      const SummDiv = document.querySelector('.summary');
      const h2inSummDiv = document.querySelector('.summary_heading');
      h2inSummDiv.textContent = firstStockSymbol; // or firstStockSummary

      const summDivPara = document.createElement('p');
      summDivPara.textContent = firstStockSummary;
      SummDiv.appendChild(summDivPara);

      const profit_in_summary = document.querySelector('.profit_in_summary');
      const bookValue_in_summary = document.querySelector('.bookValue_in_summary');

      const {profit, bookValue} = getBookValueAndProfit(firstStockSymbol, stockStatsData);

      (profit == 0? profit_in_summary.style.color = 'red': profit_in_summary.style.color = 'rgb(12, 86, 12')

      profit_in_summary.textContent = `${profit}%`;
      bookValue_in_summary.textContent = `$${bookValue}`;


    }   
});