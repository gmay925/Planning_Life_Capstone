// eslint-disable-next-line import/prefer-default-export
export function formatPhoneNumber(number) {
  const digits = number.replace(/\D/g, ''); // remove everything that's not a digit

  const areaCode = digits.slice(0, 3); // grab the first 3 digits
  const firstPart = digits.slice(3, 6); // grab the second 3 digits
  const secondPart = digits.slice(6, 10); // grab the last 4 digits

  if (secondPart) {
    return `(${areaCode}) ${firstPart}-${secondPart}`; // we have all the parts, do a fully formatted phone number
  }

  if (firstPart) {
    return `(${areaCode}) ${firstPart}`; // we have the first two parts, do just the parenthesis around area code
  }

  if (areaCode) {
    return `(${areaCode}`; // we have only the area code, only put the first parenthesis
  }

  return ''; // no digits present, return empty string
}
