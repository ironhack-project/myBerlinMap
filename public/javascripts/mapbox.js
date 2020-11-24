var userCoordinates = document.getElementById('userCoordinates');
const popup = new mapboxgl.Popup({ closeButton: true });

let map = null;
let berlinCenter = [13.4050, 52.5200]
mapboxgl.accessToken =
"pk.eyJ1IjoianVsaWFuYS1jYXJ1c28iLCJhIjoiY2tocWJvaGc0MHMwbDJ0cDU2cWJtd2NyNyJ9.IOr-Kg5Er1_7jZeLEIK0-A";

let bounds = [
	[13.067,52.383], // SW coordinates original: 13.263522,52.416737]
	[13.736,52.633] // NE coordinates original 13.492763,52.649208 
];

if (window.location.pathname === '/') {
	map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v11',
		center: berlinCenter,
		zoom: 9,
		doubleClickZoom: true,
		pitch: 30,
		maxBounds: bounds
	});
	
	var nav = new mapboxgl.NavigationControl();
	map.addControl(nav, 'top-left');

	axios.get('/rawdataCoordinates')
		.then(response => {
			let coordinates = response.data

			// console.log(response.data)

			coordinates.forEach((location) => {
				// console.log(location);
				// https://docs.mapbox.com/mapbox-gl-js/api/markers/
				let marker = new mapboxgl.Marker({
					scale: 1,
					draggable: false,
					color: "red",
					rotation: 10,
				});
				marker.setLngLat(location);
				marker.addTo(map);
			});
		});
				
} else if (window.location.pathname === '/search') {
	map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v11',
		center: berlinCenter,
		zoom: 9,
		doubleClickZoom: true,
		pitch: 30,
		maxBounds: bounds
	});
	
	var nav = new mapboxgl.NavigationControl();
	map.addControl(nav, 'top-left');
	
	let userMarker = new mapboxgl.Marker({
		scale: 1,
		draggable: true,
		color: "blue",
		rotation: 10
	})
	userMarker.setLngLat(berlinCenter)
	userMarker.addTo(map);

	zoomAndDisplayName(userMarker)
} //end else statement 

function zoomAndDisplayName (marker) {
	marker.on("dragend", (data) => {
		console.log(`"hello? Is it data?", ${data.target}`);
		popup.addTo(map);
		popup.setLngLat(data.target.getLngLat());
		popup.setMaxWidth("40px");
		// if (data.target.getLngLat() === 
		popup.setHTML(
			`<h3>location: ${data.target.getLngLat()} </h3>`)
		
		map.jumpTo({
			center: data.target.getLngLat(),
			zoom: 15
		})
		
		axios.get('/rawdataCoordinates')
			.then(response => {
				// console.log(restaurantList.name)
				let coordinates = response.data
				
				coordinates.forEach((location) => {
			// console.log(location);
			// https://docs.mapbox.com/mapbox-gl-js/api/markers/
				let newMarker = new mapboxgl.Marker({
					scale: 1,
					draggable: false,
					color: "purple",
					rotation: 10,
				});
				newMarker.setLngLat(location);
				newMarker.addTo(map);
			});
		});

		buildLocationList(restaurantList)
	});
}
// .features.forEach(function(restaurant, i){
	// 	restaurant.id = i;
	// });
// function compareCoordinates (markerLocation, restaurantLocation) {
// 	let restaurantLocationX =
// 	let restaurantLocationY =
// 	if (restaurantLocation.x > 10 && restaurantLocation.x < 20 && y > 10 && y < 20 ) {
// 		return true
// 	}
// }


// restaurantList.features.forEach(function(restaurant, i){
// 	restaurant.id = i;
// });

// map.on('load', function (e) {
// 	/* Add the data to your map as a layer */
// 	map.addLayer({
// 	  "id": "locations",
// 	  "type": "symbol",
// 	  /* Add a GeoJSON source containing place coordinates and information. */
// 	  "source": {
// 		"type": "geojson",
// 		"data": restaurantList
// 	  },
// 	  "layout": {
// 		"icon-image": "restaurant-15",
// 		"icon-allow-overlap": true,
// 	  }
// 	});
//   });

function buildLocationList(data) {
	data.features.forEach(function(store, i){
		/**
		 * Create a shortcut for `store.properties`,
		 * which will be used several times below.
		 **/
		var prop = store.properties;

		/* Add a new listing section to the sidebar. */
		var listings = document.getElementById('listings');
		var listing = listings.appendChild(document.createElement('div'));
		/* Assign a unique `id` to the listing. */
		listing.id = "listing-" + prop.id;
		/* Assign the `item` class to each listing for styling. */
		listing.className = 'item';

		/* Add the link to the individual listing created above. */
		var link = listing.appendChild(document.createElement('a'));
		link.href = '#';
		link.className = 'title';
		link.id = "link-" + prop.id;
		link.innerHTML = prop.address;

		// /* Add details to the individual listing. */
		// var details = listing.appendChild(document.createElement('div'));
		// details.innerHTML = prop.city;
		// if (prop.phone) {
		// details.innerHTML += ' · ' + prop.phoneFormatted;
		// }
	});
}
  