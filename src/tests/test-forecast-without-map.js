import response from './test-forecast-weather-data.json';
import data from './test-current-weather-data.json';

import elementCreator from '../helper-functions/element-creator';
import {
  getCurrentTime,
  getLocaleTimeString,
  getCurrentTimeInMs,
  getDayOfWeek,
  getDateAndMonth,
} from '../helper-functions/get-date-time';
import toIntegerNumber from '../helper-functions/numbers';
import hpaToMillimeterOfMercury from '../helper-functions/pressure-converter';

import './test-forecast-without-map.css';


const arr = Object.values(response.list);
console.log(arr);
function getOneItem(itm) {
  return response.list[itm].dt;
}
arr.getOne = getOneItem;

const dateTimeVal = [];
for (let i = 0; i < arr.length; i++) {
  const dateTime = arr[i].dt;
  dateTimeVal.push(dateTime);
  // console.log(dateTimeVal);
}

const dateTimeFirstEight = dateTimeVal.slice(0, 8);
console.log(dateTimeFirstEight);

response.list.forEach((item, index, array) => {
  console.log(item, index);
});

function forecastHandler() {
  // Variables for storing response data
  const city = response.city.name;
  const temperature = toIntegerNumber(response.list[0].main.temp);
  const pressure = toIntegerNumber(response.list[0].main.pressure);
  const humidity = toIntegerNumber(response.list[0].main.humidity);
  const weatherConditionId = response.list[0].weather[0].id;
  const weatherDescription = response.list[0].weather[0].description;
  const windSpeed = toIntegerNumber(response.list[0].wind.speed);
  const windDirectionDeg = toIntegerNumber(response.list[0].wind.deg);
  const sunriseTime = data.sys.sunrise;
  console.log(sunriseTime);
  const sunsetTime = data.sys.sunset;
  console.log(sunsetTime);
  const currentTime = getCurrentTimeInMs();
  console.log(currentTime);
  const weatherForecastContainer = document.querySelector('.weather-forecast-details');
  let buttons = document.querySelectorAll('.forecast-navigation .forecast-btn');
  // console.log(buttons.getAttribute('class'));

  const cityName = document.querySelector('.city-name');
  cityName.innerHTML = city;

  const time = document.querySelector('.time');
  time.innerHTML = getLocaleTimeString(arr[0].dt);
  const date = document.querySelector('.date');
  date.innerHTML = getDateAndMonth(arr[0].dt);
  // if (buttons.classList.contains('active')) {
  //   date.innerHTML = 'this.arr.dt';
  // }

  const tempVal = document.getElementById('temp-val');
  tempVal.innerHTML = `Temp: ${temperature}`;

  const humidityVal = document.getElementById('humidity-val');
  humidityVal.innerHTML = `Humidity: ${humidity}%`;

  const pressureVal = document.getElementById('pressure-val');
  pressureVal.innerHTML = `Pressure: ${pressure} hPa`;

  const vindVal = document.getElementById('wind-val');
  vindVal.innerHTML = `Wind: ${windSpeed} mps`;

  const cloudsVal = document.getElementById('clouds-val');
  cloudsVal.innerHTML = `Clouds: ${weatherDescription}`;

  /**
   * Get time for 3 hour forecast
   * Use first 8 items from response dt (24h / 3);
   */
  const timeButtons = document.querySelectorAll('.forecast-hour-btn');
  const timeButtonsArr = Array.prototype.slice.call(timeButtons);
  console.log(timeButtonsArr);
  for (let i = 0; i < dateTimeFirstEight.length; i++) {
    const el = timeButtonsArr;
    for (let j = 0; j < el.length; j++) {
      const element = el[j];
      element.innerHTML = getLocaleTimeString(dateTimeFirstEight[j]);
    }
  }
  const buttonOne = document.getElementById('btn1');
  buttonOne.innerHTML = getDateAndMonth(arr[0].dt);
  
  const buttonTwo = document.getElementById('btn2');
  buttonTwo.innerHTML = getDateAndMonth(arr[1].dt);

  const buttonThree = document.getElementById('btn3');
  buttonThree.innerHTML = getDateAndMonth(arr[9].dt);

  const buttonFour = document.getElementById('btn4');
  buttonFour.innerHTML = getDateAndMonth(arr[17].dt);

  const buttonFive = document.getElementById('btn5');
  buttonFive.innerHTML = getDateAndMonth(arr[25].dt);

  // Handler for buttons
  const handlerClick = () => {
    // let buttons = document.querySelectorAll('.forecast-btn');
    buttons = Array.prototype.slice.call(buttons, 0);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // remove "active" class
        document.querySelector('.active').classList.remove('active');

        // set "active" class
        button.classList.add('active');

        if (button.classList.contains('active')
            && response.list.dt !== arr[0].dt) {
          time.innerHTML = getLocaleTimeString(arr[17].dt);
          date.innerHTML = getDateAndMonth(arr[17].dt);
        }
        if (button.classList.contains('active')
            && arr.dt === arr[0].dt) {
          time.innerHTML = getLocaleTimeString(arr[0].dt);
          date.innerHTML = getDateAndMonth(arr[0].dt);
        }
      });
    });
  };

  const forecastNavigation = document.querySelector('.forecast-navigation');
  forecastNavigation.addEventListener('click', handlerClick);
}

forecastHandler();

export default forecastHandler;
