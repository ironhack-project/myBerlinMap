// const express = require('express');
// const router  = express.Router();
// const axios = require('axios'); 
// let coordinates = []

axios.get('/rawdata')
	.then(response => {
		let coordinates = response.data

			console.log(response.data)

			coordinates.forEach((location) => {
				console.log(location);
				// https://docs.mapbox.com/mapbox-gl-js/api/markers/
				let marker = new mapboxgl.Marker({
					scale: 1,
					draggable: false,
					color: "red",
					rotation: 10,
				});
				marker.setLngLat(location);
				marker.addTo(map);
				// first do the console.log and then do the rest of the stuff
				marker.on("dragend", (data) => {
					console.log("hello? Is it data?", data.target.getLngLat());
					popup.addTo(map);
					popup.setLngLat(data.target.getLngLat());
					popup.setMaxWidth("400px");
					popup.setHTML(
						`<h2>What a location</h2> <h3>location: ${data.target.getLngLat()} </h3>`
					);
				});
			});
			
});

// console.log("test");
// console.log(`mapbox.js's ${{coordinates}}`)

// add some arbitrary co ords
// let coords = [
// 		[ 13.410951, 52.539464 ], [ 13.29777, 52.505364 ],  [ 13.418632, 52.534887 ],
// 		[ 13.420547, 52.496676 ], [ 13.29572, 52.51663 ],   [ 13.397443, 52.528799 ],
// 		[ 13.38517, 52.45314 ],   [ 13.452179, 52.49744 ],  [ 13.300513, 52.505164 ],
// 		[ 13.394119, 52.513373 ], [ 13.409586, 52.502691 ], [ 13.436418, 52.498052 ],
// 		[ 13.385649, 52.527153 ], [ 13.416609, 52.535592 ], [ 13.410528, 52.52979 ],
// 		[ 13.3855, 52.52134 ],    [ 13.457791, 52.509642 ], [ 13.29807, 52.4987 ],
// 		[ 13.401615, 52.530613 ], [ 13.329173, 52.505502 ], [ 13.325465, 52.501219 ],
// 		[ 13.419547, 52.534851 ], [ 13.41446, 52.494816 ],  [ 13.364465, 52.522573 ],
// 		[ 13.379918, 52.522367 ], [ 13.293513, 52.497305 ], [ 13.323462, 52.505399 ],
// 		[ 13.418933, 52.538434 ], [ 13.402773, 52.531185 ], [ 13.393876, 52.492027 ],
// 		[ 13.42168, 52.53889 ],   [ 13.297107, 52.498396 ], [ 13.377029, 52.506364 ],
// 		[ 13.32513, 52.497849 ],  [ 13.386182, 52.524606 ], [ 13.459963, 52.509199 ],
// 		[ 13.323969, 52.498028 ], [ 13.418084, 52.536285 ], [ 13.341323, 52.502159 ],
// 		[ 13.460597, 52.5113 ],   [ 13.319858, 52.505546 ], [ 13.338774, 52.502366 ],
// 		[ 13.417265, 52.543118 ], [ 13.29759, 52.464495 ],  [ 13.417479, 52.543979 ],
// 		[ 13.409105, 52.538316 ], [ 13.384646, 52.529524 ], [ 13.356704, 52.486168 ],
// 		[ 13.40434, 52.52095 ],   [ 13.46383, 52.511091 ],  [ 13.390273, 52.515841 ],
// 		[ 13.394785, 52.518812 ], [ 13.326776, 52.508356 ], [ 13.3872, 52.49776 ],
// 		[ 13.319367, 52.529845 ], [ 13.420798, 52.503115 ], [ 13.431505, 52.530489 ],
// 		[ 13.441152, 52.477331 ], [ 13.298677, 52.498684 ], [ 13.381789, 52.51458 ],
// 		[ 13.30639, 52.51368 ],   [ 13.5192, 52.56688 ],    [ 13.288208, 52.457901 ],
// 		[ 13.399262, 52.524178 ], [ 13.46079, 52.43162 ],   [ 13.37281, 52.50813 ],
// 		[ 13.416141, 52.540008 ], [ 13.34559, 52.52044 ],   [ 13.373918, 52.458294 ],
// 		[ 13.3135, 52.496973 ],   [ 13.41967, 52.54616 ],   [ 13.319311, 52.503105 ],
// 		[ 13.421916, 52.543514 ], [ 13.417544, 52.537519 ], [ 13.372821, 52.508114 ],
// 		[ 13.26818, 52.50875 ],   [ 13.322157, 52.497975 ], [ 13.348328, 52.521886 ],
// 		[ 13.390351, 52.506259 ], [ 13.319773, 52.489442 ], [ 13.384362, 52.55112 ],
// 		[ 13.3292, 52.48728 ],    [ 13.322965, 52.508753 ], [ 13.32017, 52.50318 ],
// 		[ 13.38975, 52.49316 ],   [ 13.392896, 52.488549 ], [ 13.34235, 52.5043 ],
// 		[ 13.386375, 52.523859 ], [ 13.39687, 52.44752 ],   [ 13.484711, 52.615109 ],
// 		[ 13.330955, 52.562569 ], [ 13.296176, 52.506415 ], [ 13.44333, 52.49927 ],
// 		[ 13.431434, 52.48761 ],  [ 13.39265, 52.42589 ],   [ 13.355665, 52.497091 ],
// 		[ 13.458257, 52.512533 ], [ 13.293717, 52.510537 ], [ 13.388136, 52.526007 ],
// 		[ 13.203506, 52.434346 ]
// ];

mapboxgl.accessToken =
"pk.eyJ1IjoianVsaWFuYS1jYXJ1c28iLCJhIjoiY2tocWJvaGc0MHMwbDJ0cDU2cWJtd2NyNyJ9.IOr-Kg5Er1_7jZeLEIK0-A";
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.4050, 52.5200],
    zoom: 9,
    doubleClickZoom: true,
    pitch: 30,
});

// demo adding a pop up
const popup = new mapboxgl.Popup({ closeButton: true });
popup.addTo(map);
popup.setLngLat([13.405, 52.52]);
popup.setMaxWidth("400px");
popup.setHTML(
	`<h2>Click here for more info!</h2> <button>see the world</button>`
);

// coordinates.forEach((location) => {
// 	console.log(location);
// 	// https://docs.mapbox.com/mapbox-gl-js/api/markers/
// 	let marker = new mapboxgl.Marker({
// 		scale: 1,
// 		draggable: false,
// 		color: "red",
// 		rotation: 10,
// 	});
// 	marker.setLngLat(location);
// 	marker.addTo(map);
// 	// first do the console.log and then do the rest of the stuff
// 	marker.on("dragend", (data) => {
// 		console.log("hello? Is it data?", data.target.getLngLat());
// 		popup.addTo(map);
// 		popup.setLngLat(data.target.getLngLat());
// 		popup.setMaxWidth("400px");
// 		popup.setHTML(
// 			`<h2>What a location</h2> <h3>location: ${data.target.getLngLat()} </h3>`
// 		);
// 	});
// });



// const coordinates = response.data.merchants.map((merchant) => {
// 	return {
// 		[
// 			Number(merchant.location.coordinates.longitude),Number(erchant.location.coordinates.latitude)
// 		]
// 	// lon: merchant.location.coordinates.longitude,
// 	// lat: merchant.location.coordinates.latitude
// 	}
// 	});
	
// 	console.log(coordinates); 
