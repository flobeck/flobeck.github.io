
var elevator;
var map;
var chart;
var polyline;
var locations = [];
var pathSamples = 256;

var urach = new google.maps.LatLng(48.496403, 9.394493);  // urach/tübingen is "huegelig"

// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

function initialize() {

	var mapOptions = {
		zoom: 10,
		center: urach,
		mapTypeId: 'terrain'
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// Create an ElevationService.
	elevator = new google.maps.ElevationService();
	google.maps.event.addListener(map, 'click', getLocations);
}


function drawPath() {

	// Create a new chart in the elevation_chart DIV.
	chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));

	// Create a PathElevationRequest object using this array.
	// Ask for 256 samples along that path.
	if(path.length > 1){
		var pathRequest = {
			'path': path,
			'samples': pathSamples
		}

		// Initiate the path request.
		elevator.getElevationAlongPath(pathRequest, plotElevation);
	}
}


function getLocations(event) {

	// Retrieve the clicked location and push it on the array
	var clickedLocation = event.latLng;
	locations.push(clickedLocation);

	new google.maps.Circle({
		strokeColor: '#FF0000',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: '#FF0000',
	    fillOpacity: 0.35,
	    map: map,
	    center: locations[locations.length-1],
	    radius: 150
	});


	// Create a LocationElevationRequest object using the array's one value
	var positionalRequest = {
		'locations': locations
	}

	// Initiate the location request
	elevator.getElevationForLocations(positionalRequest, function(results, status) {
		if (status == google.maps.ElevationStatus.OK) {

			// Retrieve the first result
			if (results[0]) {

				path.push(clickedLocation);
				drawPath();
			}

			else {
				alert("No results found");
			}
		} else {
			alert("Elevation service failed due to: " + status);
		}
	});
}

var pathSegments = 0;
var path = [];

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(results, status) {
	if (status != google.maps.ElevationStatus.OK) {
		return;
	}
	var elevations = results;
	pathSegments += 1
		var elevationPath = [];
	var audio = [];
	// Extract the elevation samples from the returned results
	// and store them in an array of LatLngs.
	for (var i = 0; i < results.length; i++) {
		elevationPath.push(elevations[i].location);
	}

	// Display a polyline of the elevation path.
	var pathOptions = {
		path: elevationPath,
		strokeColor: '#0000CC',
		opacity: 0.1,
		map: map
	}
	polyline = new google.maps.Polyline(pathOptions);

	// Extract the data from which to populate the chart.
	// Because the samples are equidistant, the 'Sample'
	// column here does double duty as distance along the
	// X axis.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Sample');
	data.addColumn('number', 'Elevation');

	for (var i = 0; i < results.length; i++) {
		data.addRow(['', elevations[i].elevation]);
	}

	for(var j = 0; j < 256; j+=5){
		audio.push(Math.floor(elevations[j].elevation) % 8800);
		//console.log(audio[j]);
	}

	elevationSound(audio).play();

	// Draw the chart
	document.getElementById('elevation_chart').style.display = 'block';
	chart.draw(data, {
		height: 100,
		legend: 'none',
		titleY: 'Elevation (m)'
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
