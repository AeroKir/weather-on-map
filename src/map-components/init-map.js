import L from 'leaflet';
import openStreetMap from './tile-layers';

import './weather-popup.css';
import './thumbnail-marker.css';

const map = L.map('map', {
  zoom: 13,
  layers: [openStreetMap],
  worldCopyJump: true,
});

// Set initial state of the Map
const fetchRequest = fetch('http://api.ipstack.com/check?access_key=ae0911201b26609e947dba212bfe8a9f')
  .then(coordinates => coordinates.json())
  .then((myJson) => {
    const userCoordinates = new L.LatLng(myJson.latitude, myJson.longitude);
    return userCoordinates;
  })
  .then((userCoordinates) => {
    map.setView(userCoordinates, 11);
  });

export default map;
