const getData = url => new Promise((resolve, reject) => {
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

export default getData;
