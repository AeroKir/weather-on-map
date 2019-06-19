import L from 'leaflet';
import SunCalc from 'suncalc';
import openStreetMap from './tile-layers';
import getData from '../data/get-data';
import {
  BASE_API_URL, APP_ID, GEO_API_URL, GEO_API_KEY,
} from '../constants';
import createPreviewMarker from './map-view-components/thumb-preview-marker';
import createPopup from './map-view-components/popup';
import toIntegerNumber from '../helper-functions/numbers';
import { getCurrentTime, convertTimeToMs } from '../helper-functions/get-date-time';
import hpaToMillimeterOfMercury from '../helper-functions/pressure-converter';

import '../leaflet.css';

function createMap(mapCenter) {
  const map = L.map('map', {
    center: mapCenter,
    zoom: 8,
    layers: [openStreetMap],
    animate: true,
    worldCopyJump: true,
  });

  function getMapBounds() {
    const boundsWest = map.getBounds().getWest();
    const boundsWestFloor = Math.floor(boundsWest);
    const boundsSouth = map.getBounds().getSouth();
    const boundsSouthFloor = Math.floor(boundsSouth);
    const boundsEast = map.getBounds().getEast();
    const boundsEastFloor = Math.floor(boundsEast);
    const boundsNorth = map.getBounds().getNorth();
    const boundsNorthFloor = Math.floor(boundsNorth);
    const boundsArr = [boundsWestFloor, boundsSouthFloor, boundsEastFloor, boundsNorthFloor];
    const boundsString = boundsArr.join(',');

    return boundsString;
  }

  const weatherData = getData(`${BASE_API_URL}box/city?bbox=${getMapBounds()},10&units=metric&lang=ua&${APP_ID}`)
    .then((data) => {
      const response = data.list;
      return response;
    })
    .then((response) => {
      response.forEach((element) => {
        const latitude = element.coord.Lat;
        const longitude = element.coord.Lon;
        const timeOfDataCalcUTC = element.dt;
        const times = SunCalc.getTimes(new Date(), latitude, longitude);
        const sunriseTimeInMs = convertTimeToMs(times.sunrise);
        const sunsetTimeInMs = convertTimeToMs(times.sunset);
        const sunriseTimeStr = `${times.sunrise.getHours()}:${times.sunrise.getMinutes()}`;
        const sunsetTimeStr = `${times.sunset.getHours()}:${times.sunset.getMinutes()}`;
        const isDayNow = !!((timeOfDataCalcUTC > sunriseTimeInMs && timeOfDataCalcUTC < sunsetTimeInMs));
        const position = new L.LatLng(element.coord.Lat, element.coord.Lon);
        const cityName = element.name;
        const currentTemp = element.main.temp;
        const pressure = element.main.pressure;
        const humidity = element.main.humidity;
        const weatherConditionId = element.weather[0].id;
        const iconAlt = element.weather[0].description;
        const windDirectionValue = element.wind.deg;
        const windSpeed = element.wind.speed;

        const previewMarker = createPreviewMarker(cityName, toIntegerNumber(currentTemp), weatherConditionId, isDayNow, iconAlt);
        const previewMarkerHtml = previewMarker.outerHTML;

        const iconPlace = L.divIcon({
          html: previewMarkerHtml,
          iconAnchor: [25, 65],
          popupAnchor: [-25, -50],
          className: 'custom-div-icon',
        });
        const previewIcons = L.marker(position, { icon: iconPlace }).addTo(map);

        // Popup from detailed information
        previewIcons.bindPopup(createPopup(
          cityName,
          toIntegerNumber(currentTemp),
          weatherConditionId,
          isDayNow,
          iconAlt,
          toIntegerNumber(windSpeed),
          toIntegerNumber(windDirectionValue),
          toIntegerNumber(humidity),
          hpaToMillimeterOfMercury(toIntegerNumber(pressure)),
          sunriseTimeStr,
          sunsetTimeStr,
        ));
      });
    });

  map.setView(mapCenter, 11);
  return map;
}

async function generateMapCenter() {
  try {
    const userLocation = await fetch(`${GEO_API_URL}?apiKey=${GEO_API_KEY}`);
    const dataObject = await userLocation.json();
    const userCoordinates = await new L.LatLng(dataObject.location.lat, dataObject.location.lng);
    const mapCenter = await createMap(userCoordinates);
    return mapCenter;
  } catch (error) {
    throw new Error(error);
  }
}

generateMapCenter();

export default createMap;
