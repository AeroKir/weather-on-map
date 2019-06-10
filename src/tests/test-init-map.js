import L from 'leaflet';
import openStreetMap from '../map-components/tile-layers';
import placeMarker from '../map-components/place-marker';

// Test data file. Remove before production
import response from './test-current-weather-data.json';

import elementCreator from '../helper-functions/element-creator';
import { getCurrentTime, getCurrentTimeInMs, getDayOfWeek } from '../helper-functions/get-date-time';
import hpaToMillimeterOfMercury from '../helper-functions/pressure-converter';

import './test-weather-popup.css';

const map = L.map('map', {
  center: [48.153719, 24.822922],
  zoom: 13,
  layers: [openStreetMap],
});

const centerUkraine = L.marker([48.153719, 24.822922], { icon: placeMarker }).addTo(map);
centerUkraine.bindPopup(() => {
  const forecastContainer = elementCreator('div', 'popup-forecast-container');


  // Handler for response data

  const nameOfPlace = elementCreator('h2', 'place-name-heading');
  nameOfPlace.innerHTML = `${response.name}`;
  forecastContainer.appendChild(nameOfPlace);

  const dateTime = elementCreator('div', 'date-section');
  // setInterval(getCurrentTime, 1000);
  dateTime.innerHTML = getCurrentTime();
  forecastContainer.appendChild(dateTime);

  // Create helper wrapper for two bloks in row
  const pairWrapper = elementCreator('div', 'pair-wrapper');
  const tempValue = elementCreator('figure', 'forecast-item temp-section');
  const tempIcon = elementCreator('img', 'popup-icon thermometer-icon');
  tempIcon.src = require('../map-components/weather-icons/celsius-dark.svg');
  tempIcon.alt = 'Thermometer Celsius icon';
  const tempCaption = elementCreator('figcaption', 'caption temp-caption');
  // eslint-disable-next-line no-unused-expressions
  (response.main.temp > 0) ? tempCaption.innerHTML = `+${response.main.temp}` : tempCaption.innerHTML = `${response.main.temp}`;
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

  // Test weather conditions display with if statements
  const weatherConditionId = response.weather[0].id;
  console.log(weatherConditionId);

  // const sunriseTime = `${new Date(response.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
  const sunriseTime = response.sys.sunrise;
  console.log(sunriseTime);

  // const sunsetTime = `${new Date(response.sys.sunset * 1000).toLocaleTimeString()}`;
  const sunsetTime = response.sys.sunset;
  console.log(sunsetTime);

  const currentTime = getCurrentTimeInMs();
  console.log(currentTime);

  const isDayNow = !!((currentTime > sunriseTime && currentTime < sunsetTime));
  // const isDayNow = (currentTime > sunriseTime && currentTime < sunsetTime) ? true : false;
  console.log(isDayNow);


  /**
   * Displayed different icons depending for weather conditions
   * See details on https://openweathermap.org/weather-conditions
   */

  // Group 2xx: Thunderstorm
  if (
    weatherConditionId === 200
    || weatherConditionId === 201
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-with-light-rain.svg');
  }

  if (weatherConditionId === 202) {
    cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-with-heavy-rain-v1.svg');
  }

  if (
    weatherConditionId === 210
    || weatherConditionId === 211
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-light.svg');
  }

  if (
    weatherConditionId === 212
    || weatherConditionId === 221
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-heavy.svg');
  }

  if (
    weatherConditionId === 230
    || weatherConditionId === 231
    || weatherConditionId === 232
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-with-drizzle.svg');
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
    cloudsIcon.src = require('../map-components/weather-icons/drizzle.svg');
  }

  // Group 5xx: Rain
  if (
    (weatherConditionId === 500 || weatherConditionId === 501)
    && isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/light-rain-day.svg');
  }

  if (
    (weatherConditionId === 500 || weatherConditionId === 501)
    && !isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/light-rain-night.svg');
  }

  if (
    (weatherConditionId === 502 || weatherConditionId === 503 || weatherConditionId === 504)
    && isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/heavy-rain-day.svg');
  }

  if (
    (weatherConditionId === 502 || weatherConditionId === 503 || weatherConditionId === 504)
    && !isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/heavy-rain-night.svg');
  }

  if (weatherConditionId === 511) {
    cloudsIcon.src = require('../map-components/weather-icons/freezing-rain.svg');
  }

  if (
    weatherConditionId === 520
    || weatherConditionId === 521
    || weatherConditionId === 522
    || weatherConditionId === 531
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/heavy-shower-rain.svg');
  }

  // Group 6xx: Snow
  if (
    weatherConditionId === 600
    || weatherConditionId === 601
    || weatherConditionId === 602
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/snow.svg');
  }

  if (
    weatherConditionId === 611
    || weatherConditionId === 612
    || weatherConditionId === 615
    || weatherConditionId === 616
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/rain-and-snow.svg');
  }

  if (
    weatherConditionId === 620
    || weatherConditionId === 621
    || weatherConditionId === 622
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/shower-snow.svg');
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
    cloudsIcon.src = require('../map-components/weather-icons/mist.svg');
  }

  if (weatherConditionId === 771) {
    cloudsIcon.src = require('../map-components/weather-icons/squalls.svg');
  }

  if (weatherConditionId === 781) {
    cloudsIcon.src = require('../map-components/weather-icons/tornado-v1.svg');
  }

  // Group 800: Clear
  if (
    (weatherConditionId === 800)
    && isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/sun-clear.svg');
  }

  if (
    (weatherConditionId === 800)
    && !isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/moon.svg');
  }

  // Group 80x: Clouds
  if (
    (weatherConditionId === 801)
    && isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/cloud-with-sun.svg');
  }

  if (
    (weatherConditionId === 801)
    && !isDayNow
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/cloud-with-moon-night.svg');
  }

  if (weatherConditionId === 802) {
    cloudsIcon.src = require('../map-components/weather-icons/scattered-clouds.svg');
  }

  if (
    weatherConditionId === 803
    || weatherConditionId === 804
  ) {
    cloudsIcon.src = require('../map-components/weather-icons/overcast-clouds-v2.svg');
  }


  // See details on https://openweathermap.org/weather-conditions
  // switch (response.weather[0].id) {
  //   case 200:
  //   case 201:
  //   case 202:
  //   case 210:
  //   case 211:
  //   case 212:
  //   case 221:
  //   case 230:
  //   case 231:
  //   case 232:
  //     cloudsIcon.src = require('../map-components/weather-icons/thunderstorm-with-drizzle.svg');
  //     break;
  //   case 300:
  //   case 301:
  //   case 302:
  //   case 310:
  //   case 311:
  //   case 312:
  //   case 313:
  //   case 314:
  //   case 321:
  //     cloudsIcon.src = require('../map-components/weather-icons/drizzle.svg');
  //     break;
  //   case 500:
  //   case 501:
  //   case 502:
  //   case 503:
  //   case 504:
  //     cloudsIcon.src = require('../map-components/weather-icons/light-rain-day.svg');
  //     break;
  //   case 511:
  //     cloudsIcon.src = require('../map-components/weather-icons/freezing-rain.svg');
  //     break;
  //   case 520:
  //   case 521:
  //   case 522:
  //   case 531:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/09d.png';
  //     break;
  //   case 600:
  //   case 601:
  //   case 602:
  //   case 611:
  //   case 612:
  //   case 615:
  //   case 616:
  //   case 620:
  //   case 621:
  //   case 622:
  //     cloudsIcon.src = require('../map-components/weather-icons/shower-snow.svg');
  //     break;
  //   case 701:
  //   case 711:
  //   case 721:
  //   case 731:
  //   case 741:
  //   case 751:
  //   case 761:
  //   case 762:
  //   case 771:
  //   case 781:
  //     cloudsIcon.src = require('../map-components/weather-icons/tornado-v1.svg');
  //     break;
  //   case 800:
  //     cloudsIcon.src = require('../map-components/weather-icons/sun-clear.svg');
  //     break;
  //   case 801:
  //     cloudsIcon.src = require('../map-components/weather-icons/sun-clear.svg');
  //     break;
  //   case 802:
  //     cloudsIcon.src = require('../map-components/weather-icons/scattered-clouds.svg');
  //     break;
  //   case 803:
  //   case 804:
  //     cloudsIcon.src = require('../map-components/weather-icons/overcast-clouds-v2.svg');
  //     break;

  //   default:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/01d.png';
  //     break;
  // }
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
  windIcon.src = require('../map-components/weather-icons/wind-dark.svg');
  windIcon.alt = 'Wind Icon';
  const windCaption = elementCreator('figcaption', 'caption wind-caption');
  windCaption.innerHTML = `${response.wind.speed} м/с`;
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
  windDirectionArea.style.transform = `rotate(${response.wind.deg}deg)`;
  const windDirectionArrow = elementCreator('div', 'wind-direction-arrow');
  const windValueIndex = elementCreator('span', 'wind-value-index');
  windValueIndex.innerHTML = `${response.wind.deg}&#176`;
  windValueIndex.style.transform = `rotate(-${response.wind.deg}deg)`;
  windDirectionArrow.innerHTML = '&#8595';
  windDirectionArrow.appendChild(windValueIndex);
  windDirectionArea.appendChild(windDirectionArrow);
  const calmStateIcon = elementCreator('img', 'calm-state-icon');
  calmStateIcon.src = require('../map-components/weather-icons/calm-icon.svg');
  calmStateIcon.alt = 'Calm icon';
  windDirectionArea.appendChild(calmStateIcon);
  if (response.wind.speed === 0) {
    calmStateIcon.style.display = 'block';
    windDirectionArrow.style.display = 'none';
  }
  // windDirection.innerHTML = `Направление ${response.wind.deg}`;
  windDirection.appendChild(windDirectionArea);
  pairWrapperTwo.appendChild(windDirection);
  forecastContainer.appendChild(pairWrapperTwo);

  const pairWrapperThree = elementCreator('div', 'pair-wrapper');
  const humidityValue = elementCreator('figure', 'forecast-item humidity-section');
  const humidityIcon = elementCreator('img', 'popup-icon humidity-icon');
  humidityIcon.src = require('../map-components/weather-icons/humidity-dark.svg');
  humidityIcon.alt = 'Humidity icon';
  const humidityCaption = elementCreator('figcaption', 'caption humidity-caption');
  humidityCaption.innerHTML = `${response.main.humidity}%`;
  humidityValue.appendChild(humidityCaption);
  humidityValue.insertBefore(humidityIcon, humidityValue.firstChild);
  pairWrapperThree.appendChild(humidityValue);

  const pressureValue = elementCreator('figure', 'forecast-item pressure-section');
  const pressureIcon = elementCreator('img', 'popup-icon pressure-icon');
  pressureIcon.src = require('../map-components/weather-icons/barometer-dark.svg');
  pressureIcon.alt = 'Pressure icon';
  const pressureCaption = elementCreator('figcaption', 'caption pressure-caption');
  pressureCaption.innerHTML = `${hpaToMillimeterOfMercury(`${response.main.pressure}`)} мм`;
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
  sunriseCaption.innerHTML = `${new Date(response.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
  sunriseValue.appendChild(sunriseCaption);
  sunriseValue.insertBefore(sunriseIcon, sunriseValue.firstChild);
  pairWrapperFour.appendChild(sunriseValue);

  const sunsetValue = elementCreator('figure', 'forecast-item sunset-section');
  const sunsetIcon = elementCreator('img', 'popup-icon sunset-icon');
  sunsetIcon.src = require('../map-components/weather-icons/sunset.svg');
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

  function changeClassName() { document.querySelectorAll('forecast-nav-button').classList.toggle('active'); }

  let dayOfWeekName = 'Sun';
  // switch (getDayOfWeek) {
  //   case 0:
  //     dayOfWeekName = 'Вс';
  //     break;
  //   case 1:
  //     dayOfWeekName = 'Пн';
  //     break;
  //   case 2:
  //     dayOfWeekName = 'Вт';
  //     break;
  //   case 3:
  //     dayOfWeekName = 'Ср';
  //     break;
  //   case 4:
  //     dayOfWeekName = 'Чт';
  //     break;
  //   case 5:
  //     dayOfWeekName = 'Пт';
  //     break;
  //   case 6:
  //     dayOfWeekName = 'Сб';
  //     break;
  //   default:
  //     break;
  // }

  if (getDayOfWeek() === 0) {
    console.log('SUN');
  }

  if (getDayOfWeek() === 1) {
    dayOfWeekName = 'MON';
    console.log('MON');
  }

  if (getDayOfWeek() === 2) {
    dayOfWeekName = 'TUE';
    console.log('MON');
  }

  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  forecastNavButtonOne.innerHTML = days[getDayOfWeek()];
  const dateOfDay = elementCreator('div', 'date-of-day');
  // Move it in get-date-time.js
  const options = {
    month: 'short',
    day: 'numeric',
  };
  dateOfDay.innerHTML = `${new Date(response.dt * 1000).toLocaleString('ru', options)}`;
  forecastNavButtonOne.appendChild(dateOfDay);
  forecastNavButtonOne.addEventListener('click', changeClassName);
  // forecastNavButtonOne.innerHTML = getDayOfWeek();
  console.log(typeof getDayOfWeek());
  forecastNavButtonTwo.innerHTML = days[getDayOfWeek() + 1];
  forecastNavButtonTwo.addEventListener('click', changeClassName);
  forecastNavButtonThree.innerHTML = days[getDayOfWeek() + 2];
  forecastNavButtonFour.innerHTML = days[getDayOfWeek() + 3];
  forecastNavButtonFive.innerHTML = days[getDayOfWeek() + 4];
  forecastNavSection.appendChild(forecastNavButtonOne);
  forecastNavSection.appendChild(forecastNavButtonTwo);
  forecastNavSection.appendChild(forecastNavButtonThree);
  forecastNavSection.appendChild(forecastNavButtonFour);
  forecastNavSection.appendChild(forecastNavButtonFive);
  forecastContainer.appendChild(forecastNavSection);

  return forecastContainer;
});

export default map;
