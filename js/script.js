const gpxNameDOM = document.getElementById('gpx-title');
const gpxDistanceDOM = document.getElementById('gpx-total-distance');
const gpxTotalTimeDOM = document.getElementById('gpx-total-time');
const gpxElevationMinDOM = document.getElementById('gpx-elevation-min');
const gpxElevationMaxDOM = document.getElementById('gpx-elevation-max');
const gpxElevationGainDOM = document.getElementById('gpx-elevation-gain');



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
const gpx = '../assets/gpx-tracks/2023-09-26_1324761719_Gpx Valle dei Principi - Sito MonteRosaSki.gpx'; // URL to your GPX file or the GPX itself
let gpxName = ''; // Nome
let gpxDistance = ''; // Distanza (metri)
let gpxTotalTime = ''; // Tempo Totale di percorrenza
let gpxElevationMin = ''; // Altitudine min
let gpxElevationMax = ''; // Altitudine max
let gpxElevationGain = ''; // Dislivello cumulativo positivo


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
    
    // Prendo i dati della traccia GPX e li assegno a delle variabili.
    const gpx_name = e.target.get_name();
    const gpx_distance = e.target.get_distance();
    const gpx_total_time = e.target.get_total_time();
    // const gpx_total_time_string = e.target.get_duration_string(e.target.get_total_time(), true);
    const gpx_elevation_min = e.target.get_elevation_min();
    const gpx_elevation_max = e.target.get_elevation_max();
    const gpx_elevation_gain = e.target.get_elevation_gain();

    // Chiamo la funzione per salvare i dati nelle variabili globali
    setGpxData(gpx_name, gpx_distance, gpx_total_time, gpx_elevation_min, gpx_elevation_max,gpx_elevation_gain)
    // gpxName = e.target.get_name();
    console.log('gpxName: ', gpxName)
    console.log('gpxDistance: ', gpxDistance)
    console.log('gpxTotalTime: ', gpxTotalTime)
    console.log('gpxElevationMin: ', gpxElevationMin)
    console.log('gpxElevationMax: ', gpxElevationMax)
    console.log('gpxElevationGain: ', gpxElevationGain)

}).addTo(map);



/*---------------------
    FUNCTIONS
---------------------*/

/*
Questa funzione ha il compito di salvare i dati
nelle variabili globali, in modo da essere usate ovunque.
*/
function setGpxData(name, distance, totalTime, elevationMin, elevationMax, elevationGain) {
    // console.log(gpxName);
    gpxName = name;
    gpxDistance = distance;
    gpxTotalTime = totalTime;
    gpxElevationMin = elevationMin;
    gpxElevationMax = elevationMax;
    gpxElevationGain = elevationGain;

    writeDOM();
}

/*
Questa funzione ha il compito di assegnare i valori
negli elementi del DOM.
*/
function writeDOM() {
    gpxNameDOM.innerHTML = gpxName;
    gpxDistanceDOM.innerHTML = `${gpxDistance} (m)`;
    gpxTotalTimeDOM.innerHTML = `${gpxTotalTime} (ms)`;
    gpxElevationMinDOM.innerHTML = `${gpxElevationMin} (m)`;
    gpxElevationMaxDOM.innerHTML = `${gpxElevationMax} (m)`;
    gpxElevationGainDOM.innerHTML = `${gpxElevationGain} (m)`;
}