export default function roundToDecimalPlaces(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  }