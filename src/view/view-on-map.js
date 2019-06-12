import L from 'leaflet';
import SunCalc from 'suncalc';
import map from '../map-components/init-map';
import getData from '../data/get-data';
import { BASE_API_URL, APP_ID } from '../constants';
import elementCreator from '../helper-functions/element-creator';
import checkWeatherCondition from '../helper-functions/check-weather-condition';
import toIntegerNumber from '../helper-functions/numbers';
import { getCurrentTime, convertTimeToMs } from '../helper-functions/get-date-time';
import hpaToMillimeterOfMercury from '../helper-functions/pressure-converter';

import '../map-components/thumbnail-marker.css';
import '../map-components/weather-popup.css';

const weatherView = getData(`${BASE_API_URL}box/city?bbox=32,47,39,50,10&units=metric&lang=ua&${APP_ID}`)
  .then((resp) => {
    console.log(resp.list);
    // eslint-disable-next-line no-shadow
    const response = resp.list;
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
      const thumbnailCloudsIconAlt = element.weather[0].description;
      const windDirectionValue = element.wind.deg;
      const windSpeed = element.wind.speed;

      const thumbnailPreviewMarker = elementCreator('div', 'thumbnail-preview-marker');
      const thumbnailPlaceTitle = elementCreator('h2', 'thumbnail-place-title');
      thumbnailPlaceTitle.innerText = cityName;
      thumbnailPreviewMarker.appendChild(thumbnailPlaceTitle);

      const thumbnailWeatherConditionWrap = elementCreator('div', 'thumbnail-weather-condition-wrap');

      const thumbnailTempSection = elementCreator('span', 'thumbnail-temp-section');
      if (currentTemp > 0) {
        thumbnailTempSection.innerText = `+${toIntegerNumber(currentTemp)}`;
      } else {
        thumbnailTempSection.innerText = `${toIntegerNumber(currentTemp)}`;
      }

      thumbnailWeatherConditionWrap.appendChild(thumbnailTempSection);

      const thumbnailCloudsIcon = elementCreator('img', 'thumbnail-clouds-img');
      thumbnailCloudsIcon.src = checkWeatherCondition(weatherConditionId, isDayNow, thumbnailCloudsIcon);
      thumbnailCloudsIcon.alt = thumbnailCloudsIconAlt;
      thumbnailCloudsIcon.title = thumbnailCloudsIconAlt;
      thumbnailWeatherConditionWrap.appendChild(thumbnailCloudsIcon);

      thumbnailPreviewMarker.appendChild(thumbnailWeatherConditionWrap);

      const thumbnailDotPointer = elementCreator('div', 'thumbnail-dot-pointer');
      thumbnailPreviewMarker.appendChild(thumbnailDotPointer);

      const thumbnailPreviewMarkerHtml = thumbnailPreviewMarker.outerHTML;

      const iconPlace = L.divIcon({
        html: thumbnailPreviewMarkerHtml,
        iconAnchor: [25, 65],
        popupAnchor: [-25, -50],
        className: 'custom-div-icon',
      });
      const previewIcons = L.marker(position, { icon: iconPlace }).addTo(map);

      // Popup from detailed information
      previewIcons.bindPopup(() => {
        const forecastContainer = elementCreator('div', 'popup-forecast-container');
        const nameOfPlace = elementCreator('h2', 'place-name-heading');
        nameOfPlace.innerText = cityName;
        forecastContainer.appendChild(nameOfPlace);

        const dateTime = elementCreator('div', 'date-section');
        dateTime.innerHTML = getCurrentTime();
        forecastContainer.appendChild(dateTime);

        // Create helper wrapper for two bloks in row
        const pairWrapper = elementCreator('div', 'pair-wrapper');
        const tempValue = elementCreator('figure', 'forecast-item temp-section');
        const tempIcon = elementCreator('img', 'popup-icon thermometer-icon');
        tempIcon.src = require('../map-components/weather-icons/celsius-seawave.svg');
        tempIcon.alt = 'Thermometer Celsius icon';
        const tempCaption = elementCreator('figcaption', 'caption temp-caption');
        if (currentTemp > 0) {
          tempCaption.innerText = `+${toIntegerNumber(currentTemp)}`;
        } else {
          tempCaption.innerText = `${toIntegerNumber(currentTemp)}`;
        }
        tempValue.appendChild(tempCaption);
        tempValue.insertBefore(tempIcon, tempValue.firstChild);
        pairWrapper.appendChild(tempValue);

        // clouds
        const cloudsValue = elementCreator('figure', 'forecast-item clouds-section');
        const cloudsIcon = elementCreator('img', 'popup-icon clouds-icon');

        cloudsIcon.src = checkWeatherCondition(weatherConditionId, isDayNow, cloudsIcon);
        cloudsIcon.alt = thumbnailCloudsIconAlt;
        const cloudsCaption = elementCreator('figcaption', 'caption clouds-caption');
        cloudsCaption.innerHTML = thumbnailCloudsIconAlt;
        cloudsValue.appendChild(cloudsCaption);
        cloudsValue.insertBefore(cloudsIcon, cloudsValue.firstChild);
        pairWrapper.appendChild(cloudsValue);

        forecastContainer.appendChild(pairWrapper);

        const pairWrapperTwo = elementCreator('div', 'pair-wrapper');
        const windValue = elementCreator('figure', 'forecast-item wind-section');
        const windIcon = elementCreator('img', 'popup-icon wind-icon');
        windIcon.src = require('../map-components/weather-icons/wind-gray.svg');
        windIcon.alt = 'Wind Icon';
        const windCaption = elementCreator('figcaption', 'caption wind-caption');
        windCaption.innerHTML = `${toIntegerNumber(windSpeed)} м/с`;
        windValue.appendChild(windCaption);
        windValue.insertBefore(windIcon, windValue.firstChild);
        pairWrapperTwo.appendChild(windValue);

        const windDirection = elementCreator('div', 'forecast-item wind-direction-section');
        const northLabel = elementCreator('span', 'world-side-label north-label');
        const eastLabel = elementCreator('span', 'world-side-label east-label');
        const southLabel = elementCreator('span', 'world-side-label south-label');
        const westLabel = elementCreator('span', 'world-side-label west-label');
        northLabel.innerHTML = 'С';
        eastLabel.innerHTML = 'В';
        southLabel.innerHTML = 'Ю';
        westLabel.innerHTML = 'З';
        windDirection.appendChild(northLabel);
        windDirection.appendChild(eastLabel);
        windDirection.appendChild(southLabel);
        windDirection.appendChild(westLabel);
        const windDirectionArea = elementCreator('div', 'wind-direction-area');
        windDirectionArea.style.transform = `rotate(${toIntegerNumber(windDirectionValue)}deg)`;
        const windDirectionArrow = elementCreator('div', 'wind-direction-arrow');
        const windValueIndex = elementCreator('span', 'wind-value-index');
        windValueIndex.innerHTML = `${toIntegerNumber(windDirectionValue)}&#176`;
        windValueIndex.style.transform = `rotate(-${toIntegerNumber(windDirectionValue)}deg)`;
        windDirectionArrow.innerHTML = '&#8595';
        windDirectionArrow.appendChild(windValueIndex);
        windDirectionArea.appendChild(windDirectionArrow);
        const calmStateIcon = elementCreator('img', 'calm-state-icon');
        calmStateIcon.src = require('../map-components/weather-icons/calm-icon.svg');
        calmStateIcon.alt = 'Calm icon';
        windDirectionArea.appendChild(calmStateIcon);
        if (toIntegerNumber(windSpeed) === 0) {
          calmStateIcon.style.display = 'block';
          windDirectionArrow.style.display = 'none';
        }
        windDirection.appendChild(windDirectionArea);
        pairWrapperTwo.appendChild(windDirection);
        forecastContainer.appendChild(pairWrapperTwo);

        const pairWrapperThree = elementCreator('div', 'pair-wrapper');
        const humidityValue = elementCreator('figure', 'forecast-item humidity-section');
        const humidityIcon = elementCreator('img', 'popup-icon humidity-icon');
        humidityIcon.src = require('../map-components/weather-icons/humidity.svg');
        humidityIcon.alt = 'Humidity icon';
        const humidityCaption = elementCreator('figcaption', 'caption humidity-caption');
        humidityCaption.innerHTML = `${toIntegerNumber(humidity)}%`;
        humidityValue.appendChild(humidityCaption);
        humidityValue.insertBefore(humidityIcon, humidityValue.firstChild);
        pairWrapperThree.appendChild(humidityValue);

        const pressureValue = elementCreator('figure', 'forecast-item pressure-section');
        const pressureIcon = elementCreator('img', 'popup-icon pressure-icon');
        pressureIcon.src = require('../map-components/weather-icons/barometer.svg');
        pressureIcon.alt = 'Pressure icon';
        const pressureCaption = elementCreator('figcaption', 'caption pressure-caption');
        pressureCaption.innerHTML = `${hpaToMillimeterOfMercury(`${toIntegerNumber(pressure)}`)} мм`;
        pressureValue.appendChild(pressureCaption);
        pressureValue.insertBefore(pressureIcon, pressureValue.firstChild);
        pairWrapperThree.appendChild(pressureValue);
        forecastContainer.appendChild(pairWrapperThree);

        const pairWrapperFour = elementCreator('div', 'pair-wrapper');
        const sunriseValue = elementCreator('figure', 'forecast-item sunrise-section');
        const sunriseIcon = elementCreator('img', 'popup-icon sunrise-icon');
        sunriseIcon.src = require('../map-components/weather-icons/sunrise.svg');
        sunriseIcon.alt = 'Sunrise icon';
        const sunriseCaption = elementCreator('figcaption', 'caption sunrise-caption');
        sunriseCaption.innerHTML = sunriseTimeStr;
        sunriseValue.appendChild(sunriseCaption);
        sunriseValue.insertBefore(sunriseIcon, sunriseValue.firstChild);
        pairWrapperFour.appendChild(sunriseValue);

        const sunsetValue = elementCreator('figure', 'forecast-item sunset-section');
        const sunsetIcon = elementCreator('img', 'popup-icon sunset-icon');
        sunsetIcon.src = require('../map-components/weather-icons/sunset.svg');
        sunsetIcon.alt = 'Sunrise icon';
        const sunsetCaption = elementCreator('figcaption', 'caption sunset-caption');
        sunsetCaption.innerHTML = sunsetTimeStr;
        sunsetValue.appendChild(sunsetCaption);
        sunsetValue.insertBefore(sunsetIcon, sunsetValue.firstChild);
        pairWrapperFour.appendChild(sunsetValue);
        forecastContainer.appendChild(pairWrapperFour);

        return forecastContainer;
      });
    });
  });


export default weatherView;
