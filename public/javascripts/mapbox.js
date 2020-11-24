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
	});
}