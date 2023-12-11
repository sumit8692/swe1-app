  import roundToDecimalPlaces from './math.js'
  import filterStockData from './filter_stock_data.js';
  import fetchData from './fetchdata.js';
  import getBookValueAndProfit from './Bookvalue_and_profit.js'
  import getSummaryFromStockProfileData from './filter_summary.js';
  import  createChartHandler  from './chartHandler.js';
  const chartHandler = createChartHandler();

  let flag_for_company;

document.addEventListener('DOMContentLoaded', async function () {
  console.log('DOM content has been fully loaded');


  const stockStatsData = await fetchData("https://stocks3.onrender.com/api/stocks/getstockstatsdata");
  const stockSummaryData = await fetchData('https://stocks3.onrender.com/api/stocks/getstocksprofiledata');
  const stocksData = await fetchData("https://stocks3.onrender.com/api/stocks/getstocksdata")
  
  console.log(stockStatsData);
  console.log(stockSummaryData);
  console.log(stocksData);

  create_btns_stock_summ(stockStatsData);


 // Select all buttons inside elements with the class 'time_btns'
const buttons = document.querySelectorAll('.time_btns button');

// Iterate over each button in the NodeList
buttons.forEach(function (button) {
    // Add a click event listener to each button
    button.addEventListener('click', function () {
        // Get the value attribute of the clicked button (1mo, 3mo, 1y, 5y)
        let timePeriod = this.value;
        
        // Call the function to update chart data based on the selected time period
        console.log(flag_for_company);
        const {dates, values} = filterStockData(stocksData, flag_for_company, timePeriod);
        chartHandler.createChart(dates, values);
    });
});

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
          flag_for_company = stockSymbol;
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

          const {dates, values} = filterStockData(stocksData,button.value);
          chartHandler.createChart(dates, values);
          
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
      flag_for_company = firstStockSymbol;
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


      //checking whether filterStockData function is working or not
      const { dates, values } = filterStockData(stocksData, firstStockSymbol, '5y');

      chartHandler.createChart(dates, values);

    }   
});