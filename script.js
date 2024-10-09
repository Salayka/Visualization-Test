

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawScatterPlot);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawPieChart2);

function drawBarChart() {

    let locations= utility_data.map(
        function(item){
            var locAndSize = [item.BuildingName, parseInt(item.BuildingSizeSQFT)];
            return locAndSize;
        }
    );
    locations.unshift(['Building Name', 'Building Size']);
    const data = google.visualization.arrayToDataTable(locations);
    // Set Options
    const options = {
        title: 'Building Size at NYIT Campuses'
    };

    // Draw
    const chart = new google.visualization.BarChart(document.getElementById('barChart'));
    chart.draw(data, options);

}
function drawScatterPlot() {

    let locations= utility_data.map(
        function(item){
            var locAndSize = [ parseInt(item.BuildingSizeSQFT), parseFloat(item.TotalCost)];
            return locAndSize;
        }
    );
    locations.unshift(['Building Name', 'Building Size']);
    const data = google.visualization.arrayToDataTable(locations);
    // Set Options
    const options = {
        title: 'Size vs Cost'
    };

    // Draw
    const chart = new google.visualization.ScatterChart(document.getElementById('scatterPlot'));
    chart.draw(data, options);

}
function drawPieChart() {

    let locations= utility_data.map(
        function(item){
            var locAndSize = [ item.BuildingName, parseFloat(item.TotalConsumption)];
            return locAndSize;
        }
    );
    locations.unshift(['Building Name', 'Consumption']);
    const data = google.visualization.arrayToDataTable(locations);
    // Set Options
    const options = {
        title: 'Consumption by Building',
        is3D: true
    };

    // Draw
    const chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);

}
function drawPieChart2() {
    let tempData = summarizeConsumptionByCity(utility_data);
    const data = google.visualization.arrayToDataTable(tempData);
    // Set Options
    const options = {
        title: 'Consumption by City',
        is3D: true
    };

    // Draw
    const chart = new google.visualization.PieChart(document.getElementById('pieChart2'));
    chart.draw(data, options);

}
function summarizeConsumptionByCity(data) {
    const cityData = {};
  
    // Iterate over the array of JSON objects
    data.forEach(item => {
      const city = item.AddressCity;
      const consumption = item.TotalConsumption;
  
      // If the city is not in the cityData object, add it
      if (!cityData[city]) {
        cityData[city] = 0;
      }
  
      // Add the consumption to the city's total
      cityData[city] += parseFloat(consumption);
    });
  
    // Convert the cityData object to a 2D array
    const result = Object.entries(cityData).map(([city, totalConsumption]) => [city, totalConsumption]);
    result.unshift(['City', 'Consumption'])
    console.log(result);
    return result;
}
