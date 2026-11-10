export type UnitCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'energy'
  | 'pressure'
  | 'data';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  ratioToBase: number; // Multiply by this to get base unit
  offset?: number;     // For temperature
}

export const UNIT_CATEGORIES: Record<
  UnitCategory,
  { label: string; baseUnit: string; units: UnitDefinition[] }
> = {
  length: {
    label: 'Length',
    baseUnit: 'm',
    units: [
      { id: 'km', name: 'Kilometer', symbol: 'km', ratioToBase: 1000 },
      { id: 'm', name: 'Meter', symbol: 'm', ratioToBase: 1 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', ratioToBase: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', ratioToBase: 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', ratioToBase: 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', ratioToBase: 0.0254 },
    ],
  },
  weight: {
    label: 'Weight & Mass',
    baseUnit: 'kg',
    units: [
      { id: 't', name: 'Metric Ton', symbol: 't', ratioToBase: 1000 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', ratioToBase: 1 },
      { id: 'g', name: 'Gram', symbol: 'g', ratioToBase: 0.001 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', ratioToBase: 0.000001 },
      { id: 'lb', name: 'Pound', symbol: 'lb', ratioToBase: 0.45359237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', ratioToBase: 0.02834952 },
    ],
  },
  temperature: {
    label: 'Temperature',
    baseUnit: 'C',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', ratioToBase: 1 },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', ratioToBase: 1 },
      { id: 'K', name: 'Kelvin', symbol: 'K', ratioToBase: 1 },
      { id: 'R', name: 'Reamur', symbol: '°Ré', ratioToBase: 1 },
    ],
  },
  area: {
    label: 'Area',
    baseUnit: 'm²',
    units: [
      { id: 'km2', name: 'Square Kilometer', symbol: 'km²', ratioToBase: 1000000 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', ratioToBase: 10000 },
      { id: 'm2', name: 'Square Meter', symbol: 'm²', ratioToBase: 1 },
      { id: 'ac', name: 'Acre', symbol: 'ac', ratioToBase: 4046.856 },
      { id: 'ft2', name: 'Square Foot', symbol: 'ft²', ratioToBase: 0.092903 },
    ],
  },
  volume: {
    label: 'Volume',
    baseUnit: 'l',
    units: [
      { id: 'm3', name: 'Cubic Meter', symbol: 'm³', ratioToBase: 1000 },
      { id: 'l', name: 'Liter', symbol: 'L', ratioToBase: 1 },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', ratioToBase: 0.001 },
      { id: 'gal', name: 'US Gallon', symbol: 'gal', ratioToBase: 3.78541 },
      { id: 'fl_oz', name: 'Fluid Ounce', symbol: 'fl oz', ratioToBase: 0.0295735 },
      { id: 'cup', name: 'Cup', symbol: 'cup', ratioToBase: 0.24 },
    ],
  },
  speed: {
    label: 'Speed',
    baseUnit: 'km/h',
    units: [
      { id: 'kmh', name: 'Kilometer / Hour', symbol: 'km/h', ratioToBase: 1 },
      { id: 'ms', name: 'Meter / Second', symbol: 'm/s', ratioToBase: 3.6 },
      { id: 'mph', name: 'Miles / Hour', symbol: 'mph', ratioToBase: 1.60934 },
      { id: 'knot', name: 'Knot', symbol: 'kn', ratioToBase: 1.852 },
    ],
  },
  time: {
    label: 'Time',
    baseUnit: 's',
    units: [
      { id: 'yr', name: 'Year (365d)', symbol: 'yr', ratioToBase: 31536000 },
      { id: 'mo', name: 'Month (30d)', symbol: 'mo', ratioToBase: 2592000 },
      { id: 'wk', name: 'Week', symbol: 'wk', ratioToBase: 604800 },
      { id: 'd', name: 'Day', symbol: 'd', ratioToBase: 86400 },
      { id: 'hr', name: 'Hour', symbol: 'hr', ratioToBase: 3600 },
      { id: 'min', name: 'Minute', symbol: 'min', ratioToBase: 60 },
      { id: 's', name: 'Second', symbol: 's', ratioToBase: 1 },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', ratioToBase: 0.001 },
    ],
  },
  energy: {
    label: 'Energy',
    baseUnit: 'J',
    units: [
      { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', ratioToBase: 3600000 },
      { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', ratioToBase: 4184 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', ratioToBase: 4.184 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', ratioToBase: 1000 },
      { id: 'j', name: 'Joule', symbol: 'J', ratioToBase: 1 },
    ],
  },
  pressure: {
    label: 'Pressure',
    baseUnit: 'Pa',
    units: [
      { id: 'bar', name: 'Bar', symbol: 'bar', ratioToBase: 100000 },
      { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', ratioToBase: 101325 },
      { id: 'psi', name: 'Pound / Square Inch', symbol: 'psi', ratioToBase: 6894.76 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', ratioToBase: 1000 },
      { id: 'pa', name: 'Pascal', symbol: 'Pa', ratioToBase: 1 },
    ],
  },
  data: {
    label: 'Data Storage',
    baseUnit: 'B',
    units: [
      { id: 'pb', name: 'Petabyte', symbol: 'PB', ratioToBase: 1024 ** 5 },
      { id: 'tb', name: 'Terabyte', symbol: 'TB', ratioToBase: 1024 ** 4 },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', ratioToBase: 1024 ** 3 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', ratioToBase: 1024 ** 2 },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', ratioToBase: 1024 },
      { id: 'b', name: 'Byte', symbol: 'B', ratioToBase: 1 },
      { id: 'bit', name: 'Bit', symbol: 'bit', ratioToBase: 0.125 },
    ],
  },
};

export function convertUnits(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  val: number
): number {
  if (isNaN(val)) return 0;
  if (fromUnitId === toUnitId) return val;

  // Temperature has non-linear conversions
  if (category === 'temperature') {
    let celsius = 0;
    if (fromUnitId === 'C') celsius = val;
    else if (fromUnitId === 'F') celsius = ((val - 32) * 5) / 9;
    else if (fromUnitId === 'K') celsius = val - 273.15;
    else if (fromUnitId === 'R') celsius = (val * 5) / 4;

    if (toUnitId === 'C') return celsius;
    if (toUnitId === 'F') return (celsius * 9) / 5 + 32;
    if (toUnitId === 'K') return celsius + 273.15;
    if (toUnitId === 'R') return (celsius * 4) / 5;
    return celsius;
  }

  const categoryDef = UNIT_CATEGORIES[category];
  const fromDef = categoryDef.units.find((u) => u.id === fromUnitId);
  const toDef = categoryDef.units.find((u) => u.id === toUnitId);

  if (!fromDef || !toDef || toDef.ratioToBase === 0) return 0;

  const inBase = val * fromDef.ratioToBase;
  return inBase / toDef.ratioToBase;
}
