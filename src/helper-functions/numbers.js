const toIntegerNumber = (number) => {
  if (Number.isInteger(number)) {
    return number;
  }
  return number.toFixed();
};

export default toIntegerNumber;
