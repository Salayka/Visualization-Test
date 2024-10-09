var data = csvJSON('data.csv');

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);



function csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

function drawChart() {

    // Set Data
    const data = google.visualization.arrayToDataTable([
        ['Contry', 'Mhl'],
        ['Italy', 55],
        ['France', 49],
        ['Spain', 44],
        ['USA', 24],
        ['Argentina', 15]
    ]);

    // Set Options
    const options = {
        title: 'World Wide Wine Production'
    };

    // Draw
    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);

}