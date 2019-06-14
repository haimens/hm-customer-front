export const parseDecimal = inputValue => {
  return inputValue.toString().replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
};
