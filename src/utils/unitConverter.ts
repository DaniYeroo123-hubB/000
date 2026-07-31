import { UnitCategory } from '../types';

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    units: [
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Micrometer', symbol: 'µm', factor: 1e-6 },
      { name: 'Nanometer', symbol: 'nm', factor: 1e-9 },
      { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
    ],
  },
  {
    name: 'Mass',
    units: [
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Milligram', symbol: 'mg', factor: 1e-6 },
      { name: 'Metric Ton', symbol: 't', factor: 1000 },
      { name: 'Pound', symbol: 'lb', factor: 0.45359237 },
      { name: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      { name: 'Stone', symbol: 'st', factor: 6.35029318 },
    ],
  },
  {
    name: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1, offset: 0 },
      { name: 'Fahrenheit', symbol: '°F', factor: 5 / 9, offset: -32 },
      { name: 'Kelvin', symbol: 'K', factor: 1, offset: -273.15 },
    ],
  },
  {
    name: 'Area',
    units: [
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Kilometer', symbol: 'km²', factor: 1e6 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 1e-4 },
      { name: 'Hectare', symbol: 'ha', factor: 10000 },
      { name: 'Acre', symbol: 'ac', factor: 4046.8564224 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.09290304 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
    ],
  },
  {
    name: 'Volume',
    units: [
      { name: 'Cubic Meter', symbol: 'm³', factor: 1 },
      { name: 'Liter', symbol: 'L', factor: 0.001 },
      { name: 'Milliliter', symbol: 'mL', factor: 1e-6 },
      { name: 'Gallon (US)', symbol: 'gal', factor: 0.00378541 },
      { name: 'Quart (US)', symbol: 'qt', factor: 0.000946353 },
      { name: 'Pint (US)', symbol: 'pt', factor: 0.000473176 },
      { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 2.95735e-5 },
      { name: 'Cubic Foot', symbol: 'ft³', factor: 0.0283168 },
    ],
  },
  {
    name: 'Speed',
    units: [
      { name: 'Meters per second', symbol: 'm/s', factor: 1 },
      { name: 'Kilometers per hour', symbol: 'km/h', factor: 1 / 3.6 },
      { name: 'Miles per hour', symbol: 'mph', factor: 0.44704 },
      { name: 'Knot', symbol: 'kn', factor: 0.514444 },
      { name: 'Foot per second', symbol: 'ft/s', factor: 0.3048 },
    ],
  },
  {
    name: 'Pressure',
    units: [
      { name: 'Pascal', symbol: 'Pa', factor: 1 },
      { name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { name: 'Bar', symbol: 'bar', factor: 100000 },
      { name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { name: 'PSI', symbol: 'psi', factor: 6894.757 },
      { name: 'Torr (mmHg)', symbol: 'Torr', factor: 133.322 },
    ],
  },
  {
    name: 'Data Storage',
    units: [
      { name: 'Byte', symbol: 'B', factor: 1 },
      { name: 'Kilobyte', symbol: 'KB', factor: 1024 },
      { name: 'Megabyte', symbol: 'MB', factor: 1024 * 1024 },
      { name: 'Gigabyte', symbol: 'GB', factor: 1024 * 1024 * 1024 },
      { name: 'Terabyte', symbol: 'TB', factor: 1024 * 1024 * 1024 * 1024 },
    ],
  },
];

export function convertValue(
  value: number,
  categoryName: string,
  fromUnitSymbol: string,
  toUnitSymbol: string
): number {
  const cat = UNIT_CATEGORIES.find((c) => c.name === categoryName);
  if (!cat) return value;

  const uFrom = cat.units.find((u) => u.symbol === fromUnitSymbol);
  const uTo = cat.units.find((u) => u.symbol === toUnitSymbol);
  if (!uFrom || !uTo) return value;

  if (categoryName === 'Temperature') {
    // Celsius base
    let celsius = value;
    if (fromUnitSymbol === '°F') celsius = (value - 32) * (5 / 9);
    else if (fromUnitSymbol === 'K') celsius = value - 273.15;

    if (toUnitSymbol === '°C') return celsius;
    if (toUnitSymbol === '°F') return celsius * (9 / 5) + 32;
    if (toUnitSymbol === 'K') return celsius + 273.15;
    return celsius;
  }

  // Standard factor conversion
  const baseValue = value * uFrom.factor;
  return baseValue / uTo.factor;
}
