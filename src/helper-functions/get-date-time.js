/**
 * Get current time in human-readable format
 */
export const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes < 10) {
    return `${hours}:${`0${minutes}`}`;
  }
  return `${hours}:${minutes}`;
};

/**
 * Convert time from milliseconds to locale time string.
 * Format will be 'HH:MM'
 */
export const getLocaleTimeString = (gottenTime) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const localeTimeString = new Date(gottenTime * 1000).toLocaleTimeString([], options);
  return localeTimeString;
};

/**
 * Get current time in milliseconds format UTC
 */
export const getCurrentTimeInMs = () => {
  const time = Math.floor((new Date()).getTime() / 1000);
  return time;
};

/**
 * Convert time from Object to milliseconds
 */
export const convertTimeToMs = (timeObject) => {
  const timeInMs = Math.floor(timeObject.getTime() / 1000);
  return timeInMs;
};

/**
 * Get day of week
 */
export const getDayOfWeek = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  // let dayOfWeekName = '';

  // switch (dayOfWeek) {
  //   case 0:
  //     dayOfWeekName = 'Вс';
  //     break;
  //   case 1:
  //     dayOfWeekName = 'Пн';
  //     break;
  //   case 2:
  //     dayOfWeekName = 'Вт';
  //     break;
  //   case 3:
  //     dayOfWeekName = 'Ср';
  //     break;
  //   case 4:
  //     dayOfWeekName = 'Чт';
  //     break;
  //   case 5:
  //     dayOfWeekName = 'Пт';
  //     break;
  //   case 6:
  //     dayOfWeekName = 'Сб';
  //     break;
  //   default:
  //     break;
  // }
  return dayOfWeek;
};

/**
 * Get date and month in shorthand format
 * Like a '19 февр' for 'ru' locale, for example
 */
export const getDateAndMonth = (gottenTime) => {
  const options = {
    month: 'short',
    day: 'numeric',
  };
  const dateAndMonth = new Date(gottenTime * 1000).toLocaleString('ru', options);
  return dateAndMonth;
};
