// import './weather-request';
import L from 'leaflet';

// import '../map-components/weather-popup.css';

function dataHandler(data) {
  const container = document.getElementById('json');
  const heading = document.createElement('h1');
  heading.innerText = `Температура ${data.main.temp}`;
  container.appendChild(heading);
  console.log(container);
  // return container;

  const weatherPopup = L.popup({
    className: 'leaflet-popup-content-wrapper',
  }).setContent(container);
  
  console.log(weatherPopup);

  // console.log(data);
  // console.log(Object.keys(data));
  // const forecast = document.getElementById('json');
  // const forecastValues = document.querySelector('.weather-forecast-details');

  // const tempValue = document.getElementById('temp-val');
  // const tempIcon = document.createElement('img');
  // tempIcon.src = require('./icons/celsius.svg');
  // tempIcon.alt = 'Thermometer Celsius icon';
  // tempIcon.className = 'thermometer-icon';
  // tempValue.innerHTML = `Температура ${data.main.temp}`;
  // tempValue.appendChild(tempIcon);
  // tempValue.className = 'obj-id';
  // forecastValues.appendChild(tempValue);

  // const humidityValue = document.getElementById('humidity-val');
  // humidityValue.innerHTML = `Влажность ${data.main.humidity}%`;
  // forecastValues.appendChild(humidityValue);

  // const pressureValue = document.getElementById('pressure-val');
  // const pressureIcon = document.createElement('img');
  // pressureIcon.src = require('./icons/sun.svg');
  // pressureIcon.alt = 'Pressure icon';
  // pressureIcon.className = 'pressure-icon';
  // pressureValue.innerHTML = `Давление ${data.main.pressure}`;
  // pressureValue.appendChild(pressureIcon);
  // forecastValues.appendChild(pressureValue);

  // const windValue = document.getElementById('wind-val');
  // windValue.innerHTML = `Ветер ${data.wind.speed} м/с. Направление ${data.wind.deg}`;
  // forecastValues.appendChild(windValue);

  // const cloudsValue = document.getElementById('clouds-val');
  // const cloudsIcon = document.createElement('img');
  // cloudsIcon.className = 'clouds-icon';

  // // See details on https://openweathermap.org/weather-conditions
  // switch (data.weather[0].id) {
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
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/11d.png';
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
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/09d.png';
  //     break;
  //   case 500:
  //   case 501:
  //   case 502:
  //   case 503:
  //   case 504:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/10d.png';
  //     break;
  //   case 511:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/13d.png';
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
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/13d.png';
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
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/50d.png';
  //     break;
  //   case 800:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/01d.png';
  //     break;
  //   case 801:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/02d.png';
  //     break;
  //   case 802:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/03d.png';
  //     break;
  //   case 803:
  //   case 804:
  //     cloudsIcon.src = 'src/api-components/icons/cloud.svg';
  //     break;

  //   default:
  //     cloudsIcon.src = 'http://openweathermap.org/img/w/01d.png';
  //     break;
  // }
  // cloudsIcon.alt = `${data.weather[0].description}`;
  // cloudsValue.innerHTML = `${data.weather[0].description}`;
  // cloudsValue.appendChild(cloudsIcon);
  // forecastValues.appendChild(cloudsValue);

  // const visibilityValue = document.getElementById('visibility-val');
  // visibilityValue.innerHTML = `Видимость ${data.visibility} м`;
  // forecastValues.appendChild(visibilityValue);

  // return weatherPopup;
}



export default dataHandler;

// const gettingData = dataHandler();
// console.log(gettingData);


// const weatherPopup = L.popup({
//   className: 'leaflet-popup-content-wrapper',
// }).setContent(() => {
//   const container = document.createElement('div');
//   const heading = document.createElement('h1');
//   heading.innerText = `Температура ${dataHandler.main.temp}`;
//   container.appendChild(heading);
//   return container;
// });

// export default dataHandler;
