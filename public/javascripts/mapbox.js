// console.log the js file working

console.log("test");

// // add some arbitrary co ords
// let coords = [
// 	[15.32962, 48.2271],
// 	[7.749117, 46.020714],
// ];


mapboxgl.accessToken =
"pk.eyJ1IjoianVsaWFuYS1jYXJ1c28iLCJhIjoiY2tocWJvaGc0MHMwbDJ0cDU2cWJtd2NyNyJ9.IOr-Kg5Er1_7jZeLEIK0-A";
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.405, 52.52],
    zoom: 9,
    doubleClickZoom: true,
    pitch: 30,
});

// // demo adding a pop up
// const popup = new mapboxgl.Popup({ closeButton: true });
// popup.addTo(map);
// popup.setLngLat([13.405, 52.52]);
// popup.setMaxWidth("400px");
// popup.setHTML(
// 	`<h2>Click here for more info!</h2> <button>see the world</button>`
// );

// coords.forEach((location) => {
// 	console.log(location);
// 	// https://docs.mapbox.com/mapbox-gl-js/api/markers/
// 	let marker = new mapboxgl.Marker({
// 		scale: 1,
// 		draggable: true,
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
