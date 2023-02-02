import TaxCal from "./taxcalculator.js";
let taxCal = new TaxCal();
const DATA_COUNT = 30;
const labels = [];
const oldRegimeDatapoints = [];
const newRegimeDatapoints = [];
for (let i = 3; i < DATA_COUNT; i=i+0.5) {
  labels.push(i.toString()+'L');
  let gross = i * 100000;
  taxCal.setGross(gross);
  oldRegimeDatapoints.push(taxCal.getOldRegimeTax());
  newRegimeDatapoints.push(taxCal.getNewRegimeTax());
}

console.log(labels)
console.log(oldRegimeDatapoints)
console.log(newRegimeDatapoints)


const data = {
  labels: labels,
  datasets: [
    {
      label: 'Old Regime',
      data: oldRegimeDatapoints,
      borderWidth: 1,
      pointRadius:1,
      fill: false,
      tension: 0.4
    }, 
    {
        label: 'New Regime',
        data: newRegimeDatapoints,
        borderWidth: 1,
        pointRadius:1,
        fill: false,
        tension: 0.4
      }
  ]
};
const ctx = document.getElementById('myChart');    
new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Old tax regime vs New tax regime'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Gross Income'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Tax Payable'
          },
          ticks: {
            min: 0,
            stepSize: 50000,
          },
          beginAtZero: true
        }
      }
    },
  });




