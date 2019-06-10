// Handler for find-city-input

function getUserInput() {
  const userInputValue = document.getElementById('find-city-input').value;
  return userInputValue;
}

const userInputFind = document.querySelector('.find-button');
userInputFind.addEventListener('click', getUserInput);

export default getUserInput;
