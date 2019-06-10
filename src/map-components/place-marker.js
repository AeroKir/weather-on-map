import L from 'leaflet';

const placeMarker = new L.Icon({
  iconUrl: require('./marker-icons/marker-common.svg'),
  iconSize: [30, 30],
});

export default placeMarker;
