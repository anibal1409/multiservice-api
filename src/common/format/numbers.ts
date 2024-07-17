export function formatNumberToDigits(number: number, maxLength = 4) {
  return number.toString().padStart(maxLength, '0');
}
