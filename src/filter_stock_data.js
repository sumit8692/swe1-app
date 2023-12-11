export default function filterStockData(data, companyName, timePeriod='5y') {

    if (!data.stocksData[0][companyName]) {
        throw new Error(`Company '${companyName}' not found in the stock data.`);
    }

    if (!data.stocksData[0][companyName][timePeriod]) {
        throw new Error(`Time period '${timePeriod}' not found for '${companyName}'.`);
    }
    
    const timestamps = data.stocksData[0][companyName][timePeriod].timeStamp;
    const values = data.stocksData[0][companyName][timePeriod].value;
    const dates = timestamps.map(timestamp => {
          const date = new Date(timestamp * 1000); 

          //converting timestamps to MM/DD/YYYY month
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); 
          const year = date.getFullYear();

          return `${day}/${month}/${year}`;
      }); 
    
    return { dates, values };

}