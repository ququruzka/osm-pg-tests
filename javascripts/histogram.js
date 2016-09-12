function showHistogram()
{
	var geojsonFileName = window.location.href.split('?')[1];
	var histogramDate = geojsonFileName + '.geojson.csv';
	//histogramFile = 'almost.junctions.geojson.csv';
	
	var data = new google.visualization.DataTable();
	data.addColumn('datetime', 'X');
	data.addColumn('number', geojsonFileName);
	
	var xmlhttp1 = new XMLHttpRequest();
	xmlhttp1.open('GET', 'http://46.8.44.227/version?' + new Date().getTime(), false);
	xmlhttp1.send(null);
	
	var xmlhttp2 = new XMLHttpRequest();
	xmlhttp2.open('GET', 'http://46.8.44.227/' + histogramDate + '?' + Date.parse(xmlhttp1.responseText.replace(' ','T')), false);
	xmlhttp2.send(null);
	
	var csv = $.map($.csv.toArrays(xmlhttp2.responseText), function(line){
		return [[new Date(Date.parse(line[1].replace(' ','T'))), parseInt(line[2])]];
	});
	
	data.addRows(csv);

	var options = {
	        hAxis: {
	          title: 'Time'
	        },
	        vAxis: {
	          title: 'Errors count'
	        },
	        backgroundColor: '#f1f8e9',
		explorer: {
		  maxZoomOut:2,
		  keepInBounds: true
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}