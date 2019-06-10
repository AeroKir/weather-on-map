import data from '../tests/city.list.json';

const ukrainianCities = [];


data.forEach((element) => {
  if (element.country === 'UA') {
    ukrainianCities.push(element);
  }
});

ukrainianCities.forEach((element, i) => {
  ukrainianCities[i].nameUa = '';
  ukrainianCities[i].nameRu = '';
});

console.log(ukrainianCities);

const ukrainianCitiesNamedOnA = [];
const ukrainianCitiesNamedOnB = [];
const ukrainianCitiesNamedOnC = [];
const ukrainianCitiesNamedOnD = [];
const ukrainianCitiesNamedOnE = [];
const ukrainianCitiesNamedOnF = [];
const ukrainianCitiesNamedOnG = [];
const ukrainianCitiesNamedOnH = [];
const ukrainianCitiesNamedOnI = [];
const ukrainianCitiesNamedOnJ = [];
const ukrainianCitiesNamedOnK = [];
const ukrainianCitiesNamedOnL = [];
const ukrainianCitiesNamedOnM = [];
const ukrainianCitiesNamedOnN = [];
const ukrainianCitiesNamedOnO = [];
const ukrainianCitiesNamedOnP = [];
const ukrainianCitiesNamedOnQ = [];
const ukrainianCitiesNamedOnR = [];
const ukrainianCitiesNamedOnS = [];
const ukrainianCitiesNamedOnT = [];
const ukrainianCitiesNamedOnU = [];
const ukrainianCitiesNamedOnV = [];
const ukrainianCitiesNamedOnW = [];
const ukrainianCitiesNamedOnX = [];
const ukrainianCitiesNamedOnY = [];
const ukrainianCitiesNamedOnZ = [];
const ukrainianCitiesNamedOnAnotherSymbol = [];

ukrainianCities.forEach((cityName) => {
  // if (cityName.name[0] === 'O') {
  //   ukrainianCitiesNamedOnA.push(cityName);
  // }

  switch (cityName.name[0]) {
    case 'A':
      ukrainianCitiesNamedOnA.push(cityName);
      break;
    case 'B':
      ukrainianCitiesNamedOnB.push(cityName);
      break;
    case 'C':
      ukrainianCitiesNamedOnC.push(cityName);
      break;
    case 'D':
      ukrainianCitiesNamedOnD.push(cityName);
      break;
    case 'E':
      ukrainianCitiesNamedOnE.push(cityName);
      break;
    case 'F':
      ukrainianCitiesNamedOnF.push(cityName);
      break;
    case 'G':
      ukrainianCitiesNamedOnG.push(cityName);
      break;
    case 'H':
      ukrainianCitiesNamedOnH.push(cityName);
      break;
    case 'I':
      ukrainianCitiesNamedOnI.push(cityName);
      break;
    case 'J':
      ukrainianCitiesNamedOnJ.push(cityName);
      break;
    case 'K':
      ukrainianCitiesNamedOnK.push(cityName);
      break;
    case 'L':
      ukrainianCitiesNamedOnL.push(cityName);
      break;
    case 'M':
      ukrainianCitiesNamedOnM.push(cityName);
      break;
    case 'N':
      ukrainianCitiesNamedOnN.push(cityName);
      break;
    case 'O':
      ukrainianCitiesNamedOnO.push(cityName);
      break;
    case 'P':
      ukrainianCitiesNamedOnP.push(cityName);
      break;
    case 'Q':
      ukrainianCitiesNamedOnQ.push(cityName);
      break;
    case 'R':
      ukrainianCitiesNamedOnR.push(cityName);
      break;
    case 'S':
      ukrainianCitiesNamedOnS.push(cityName);
      break;
    case 'T':
      ukrainianCitiesNamedOnT.push(cityName);
      break;
    case 'U':
      ukrainianCitiesNamedOnU.push(cityName);
      break;
    case 'V':
      ukrainianCitiesNamedOnV.push(cityName);
      break;
    case 'W':
      ukrainianCitiesNamedOnW.push(cityName);
      break;
    case 'X':
      ukrainianCitiesNamedOnX.push(cityName);
      break;
    case 'Y':
      ukrainianCitiesNamedOnY.push(cityName);
      break;
    case 'Z':
      ukrainianCitiesNamedOnZ.push(cityName);
      break;
    case '-':
      ukrainianCitiesNamedOnAnotherSymbol.push(cityName);
    default:
      break;
  }
});

console.log(ukrainianCitiesNamedOnA);
console.log(ukrainianCitiesNamedOnB);
console.log(ukrainianCitiesNamedOnC);
console.log(ukrainianCitiesNamedOnD);
console.log(ukrainianCitiesNamedOnE);
console.log(ukrainianCitiesNamedOnF);
console.log(ukrainianCitiesNamedOnG);
console.log(ukrainianCitiesNamedOnH);
console.log(ukrainianCitiesNamedOnI);
console.log(ukrainianCitiesNamedOnJ);
console.log(ukrainianCitiesNamedOnK);
console.log(ukrainianCitiesNamedOnL);
console.log(ukrainianCitiesNamedOnM);
console.log(ukrainianCitiesNamedOnN);
console.log(ukrainianCitiesNamedOnO);
console.log(ukrainianCitiesNamedOnP);
console.log(ukrainianCitiesNamedOnQ);
console.log(ukrainianCitiesNamedOnR);
console.log(ukrainianCitiesNamedOnS);
console.log(ukrainianCitiesNamedOnT);
console.log(ukrainianCitiesNamedOnU);
console.log(ukrainianCitiesNamedOnV);
console.log(ukrainianCitiesNamedOnW);
console.log(ukrainianCitiesNamedOnX);
console.log(ukrainianCitiesNamedOnY);
console.log(ukrainianCitiesNamedOnZ);
console.log(ukrainianCitiesNamedOnAnotherSymbol);

export default ukrainianCities;
