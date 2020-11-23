// console.log the js file working

console.log('working');
mapboxgl.accessToken =
"pk.eyJ1IjoianVsaWFuYS1jYXJ1c28iLCJhIjoiY2tocWJvaGc0MHMwbDJ0cDU2cWJtd2NyNyJ9.IOr-Kg5Er1_7jZeLEIK0-A";
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.4050,52.5200],
    zoom: 9,
    doubleClickZoom: true,
    pitch: 30,
});











