export default function createChartHandler() {
    let chart;
  
    function createChart(dates, values) {
      destroyChart(); // Call the destroyChart function before creating a new chart
  
    const ctx = document.getElementById('stockChart');
     chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          borderColor: '#54ff73',
          data: values,
          borderWidth: 1
        }]
      },
      options: { 
        elements: {
          point:{
              radius: 0
          }
      },
      
      scales: {
        x: { 
          grid:{
            display: false,
          },
          ticks:
            {
              display: false
            }
          },
          y: {
            grid: { 
              display: false,
            },
            ticks: 
                {
                  display: false
                }
          },
        },
        layout: {
          padding: {
            bottom: 50,
          },
        },
        maintainAspectRatio: true,
        responsiveness: true,
        legend: {
          display: false,
          position: 'bottom',
          usePointStyle: true,
          labels: {
            fontColor: "grey",
            usePointStyle: true,
          },
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: 'blue',
          },
          legend: {
            display: false
          }
        },
      },
    });
    console.log(chart);
}
  
    function destroyChart() {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    }
  
    // Return the public API of the module
    return {
      createChart,
      destroyChart
    };
  }

  