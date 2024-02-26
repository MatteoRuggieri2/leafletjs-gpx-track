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


// GPX Track
var gpx = '../assets/gpx-tracks/2023-09-26_1324761719_Gpx Valle dei Principi - Sito MonteRosaSki.gpx'; // URL to your GPX file or the GPX itself

// Esempio Documentazione
// new L.GPX(gpx, {
//     async: true,
// }).on('loaded', function(e) {
//   map.fitBounds(e.target.getBounds());
// }).addTo(map);

// Esempio di Chat GPT
new L.GPX(gpx, {
    async: true,
    polyline_options: {
        color: 'red',
        weight: 3,
        opacity: 0.7
    },
    marker_options: {
        startIconUrl: '../assets/icons/Start-Map-Marker-HeadPin-Green.512.png',
        endIconUrl: '../assets/icons/Start-Map-Marker-HeadPin-Red.512.png',
        shadowUrl: ''
    }
}).on('loaded', function (e) {
    map.fitBounds(e.target.getBounds());
}).addTo(map);