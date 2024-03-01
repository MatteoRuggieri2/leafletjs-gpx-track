// DOM Elements
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
let gpxDistance = 0; // Distanza (metri)
let gpxTotalTime = 0; // Tempo Totale di percorrenza
let gpxElevationMin = 0; // Altitudine min
let gpxElevationMax = 0; // Altitudine max
let gpxElevationGain = 0; // Dislivello cumulativo positivo


// GENERO LA TRACCIA GPX

// Esempio Documentazione
// new L.GPX(gpx, {
//     async: true,
// }).on('loaded', function(e) {
//   map.fitBounds(e.target.getBounds());
// }).addTo(map);

/* Esempio di Chat GPT
(a differenza di quello della documentazione questo ha anche le opzioni per lo stile della traccia e dei marker)
*/
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
    
    // Prendo i dati della traccia GPX e li assegno alle variabili.
    gpxName = e.target.get_name();
    gpxDistance = e.target.get_distance();
    gpxTotalTime = e.target.get_total_time();
    // const gpxTotalTime = e.target.get_duration_string(e.target.get_total_time(), true);
    gpxElevationMin = e.target.get_elevation_min();
    gpxElevationMax = e.target.get_elevation_max();
    gpxElevationGain = e.target.get_elevation_gain();

    writeDOM();

}).addTo(map);



/*---------------------
    FUNCTIONS
---------------------*/

/*
Questa funzione ha il compito di assegnare i valori
negli elementi del DOM.
*/
function writeDOM() {

    // Converto i dati

    // Distanza tot (da m a km 10,9)
    gpxDistance = parseFloat((gpxDistance / 1000).toFixed(1));


    // Tempo tot (da ms a ore 05:47)
    gpxTotalTime = msToTime(15782576);

    // Altitudine min (da float a int senza arrotond.)
    gpxElevationMin = parseInt(gpxElevationMin);

    // Altitudine max (da float a int senza arrotond.)


    // Dislivello complessivo (da float a int senza arrotond.)



    // Scrivo nel DOM
    gpxNameDOM.innerHTML = gpxName;
    gpxDistanceDOM.innerHTML = `${gpxDistance} (Km)`;
    gpxTotalTimeDOM.innerHTML = `${gpxTotalTime} (Ore)`;
    gpxElevationMinDOM.innerHTML = `${gpxElevationMin} (m)`;
    gpxElevationMaxDOM.innerHTML = `${gpxElevationMax} (m)`;
    gpxElevationGainDOM.innerHTML = `${gpxElevationGain} (m)`;
}

/*
Questa funzione ha il compito di convertire i millisecondi
nel formato [hh:mm]
*/
function msToTime(msDurata) {
    var millisecondi = parseInt((msDurata%1000)/100)
        , secondi = parseInt((msDurata/1000)%60)
        , minuti = parseInt((msDurata/(1000*60))%60)
        , ore = parseInt((msDurata/(1000*60*60))%24);

    ore = (ore < 10) ? "0" + ore : ore;
    minuti = (minuti < 10) ? "0" + minuti : minuti;
    secondi = (secondi < 10) ? "0" + secondi : secondi;

    return ore + ":" + minuti;
}