/**
  * Weather condition checker
  * Display different icons depending for weather conditions and time of the day
  * Based on three arguments:
  * - conditionId (number which will be get in API response)
  *   See details on https://openweathermap.org/weather-conditions
  * - checkIsDayNow (boolean value, based on received time value)
  * - iconElement (usually <img>  which assigned src attribute respectively)
  * Returns src path to the icon which be required
  */
function checkWeatherCondition(conditionId, checkIsDayNow, iconElement) {
  let src = iconElement;
  // Group 2xx: Thunderstorm
  if (conditionId === 200 || conditionId === 201) {
    src = require('../map-components/weather-icons/thunderstorm-with-light-rain.svg');
  }

  if (conditionId === 202) {
    src = require('../map-components/weather-icons/thunderstorm-with-heavy-rain-v1.svg');
  }

  if (conditionId === 210 || conditionId === 211) {
    src = require('../map-components/weather-icons/thunderstorm-light.svg');
  }

  if (conditionId === 212 || conditionId === 221) {
    src = require('../map-components/weather-icons/thunderstorm-heavy.svg');
  }

  if (conditionId === 230 || conditionId === 231 || conditionId === 232) {
    src = require('../map-components/weather-icons/thunderstorm-with-drizzle.svg');
  }

  // Group 3xx: Drizzle
  if (
    conditionId === 300
    || conditionId === 301
    || conditionId === 302
    || conditionId === 310
    || conditionId === 311
    || conditionId === 312
    || conditionId === 313
    || conditionId === 314
    || conditionId === 321
  ) {
    src = require('../map-components/weather-icons/drizzle.svg');
  }

  // Group 5xx: Rain
  if ((conditionId === 500 || conditionId === 501) && checkIsDayNow) {
    src = require('../map-components/weather-icons/light-rain-day.svg');
  }

  if ((conditionId === 500 || conditionId === 501) && !checkIsDayNow) {
    src = require('../map-components/weather-icons/light-rain-night.svg');
  }

  if ((conditionId === 502 || conditionId === 503 || conditionId === 504)
       && checkIsDayNow) {
    src = require('../map-components/weather-icons/heavy-rain-day.svg');
  }

  if ((conditionId === 502 || conditionId === 503 || conditionId === 504)
       && !checkIsDayNow) {
    src = require('../map-components/weather-icons/heavy-rain-night.svg');
  }

  if (conditionId === 511) {
    src = require('../map-components/weather-icons/freezing-rain.svg');
  }

  if (
    conditionId === 520
    || conditionId === 521
    || conditionId === 522
    || conditionId === 531
  ) {
    src = require('../map-components/weather-icons/heavy-shower-rain.svg');
  }

  // Group 6xx: Snow
  if (conditionId === 600 || conditionId === 601 || conditionId === 602) {
    src = require('../map-components/weather-icons/snow.svg');
  }

  if (
    conditionId === 611
    || conditionId === 612
    || conditionId === 615
    || conditionId === 616
  ) {
    src = require('../map-components/weather-icons/rain-and-snow.svg');
  }

  if (conditionId === 620 || conditionId === 621 || conditionId === 622) {
    src = require('../map-components/weather-icons/shower-snow.svg');
  }

  // Group 7xx: Atmosphere
  if (
    conditionId === 701
    || conditionId === 711
    || conditionId === 721
    || conditionId === 731
    || conditionId === 741
    || conditionId === 751
    || conditionId === 761
    || conditionId === 762
  ) {
    src = require('../map-components/weather-icons/mist.svg');
  }

  if (conditionId === 771) {
    src = require('../map-components/weather-icons/squalls.svg');
  }

  if (conditionId === 781) {
    src = require('../map-components/weather-icons/tornado-v1.svg');
  }

  // Group 800: Clear
  if (conditionId === 800 && checkIsDayNow) {
    src = require('../map-components/weather-icons/sun-clear.svg');
  }

  if (conditionId === 800 && !checkIsDayNow) {
    src = require('../map-components/weather-icons/moon.svg');
  }

  // Group 80x: Clouds
  if (conditionId === 801 && checkIsDayNow) {
    src = require('../map-components/weather-icons/cloud-with-sun.svg');
  }

  if (conditionId === 801 && !checkIsDayNow) {
    src = require('../map-components/weather-icons/cloud-with-moon-night.svg');
  }

  if (conditionId === 802) {
    src = require('../map-components/weather-icons/scattered-clouds.svg');
  }

  if (conditionId === 803 || conditionId === 804) {
    src = require('../map-components/weather-icons/overcast-clouds-v2.svg');
  }

  return src;
}

export default checkWeatherCondition;
