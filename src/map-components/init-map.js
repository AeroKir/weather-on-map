import L from 'leaflet';
import openStreetMap from './tile-layers';
import placeMarker from './place-marker';
import thumbnailMarker from './thumbnail-marker';
// import dataHandler from '../api-components/data-handler';
// import weatherPopup from './weather-popup';
import getUserInput from './input-handler';

import elementCreator from '../helper-functions/element-creator';
import { getCurrentTime, getCurrentTimeInMs, getDayOfWeek } from '../helper-functions/get-date-time';
import hpaToMillimeterOfMercury from '../helper-functions/pressure-converter';
import toIntegerNumber from '../helper-functions/numbers';

import './weather-popup.css';
import './thumbnail-marker.css';

const map = L.map('map', {
  center: [48.153719, 24.822922],
  zoom: 13,
  layers: [openStreetMap],
});

const centerUkraine = L.marker([48.153719, 24.822922], {
  icon: thumbnailMarker,
}).addTo(map);

// const centerUkraine = L.marker([48.153719, 24.822922], { icon: placeMarker }).addTo(map);
centerUkraine.bindPopup(() => {
  const forecastContainer = elementCreator('div', 'popup-forecast-container');

  // Get forecast data from server
  function getData(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      function getJSON() {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      }

      request.onload = getJSON;

      function errorHandler() {
        reject(new Error('Network Error'));
      }
      request.onerror = errorHandler;

      request.send();
    });
  }

  // Handler for response data
  function dataHandler(response) {
    const nameOfPlace = elementCreator('h2', 'place-name-heading');
    nameOfPlace.innerHTML = `${response.name}`;
    forecastContainer.appendChild(nameOfPlace);

    const dateTime = elementCreator('div', 'date-section');
    dateTime.innerHTML = getCurrentTime();
    forecastContainer.appendChild(dateTime);

    // Create helper wrapper for two bloks in row
    const pairWrapper = elementCreator('div', 'pair-wrapper');
    const tempValue = elementCreator('figure', 'forecast-item temp-section');
    const tempIcon = elementCreator('img', 'popup-icon thermometer-icon');
    tempIcon.src = require('./weather-icons/celsius-seawave.svg');
    tempIcon.alt = 'Thermometer Celsius icon';
    const tempCaption = elementCreator('figcaption', 'caption temp-caption');
    // eslint-disable-next-line no-unused-expressions
    (response.main.temp > 0) ? tempCaption.innerHTML = `+${toIntegerNumber(response.main.temp)}` : tempCaption.innerHTML = `${toIntegerNumber(response.main.temp)}`;
    // if (response.main.temp > 0) {
    //   tempCaption.innerHTML = `Температура +${response.main.temp}`;
    // } else if (response.main.temp === 0) {
    //   tempCaption.innerHTML = `Температура ${response.main.temp}`;
    // } else {
    //   tempCaption.innerHTML = `Температура -${response.main.temp}`;
    // }
    tempValue.appendChild(tempCaption);
    tempValue.insertBefore(tempIcon, tempValue.firstChild);
    pairWrapper.appendChild(tempValue);

    const cloudsValue = elementCreator('figure', 'forecast-item clouds-section');
    const cloudsIcon = elementCreator('img', 'popup-icon clouds-icon');

    /**
     * Storing weather conditions and sunrise/sunset/current time
     */
    const weatherConditionId = response.weather[0].id;
    const sunriseTime = response.sys.sunrise;
    const sunsetTime = response.sys.sunset;
    const currentTime = getCurrentTimeInMs();

    /**
     * Check Times of Day
     * Use "!!" operator for checking on time of day (condition ? true : false)
     * See details on https://github.com/airbnb/javascript#comparison--unneeded-ternary
     * See also https://eslint.org/docs/rules/no-unneeded-ternary.html
     */
    const isDayNow = !!((currentTime > sunriseTime && currentTime < sunsetTime));

    /**
     * Displayed different icons depending for weather conditions
     * See details on https://openweathermap.org/weather-conditions
     */

    // Group 2xx: Thunderstorm
    if (
      weatherConditionId === 200
    || weatherConditionId === 201
    ) {
      cloudsIcon.src = require('./weather-icons/thunderstorm-with-light-rain.svg');
    }

    if (weatherConditionId === 202) {
      cloudsIcon.src = require('./weather-icons/thunderstorm-with-heavy-rain-v1.svg');
    }

    if (
      weatherConditionId === 210
    || weatherConditionId === 211
    ) {
      cloudsIcon.src = require('./weather-icons/thunderstorm-light.svg');
    }

    if (
      weatherConditionId === 212
    || weatherConditionId === 221
    ) {
      cloudsIcon.src = require('./weather-icons/thunderstorm-heavy.svg');
    }

    if (
      weatherConditionId === 230
    || weatherConditionId === 231
    || weatherConditionId === 232
    ) {
      cloudsIcon.src = require('./weather-icons/thunderstorm-with-drizzle.svg');
    }

    // Group 3xx: Drizzle
    if (
      weatherConditionId === 300
    || weatherConditionId === 301
    || weatherConditionId === 302
    || weatherConditionId === 310
    || weatherConditionId === 311
    || weatherConditionId === 312
    || weatherConditionId === 313
    || weatherConditionId === 314
    || weatherConditionId === 321
    ) {
      cloudsIcon.src = require('./weather-icons/drizzle.svg');
    }

    // Group 5xx: Rain
    if (
      (weatherConditionId === 500 || weatherConditionId === 501)
    && isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/light-rain-day.svg');
    }

    if (
      (weatherConditionId === 500 || weatherConditionId === 501)
    && !isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/light-rain-night.svg');
    }

    if (
      (weatherConditionId === 502 || weatherConditionId === 503 || weatherConditionId === 504)
    && isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/heavy-rain-day.svg');
    }

    if (
      (weatherConditionId === 502 || weatherConditionId === 503 || weatherConditionId === 504)
    && !isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/heavy-rain-night.svg');
    }

    if (weatherConditionId === 511) {
      cloudsIcon.src = require('./weather-icons/freezing-rain.svg');
    }

    if (
      weatherConditionId === 520
    || weatherConditionId === 521
    || weatherConditionId === 522
    || weatherConditionId === 531
    ) {
      cloudsIcon.src = require('./weather-icons/heavy-shower-rain.svg');
    }

    // Group 6xx: Snow
    if (
      weatherConditionId === 600
    || weatherConditionId === 601
    || weatherConditionId === 602
    ) {
      cloudsIcon.src = require('./weather-icons/snow.svg');
    }

    if (
      weatherConditionId === 611
    || weatherConditionId === 612
    || weatherConditionId === 615
    || weatherConditionId === 616
    ) {
      cloudsIcon.src = require('./weather-icons/rain-and-snow.svg');
    }

    if (
      weatherConditionId === 620
    || weatherConditionId === 621
    || weatherConditionId === 622
    ) {
      cloudsIcon.src = require('./weather-icons/shower-snow.svg');
    }

    // Group 7xx: Atmosphere
    if (
      weatherConditionId === 701
    || weatherConditionId === 711
    || weatherConditionId === 721
    || weatherConditionId === 731
    || weatherConditionId === 741
    || weatherConditionId === 751
    || weatherConditionId === 761
    || weatherConditionId === 762
    ) {
      cloudsIcon.src = require('./weather-icons/mist.svg');
    }

    if (weatherConditionId === 771) {
      cloudsIcon.src = require('./weather-icons/squalls.svg');
    }

    if (weatherConditionId === 781) {
      cloudsIcon.src = require('./weather-icons/tornado-v1.svg');
    }

    // Group 800: Clear
    if (
      (weatherConditionId === 800)
    && isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/sun-clear.svg');
    }

    if (
      (weatherConditionId === 800)
    && !isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/moon.svg');
    }

    // Group 80x: Clouds
    if (
      (weatherConditionId === 801)
    && isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/cloud-with-sun.svg');
    }

    if (
      (weatherConditionId === 801)
    && !isDayNow
    ) {
      cloudsIcon.src = require('./weather-icons/cloud-with-moon-night.svg');
    }

    if (weatherConditionId === 802) {
      cloudsIcon.src = require('./weather-icons/scattered-clouds.svg');
    }

    if (
      weatherConditionId === 803
    || weatherConditionId === 804
    ) {
      cloudsIcon.src = require('./weather-icons/overcast-clouds-v2.svg');
    }


    cloudsIcon.alt = `${response.weather[0].description}`;
    const cloudsCaption = elementCreator('figcaption', 'caption clouds-caption');
    cloudsCaption.innerHTML = `${response.weather[0].description}`;
    cloudsValue.appendChild(cloudsCaption);
    cloudsValue.insertBefore(cloudsIcon, cloudsValue.firstChild);
    pairWrapper.appendChild(cloudsValue);

    forecastContainer.appendChild(pairWrapper);

    const pairWrapperTwo = elementCreator('div', 'pair-wrapper');
    const windValue = elementCreator('figure', 'forecast-item wind-section');
    const windIcon = elementCreator('img', 'popup-icon wind-icon');
    windIcon.src = require('./weather-icons/wind-gray.svg');
    windIcon.alt = 'Wind Icon';
    const windCaption = elementCreator('figcaption', 'caption wind-caption');
    windCaption.innerHTML = `${toIntegerNumber(response.wind.speed)} м/с`;
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
    windDirectionArea.style.transform = `rotate(${toIntegerNumber(response.wind.deg)}deg)`;
    const windDirectionArrow = elementCreator('div', 'wind-direction-arrow');
    const windValueIndex = elementCreator('span', 'wind-value-index');
    windValueIndex.innerHTML = `${toIntegerNumber(response.wind.deg)}&#176`;
    windValueIndex.style.transform = `rotate(-${toIntegerNumber(response.wind.deg)}deg)`;
    windDirectionArrow.innerHTML = '&#8595';
    windDirectionArrow.appendChild(windValueIndex);
    windDirectionArea.appendChild(windDirectionArrow);
    const calmStateIcon = elementCreator('img', 'calm-state-icon');
    calmStateIcon.src = require('./weather-icons/calm-icon.svg');
    calmStateIcon.alt = 'Calm icon';
    windDirectionArea.appendChild(calmStateIcon);
    if (toIntegerNumber(response.wind.speed) === 0) {
      calmStateIcon.style.display = 'block';
      windDirectionArrow.style.display = 'none';
    }
    windDirection.appendChild(windDirectionArea);
    pairWrapperTwo.appendChild(windDirection);
    forecastContainer.appendChild(pairWrapperTwo);

    const pairWrapperThree = elementCreator('div', 'pair-wrapper');
    const humidityValue = elementCreator('figure', 'forecast-item humidity-section');
    const humidityIcon = elementCreator('img', 'popup-icon humidity-icon');
    humidityIcon.src = require('./weather-icons/humidity.svg');
    humidityIcon.alt = 'Humidity icon';
    const humidityCaption = elementCreator('figcaption', 'caption humidity-caption');
    humidityCaption.innerHTML = `${toIntegerNumber(response.main.humidity)}%`;
    humidityValue.appendChild(humidityCaption);
    humidityValue.insertBefore(humidityIcon, humidityValue.firstChild);
    pairWrapperThree.appendChild(humidityValue);

    const pressureValue = elementCreator('figure', 'forecast-item pressure-section');
    const pressureIcon = elementCreator('img', 'popup-icon pressure-icon');
    pressureIcon.src = require('./weather-icons/barometer.svg');
    pressureIcon.alt = 'Pressure icon';
    const pressureCaption = elementCreator('figcaption', 'caption pressure-caption');
    pressureCaption.innerHTML = `${hpaToMillimeterOfMercury(`${toIntegerNumber(response.main.pressure)}`)} мм`;
    pressureValue.appendChild(pressureCaption);
    pressureValue.insertBefore(pressureIcon, pressureValue.firstChild);
    pairWrapperThree.appendChild(pressureValue);
    forecastContainer.appendChild(pairWrapperThree);

    const pairWrapperFour = elementCreator('div', 'pair-wrapper');
    const sunriseValue = elementCreator('figure', 'forecast-item sunrise-section');
    const sunriseIcon = elementCreator('img', 'popup-icon sunrise-icon');
    sunriseIcon.src = require('./weather-icons/sunrise.svg');
    sunriseIcon.alt = 'Sunrise icon';
    const sunriseCaption = elementCreator('figcaption', 'caption sunrise-caption');
    sunriseCaption.innerHTML = `${new Date(response.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
    sunriseValue.appendChild(sunriseCaption);
    sunriseValue.insertBefore(sunriseIcon, sunriseValue.firstChild);
    pairWrapperFour.appendChild(sunriseValue);

    const sunsetValue = elementCreator('figure', 'forecast-item sunset-section');
    const sunsetIcon = elementCreator('img', 'popup-icon sunset-icon');
    sunsetIcon.src = require('./weather-icons/sunset.svg');
    sunsetIcon.alt = 'Sunrise icon';
    const sunsetCaption = elementCreator('figcaption', 'caption sunset-caption');
    sunsetCaption.innerHTML = `${new Date(response.sys.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
    sunsetValue.appendChild(sunsetCaption);
    sunsetValue.insertBefore(sunsetIcon, sunsetValue.firstChild);
    pairWrapperFour.appendChild(sunsetValue);
    forecastContainer.appendChild(pairWrapperFour);

    // Maybe include this block later
    // const visibilityValue = document.createElement('figure');
    // visibilityValue.innerHTML = `Видимость ${response.visibility} м`;
    // forecastContainer.appendChild(visibilityValue);

    // Forecast for 5 days section
    const forecastNavSection = elementCreator('div', 'forecast-nav-section');
    const forecastNavButtonOne = elementCreator('button', 'forecast-nav-button');
    const forecastNavButtonTwo = elementCreator('button', 'forecast-nav-button');
    const forecastNavButtonThree = elementCreator('button', 'forecast-nav-button');
    const forecastNavButtonFour = elementCreator('button', 'forecast-nav-button');
    const forecastNavButtonFive = elementCreator('button', 'forecast-nav-button');
    forecastNavButtonOne.innerHTML = 'Sun';
    forecastNavButtonTwo.innerHTML = 'Mon';
    forecastNavButtonThree.innerHTML = 'Tue';
    forecastNavButtonFour.innerHTML = 'Wed';
    forecastNavButtonFive.innerHTML = 'Thu';
    forecastNavSection.appendChild(forecastNavButtonOne);
    forecastNavSection.appendChild(forecastNavButtonTwo);
    forecastNavSection.appendChild(forecastNavButtonThree);
    forecastNavSection.appendChild(forecastNavButtonFour);
    forecastNavSection.appendChild(forecastNavButtonFive);
    forecastContainer.appendChild(forecastNavSection);
  }


  const city = getUserInput();
  const country = 'ua';
  // getData(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f`)
  //   .then(response => dataHandler(response));

  getData('http://api.openweathermap.org/data/2.5/weather?id=706483&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f')
    .then(response => dataHandler(response));
  // .then(response => console.log(response));

  return forecastContainer;
});

export default map;
