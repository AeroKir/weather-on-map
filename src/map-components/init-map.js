import L from 'leaflet';
import openStreetMap from './tile-layers';
import { GEO_API_URL, GEO_API_KEY } from '../constants';

import '../leaflet.css';

const map = L.map('map', {
  center: [48.153719, 24.822922],
  zoom: 13,
  layers: [openStreetMap],
  worldCopyJump: true,
});

// Set initial state of the Map
const fetchRequest = fetch(`${GEO_API_URL}?apiKey=${GEO_API_KEY}`)
  .then(coordinates => coordinates.json())
  .then((myJson) => {
    const userCoordinates = new L.LatLng(myJson.location.lat, myJson.location.lng);

    return userCoordinates;
  })
  .then((userCoordinates) => {
    map.setView(userCoordinates, 11);
  });

export default map;
