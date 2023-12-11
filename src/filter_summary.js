export default function getSummaryFromStockProfileData(value, stockSummaryData){
      const summ = stockSummaryData.stocksProfileData[0];
  
      if (summ.hasOwnProperty(value)) {
        const  summary = summ[value].summary;
        return summary;
      } 
      return null;
  }