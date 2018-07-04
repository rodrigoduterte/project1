var googleapikey = 'AIzaSyDPwb38SP1M558m3A-x3cLBBIYizuX0-so';
var googleTasksURL;
var googlePlacesURL;
var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'us'};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');


//ajax call goes here


// Create the autocomplete object and associate it with the UI input control.
// Restrict the search to the default country, and to place type "cities".
autocomplete = new google.maps.places.Autocomplete(
/** @type {!HTMLInputElement} */ (
    document.getElementById('autocomplete')), {
    types: ['(cities)'],
    componentRestrictions: countryRestrict
});
places = new google.maps.places.PlacesService(map);

autocomplete.addListener('place_changed', onPlaceChanged);