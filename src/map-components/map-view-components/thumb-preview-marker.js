import elementCreator from '../../helper-functions/element-creator';
import checkWeatherCondition from '../../helper-functions/check-weather-condition';

import './thumb-preview-marker.css';

const createPreviewMarker = (title, temp, weatherCondition, timeCheck, altText) => {
  const thumbnailPreviewMarker = elementCreator('div', 'thumbnail-preview-marker');
  const thumbnailPlaceTitle = elementCreator('h2', 'thumbnail-place-title');
  thumbnailPlaceTitle.innerText = title;
  thumbnailPreviewMarker.appendChild(thumbnailPlaceTitle);
  const thumbnailWeatherConditionWrap = elementCreator('div', 'thumbnail-weather-condition-wrap');

  const thumbnailTempSection = elementCreator('span', 'thumbnail-temp-section');
  if (temp > 0) {
    thumbnailTempSection.innerText = `+${temp}`;
  } else {
    thumbnailTempSection.innerText = temp;
  }

  thumbnailWeatherConditionWrap.appendChild(thumbnailTempSection);

  const thumbnailCloudsIcon = elementCreator('img', 'thumbnail-clouds-img');
  thumbnailCloudsIcon.src = checkWeatherCondition(weatherCondition, timeCheck, thumbnailCloudsIcon);
  thumbnailCloudsIcon.alt = altText;
  thumbnailCloudsIcon.title = altText;
  thumbnailWeatherConditionWrap.appendChild(thumbnailCloudsIcon);

  thumbnailPreviewMarker.appendChild(thumbnailWeatherConditionWrap);

  const thumbnailDotPointer = elementCreator('div', 'thumbnail-dot-pointer');
  thumbnailPreviewMarker.appendChild(thumbnailDotPointer);
  return thumbnailPreviewMarker;
};

export default createPreviewMarker;
