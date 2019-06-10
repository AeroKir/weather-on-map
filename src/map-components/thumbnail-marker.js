import L from 'leaflet';
import elementCreator from '../helper-functions/element-creator';

// import './thumbnail-marker.css';

const thumbnailPreviewMarker = elementCreator('div', 'thumbnail-preview-marker');

const thumbnailPlaceTitle = elementCreator('h2', 'thumbnail-place-title');
thumbnailPlaceTitle.innerText = 'Kharkiv';
thumbnailPreviewMarker.appendChild(thumbnailPlaceTitle);

const thumbnailWeatherConditionWrap = elementCreator('div', 'thumbnail-weather-condition-wrap');

const thumbnailTempSection = elementCreator('span', 'thumbnail-temp-section');
thumbnailTempSection.innerText = '+8';
thumbnailWeatherConditionWrap.appendChild(thumbnailTempSection);

const thumbnailCloudsIcon = elementCreator('img', 'thumbnail-clouds-img');
thumbnailCloudsIcon.src = require('./weather-icons/thunderstorm-with-light-rain.svg');

thumbnailCloudsIcon.alt = 'clouds';
thumbnailWeatherConditionWrap.appendChild(thumbnailCloudsIcon);

thumbnailPreviewMarker.appendChild(thumbnailWeatherConditionWrap);

const thumbnailDotPointer = elementCreator('div', 'thumbnail-dot-pointer');
thumbnailPreviewMarker.appendChild(thumbnailDotPointer);

const thumbnailPreviewMarkerHtml = thumbnailPreviewMarker.outerHTML;

const thumbnailMarker = L.divIcon({
  html: thumbnailPreviewMarkerHtml,
  className: 'custom-div-icon',
});

export default thumbnailMarker;
