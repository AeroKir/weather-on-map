import L from 'leaflet';
// import dataHandler from '../api-components/data-handler';
import dataHandler from '../api-components/data-handler';

import './weather-popup.css';

const getData = async () => {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f');
  const data = await response.json();
  console.log(data);
  // return data;

  // const weatherPopup = L.popup({
  //   className: 'leaflet-popup-content-wrapper',
  // }).setContent(() => {
  //   const container = document.createElement('div');
  //   const heading = document.createElement('h1');
  //   heading.innerText = `Температура ${data.main.temp}`;
  //   container.appendChild(heading);
  //   console.log(container);
  //   return container;
  // });

  // const weatherPopup = L.popup({
  //   className: 'leaflet-popup-content-wrapper',
  // }).setContent(
  //   <h1>`Температура ${data.main.temp}`</h1>
  // );
  // console.log(weatherPopup);
};


// const weatherPopup = L.popup({
//   className: 'leaflet-popup-content-wrapper',
// }).setContent(() => {
//   const container = document.createElement('div');
//   const heading = document.createElement('h1');
//   heading.innerText = 'Hi there!';

//   //   // const tempValue = document.createElement('div');
//   //   // const tempIcon = document.createElement('img');
//   //   // tempIcon.src = require('../api-components/icons/celsius.svg');
//   //   // tempIcon.alt = 'Thermometer Celsius icon';
//   //   // tempIcon.className = 'thermometer-icon';
//   //   // tempValue.innerHTML = `Температура ${dataHandler.main.temp}`;
//   //   // tempValue.appendChild(tempIcon);
//   //   // tempValue.className = 'obj-id';
//   container.appendChild(heading);
//   //   // container.appendChild(tempValue);
//   return container;
// });

// export default weatherPopup;

// const createPopup = () => {
//   const weatherPopup = L.popup({
//     className: 'leaflet-popup-content-wrapper',
//   }).setContent(() => {
//     const container = document.createElement('div');
//     const heading = document.createElement('h1');
//     heading.innerHTML = 'Hi there!';
//     container.appendChild(heading[0]);
//     // return container;
//   });
//   return weatherPopup;
// };

// console.log(createPopup());
// export default createPopup;
