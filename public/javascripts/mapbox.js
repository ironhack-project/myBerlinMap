var userCoordinates = document.getElementById('userCoordinates');
const popup = new mapboxgl.Popup({ closeButton: true });
let map = null; // used for new map in the if statement (new url)

let berlinCenter = [13.4050, 52.5200]

mapboxgl.accessToken =
"pk.eyJ1IjoianVsaWFuYS1jYXJ1c28iLCJhIjoiY2tocWJvaGc0MHMwbDJ0cDU2cWJtd2NyNyJ9.IOr-Kg5Er1_7jZeLEIK0-A";

let bounds = [
	[13.067,52.383], // SW coordinates original: 13.263522,52.416737]
	[13.736,52.633] // NE coordinates original 13.492763,52.649208 
];

// clear the markers after the user moves the pin to other locations
let markers = [];

// checking URL to display maps
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
	axios.get('/rawdatarestaurantNames')
		.then(response => {
			console.log(response);
			let restaurantNames = response.data
			console.log(restaurantNames)
		});
	map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v11',
		center: berlinCenter,
		zoom: 9,
		doubleClickZoom: true,
		pitch: 30,
		maxBounds: bounds
	});
	
	var nav = new mapboxgl.NavigationControl(); // is this being used?
	map.addControl(nav, 'top-left'); // is this being used?
	
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
		//console.log(`"hello? Is it data?", ${data.target.getLngLat()}`);
		popup.addTo(map);
		popup.setLngLat(data.target.getLngLat());
		popup.setMaxWidth("40px");
		// if (data.target.getLngLat() === 
		//popup.setHTML(`<h3>location: ${data.target.getLngLat()} </h3>`);

		// clear the pins when the user drop it to another location
		markers.forEach(marker => {
			marker.remove();
		});
		// gettinf=g coordinates of dropped pin for api call
		const droppedPin = data.target.getLngLat();
		
		// adding text to our Div
		const listingsDiv = document.getElementById('listings');
		listingsDiv.innerHTML = "";

		// new api call getting the restaurants according to droppedPin range
		axios.get(`https://api.quandoo.com/v1/merchants?centerPoint=${droppedPin.lat}%2C%20${droppedPin.lng}&radius=1&capacity=2&offset=0&limit=15`)
    .then(response => {

			response.data.merchants.forEach((merchant) => {
					let newMarker = new mapboxgl.Marker({
						scale: 1,
						draggable: false,
						color: "green",
						rotation: 10,
					});
					newMarker.setLngLat([merchant.location.coordinates.longitude, merchant.location.coordinates.latitude]);
					newMarker.addTo(map);

					markers.push(newMarker);

					// adding text to our Div
					listingsDiv.innerHTML += `<a class="search-result-title" href="/restaurantDetails/${merchant.id}">${merchant.name}</a>`;
					listingsDiv.innerHTML += `<p>Restaurant score: ${merchant.reviewScore} / 6</p>`;

					const cuisines = merchant.tagGroups.find(tg => tg.type === 'CUISINE').tags.map((tag) => {
						return tag.name;
					});
					
					listingsDiv.innerHTML += "<p>";
					listingsDiv.innerHTML += '<span><strong>Cuisine:</strong> '
					cuisines.forEach((cuisine) => {
						listingsDiv.innerHTML += `<span>- ${cuisine} </span>`;
					});
					listingsDiv.innerHTML += '</span>';
				  listingsDiv.innerHTML += "</p>"
				});

    });

		map.jumpTo({
			center: data.target.getLngLat(),
			zoom: 15
		})

		
		// axios.get('/rawdataCoordinates')
		// 	.then(response => {
		// 		// console.log(restaurantList.name)
		// 		let coordinates = response.data
				
		// 		coordinates.forEach((location) => {
		// 	// console.log(location);
		// 	// https://docs.mapbox.com/mapbox-gl-js/api/markers/
		// 		let newMarker = new mapboxgl.Marker({
		// 			scale: 1,
		// 			draggable: false,
		// 			color: "purple",
		// 			rotation: 10,
		// 		});
		// 		newMarker.setLngLat(location);
		// 		newMarker.addTo(map);
		// 	});
		// });
// 		axios.get('/rawdatarestaurantNames')
// 		.then(response => {
// 			let restaurantNames = response.data
// 			// console.log(restaurantNames[0][0])
// 			buildLocationList(restaurantNames) //correct file needs to be added
// 		}); 

	});
}


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

// function buildLocationList(data) {

// 	data.forEach( (store, i) => {
// 		/**
// 		 * Create a shortcut for `store.properties`,
// 		 * which will be used several times below.
// 		 **/
// 		// var prop = store.properties; // use our DB strucutre 
// 		let restaurant = store

// 		/* Add a new listing section to the sidebar. */
// 		var listings = document.getElementById('listings');
// 		var listing = listings.appendChild(document.createElement('div'));
// 		/* Assign a unique `id` to the listing. */
// 		listing.id = "listing-" + restaurant[0][1];	
// 		/* Assign the `item` class to each listing for styling. */
// 		listing.className = 'item';

// 		/* Add the link to the individual listing created above. */
// 		var link = listing.appendChild(document.createElement('a'));
// 		link.href = '#';
// 		link.className = 'title';
// 		link.id = "link-" + prop.id;
// 		link.innerHTML = prop.address;

// 		// /* Add details to the individual listing. */
// 		// var details = listing.appendChild(document.createElement('div'));
// 		// details.innerHTML = prop.city;
// 		// if (prop.phone) {
// 		// details.innerHTML += ' · ' + prop.phoneFormatted;
// 		// }
// 	});
//     //for buildLocationList inserts, probably to be removed in favor of juliana's stuff above 
// 		// /* Add the link to the individual listing created above. */
// 		// var link = listing.appendChild(document.createElement('a'));
// 		// link.href = '#';
// 		// link.className = 'title';
// 		// link.id = "link-" + prop.id;
// 		// link.innerHTML = prop.address;

// 		/* Add details to the individual listing. */
// // 		var details = listing.appendChild(document.createElement('div'));
// // 		details.innerHTML =  'Name ' + restaurant[0];
// // 		// details.innerHTML += '';
// // 		});
// }
  