import elementCreator from '../../helper-functions/element-creator';
import checkWeatherCondition from '../../helper-functions/check-weather-condition';
import { getCurrentTime, convertTimeToMs } from '../../helper-functions/get-date-time';

import './popup.css';

const createPopup = (
  title,
  temp,
  weatherCondition,
  timeCheck,
  altText,
  wind,
  windDir,
  humidityVal,
  press,
  sunrise,
  sunset,
) => {
  const forecastContainer = elementCreator('div', 'popup-forecast-container');
  const nameOfPlace = elementCreator('h2', 'place-name-heading');
  nameOfPlace.innerText = title;
  forecastContainer.appendChild(nameOfPlace);

  const dateTime = elementCreator('div', 'date-section');
  dateTime.innerHTML = getCurrentTime();
  forecastContainer.appendChild(dateTime);

  // Create helper wrapper for two bloks in row
  const pairWrapper = elementCreator('div', 'pair-wrapper');
  const tempValue = elementCreator('figure', 'forecast-item temp-section');
  const tempIcon = elementCreator('img', 'popup-icon thermometer-icon');
  tempIcon.src = require('../../map-components/weather-icons/celsius-seawave.svg');
  tempIcon.alt = 'Thermometer Celsius icon';
  const tempCaption = elementCreator('figcaption', 'caption temp-caption');
  if (temp > 0) {
    tempCaption.innerText = `+${temp}`;
  } else {
    tempCaption.innerText = temp;
  }
  tempValue.appendChild(tempCaption);
  tempValue.insertBefore(tempIcon, tempValue.firstChild);
  pairWrapper.appendChild(tempValue);

  const cloudsValue = elementCreator('figure', 'forecast-item clouds-section');
  const cloudsIcon = elementCreator('img', 'popup-icon clouds-icon');

  cloudsIcon.src = checkWeatherCondition(weatherCondition, timeCheck, cloudsIcon);
  cloudsIcon.alt = altText;
  const cloudsCaption = elementCreator('figcaption', 'caption clouds-caption');
  cloudsCaption.innerHTML = altText;
  cloudsValue.appendChild(cloudsCaption);
  cloudsValue.insertBefore(cloudsIcon, cloudsValue.firstChild);
  pairWrapper.appendChild(cloudsValue);

  forecastContainer.appendChild(pairWrapper);

  const pairWrapperTwo = elementCreator('div', 'pair-wrapper');
  const windValue = elementCreator('figure', 'forecast-item wind-section');
  const windIcon = elementCreator('img', 'popup-icon wind-icon');
  windIcon.src = require('../../map-components/weather-icons/wind-gray.svg');
  windIcon.alt = 'Wind Icon';
  const windCaption = elementCreator('figcaption', 'caption wind-caption');
  windCaption.innerHTML = `${(wind)} м/с`;
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
  windDirectionArea.style.transform = `rotate(${(windDir)}deg)`;
  const windDirectionArrow = elementCreator('div', 'wind-direction-arrow');
  const windValueIndex = elementCreator('span', 'wind-value-index');
  windValueIndex.innerHTML = `${(windDir)}&#176`;
  windValueIndex.style.transform = `rotate(-${(windDir)}deg)`;
  windDirectionArrow.innerHTML = '&#8595';
  windDirectionArrow.appendChild(windValueIndex);
  windDirectionArea.appendChild(windDirectionArrow);
  const calmStateIcon = elementCreator('img', 'calm-state-icon');
  calmStateIcon.src = require('../../map-components/weather-icons/calm-icon.svg');
  calmStateIcon.alt = 'Calm icon';
  windDirectionArea.appendChild(calmStateIcon);
  if (wind === 0) {
    calmStateIcon.style.display = 'block';
    windDirectionArrow.style.display = 'none';
  }
  windDirection.appendChild(windDirectionArea);
  pairWrapperTwo.appendChild(windDirection);
  forecastContainer.appendChild(pairWrapperTwo);

  const pairWrapperThree = elementCreator('div', 'pair-wrapper');
  const humidityValue = elementCreator('figure', 'forecast-item humidity-section');
  const humidityIcon = elementCreator('img', 'popup-icon humidity-icon');
  humidityIcon.src = require('../../map-components/weather-icons/humidity.svg');
  humidityIcon.alt = 'Humidity icon';
  const humidityCaption = elementCreator('figcaption', 'caption humidity-caption');
  humidityCaption.innerHTML = `${(humidityVal)}%`;
  humidityValue.appendChild(humidityCaption);
  humidityValue.insertBefore(humidityIcon, humidityValue.firstChild);
  pairWrapperThree.appendChild(humidityValue);

  const pressureValue = elementCreator('figure', 'forecast-item pressure-section');
  const pressureIcon = elementCreator('img', 'popup-icon pressure-icon');
  pressureIcon.src = require('../../map-components/weather-icons/barometer.svg');
  pressureIcon.alt = 'Pressure icon';
  const pressureCaption = elementCreator('figcaption', 'caption pressure-caption');
  pressureCaption.innerHTML = `${press} мм`;
  pressureValue.appendChild(pressureCaption);
  pressureValue.insertBefore(pressureIcon, pressureValue.firstChild);
  pairWrapperThree.appendChild(pressureValue);
  forecastContainer.appendChild(pairWrapperThree);

  const pairWrapperFour = elementCreator('div', 'pair-wrapper');
  const sunriseValue = elementCreator('figure', 'forecast-item sunrise-section');
  const sunriseIcon = elementCreator('img', 'popup-icon sunrise-icon');
  sunriseIcon.src = require('../../map-components/weather-icons/sunrise.svg');
  sunriseIcon.alt = 'Sunrise icon';
  const sunriseCaption = elementCreator('figcaption', 'caption sunrise-caption');
  sunriseCaption.innerHTML = sunrise;
  sunriseValue.appendChild(sunriseCaption);
  sunriseValue.insertBefore(sunriseIcon, sunriseValue.firstChild);
  pairWrapperFour.appendChild(sunriseValue);

  const sunsetValue = elementCreator('figure', 'forecast-item sunset-section');
  const sunsetIcon = elementCreator('img', 'popup-icon sunset-icon');
  sunsetIcon.src = require('../../map-components/weather-icons/sunset.svg');
  sunsetIcon.alt = 'Sunrise icon';
  const sunsetCaption = elementCreator('figcaption', 'caption sunset-caption');
  sunsetCaption.innerHTML = sunset;
  sunsetValue.appendChild(sunsetCaption);
  sunsetValue.insertBefore(sunsetIcon, sunsetValue.firstChild);
  pairWrapperFour.appendChild(sunsetValue);
  forecastContainer.appendChild(pairWrapperFour);

  return forecastContainer;
};

export default createPopup;
