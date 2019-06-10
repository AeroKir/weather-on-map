// import L from 'leaflet';
// import dataHandler from './data-handler';

// function getData(url) {
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.open('GET', url, true);

//     function getJSON() {
//       if (this.status === 200) {
//         resolve(JSON.parse(this.responseText));
//       } else {
//         const error = new Error(this.statusText);
//         error.code = this.status;
//         reject(error);
//       }
//     }

//     request.onload = getJSON;

//     function errorHandler() {
//       reject(new Error('Network Error'));
//     }
//     request.onerror = errorHandler;

//     request.send();
//   });
// }

// getData('http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f')
// // .then((response) => {
// //   result = response;
// //   console.log(result);
// //   return result;
// // });


//   .then(response => dataHandler(response))
//   .then(response => console.log(response));

// console.log(getResult);

// export default response;

// const result = fetch('http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f')
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .then(data => data)
//   .then(console.log(data));


const getData = async () => {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&lang=ua&APPID=863a0565129f6b0538ef1729aea12f4f');
  const data = await response.json();
  console.log(data);

  // const returnData = () => {
  //   const actualData = data;
  //   return actualData;
  // };
  function func() {
    console.log(data);
  }
  return func;
};


const forecast = getData();
console.log(forecast);

// const fetchData = () => Promise.resolve(getData());
// const result = fetchData();
// const result = getData();
// console.log(result);


// console.log(result(JSON.parse(result)));
