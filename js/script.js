// Italy Center
const itaCenterLat = 42.6824;
const itaCenterLng = 12.7880;

// Genero la mappa (Italy Center)
var map = L.map('map', {
    center: [itaCenterLat, itaCenterLng],
    zoom: 5
});

// Tile Layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);