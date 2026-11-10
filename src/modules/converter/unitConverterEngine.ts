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
    label: 'Panjang (Length)',
    baseUnit: 'm',
    units: [
      { id: 'km', name: 'Kilometer', symbol: 'km', ratioToBase: 1000 },
      { id: 'm', name: 'Meter', symbol: 'm', ratioToBase: 1 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'mi', name: 'Mil (Mile)', symbol: 'mi', ratioToBase: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', ratioToBase: 0.9144 },
      { id: 'ft', name: 'Kaki (Foot)', symbol: 'ft', ratioToBase: 0.3048 },
      { id: 'in', name: 'Inci (Inch)', symbol: 'in', ratioToBase: 0.0254 },
    ],
  },
  weight: {
    label: 'Berat & Massa',
    baseUnit: 'kg',
    units: [
      { id: 't', name: 'Ton Metrik', symbol: 't', ratioToBase: 1000 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', ratioToBase: 1 },
      { id: 'g', name: 'Gram', symbol: 'g', ratioToBase: 0.001 },
      { id: 'mg', name: 'Miligram', symbol: 'mg', ratioToBase: 0.000001 },
      { id: 'lb', name: 'Pound (Pon)', symbol: 'lb', ratioToBase: 0.45359237 },
      { id: 'oz', name: 'Ons (Ounce)', symbol: 'oz', ratioToBase: 0.02834952 },
    ],
  },
  temperature: {
    label: 'Suhu (Temperature)',
    baseUnit: 'C',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', ratioToBase: 1 },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', ratioToBase: 1 },
      { id: 'K', name: 'Kelvin', symbol: 'K', ratioToBase: 1 },
      { id: 'R', name: 'Reamur', symbol: '°Ré', ratioToBase: 1 },
    ],
  },
  area: {
    label: 'Luas (Area)',
    baseUnit: 'm²',
    units: [
      { id: 'km2', name: 'Kilometer Persegi', symbol: 'km²', ratioToBase: 1000000 },
      { id: 'ha', name: 'Hektar', symbol: 'ha', ratioToBase: 10000 },
      { id: 'm2', name: 'Meter Persegi', symbol: 'm²', ratioToBase: 1 },
      { id: 'ac', name: 'Acre', symbol: 'ac', ratioToBase: 4046.856 },
      { id: 'ft2', name: 'Kaki Persegi', symbol: 'ft²', ratioToBase: 0.092903 },
    ],
  },
  volume: {
    label: 'Volume',
    baseUnit: 'l',
    units: [
      { id: 'm3', name: 'Meter Kubik', symbol: 'm³', ratioToBase: 1000 },
      { id: 'l', name: 'Liter', symbol: 'L', ratioToBase: 1 },
      { id: 'ml', name: 'Mililiter', symbol: 'mL', ratioToBase: 0.001 },
      { id: 'gal', name: 'Galon US', symbol: 'gal', ratioToBase: 3.78541 },
      { id: 'fl_oz', name: 'Fluid Ounce', symbol: 'fl oz', ratioToBase: 0.0295735 },
      { id: 'cup', name: 'Cangkir (Cup)', symbol: 'cup', ratioToBase: 0.24 },
    ],
  },
  speed: {
    label: 'Kecepatan (Speed)',
    baseUnit: 'km/h',
    units: [
      { id: 'kmh', name: 'Kilometer / Jam', symbol: 'km/h', ratioToBase: 1 },
      { id: 'ms', name: 'Meter / Detik', symbol: 'm/s', ratioToBase: 3.6 },
      { id: 'mph', name: 'Mil / Jam (mph)', symbol: 'mph', ratioToBase: 1.60934 },
      { id: 'knot', name: 'Knot', symbol: 'kn', ratioToBase: 1.852 },
    ],
  },
  time: {
    label: 'Waktu (Time)',
    baseUnit: 's',
    units: [
      { id: 'yr', name: 'Tahun', symbol: 'thn', ratioToBase: 31536000 },
      { id: 'mo', name: 'Bulan', symbol: 'bln', ratioToBase: 2592000 },
      { id: 'wk', name: 'Minggu', symbol: 'mgg', ratioToBase: 604800 },
      { id: 'd', name: 'Hari', symbol: 'hr', ratioToBase: 86400 },
      { id: 'hr', name: 'Jam', symbol: 'jam', ratioToBase: 3600 },
      { id: 'min', name: 'Menit', symbol: 'mnt', ratioToBase: 60 },
      { id: 's', name: 'Detik', symbol: 'det', ratioToBase: 1 },
      { id: 'ms', name: 'Milidetik', symbol: 'ms', ratioToBase: 0.001 },
    ],
  },
  energy: {
    label: 'Energi (Energy)',
    baseUnit: 'J',
    units: [
      { id: 'kwh', name: 'Kilowatt-jam', symbol: 'kWh', ratioToBase: 3600000 },
      { id: 'kcal', name: 'Kilokalori', symbol: 'kcal', ratioToBase: 4184 },
      { id: 'cal', name: 'Kalori', symbol: 'cal', ratioToBase: 4.184 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', ratioToBase: 1000 },
      { id: 'j', name: 'Joule', symbol: 'J', ratioToBase: 1 },
    ],
  },
  pressure: {
    label: 'Tekanan (Pressure)',
    baseUnit: 'Pa',
    units: [
      { id: 'bar', name: 'Bar', symbol: 'bar', ratioToBase: 100000 },
      { id: 'atm', name: 'Atmosfer Standar', symbol: 'atm', ratioToBase: 101325 },
      { id: 'psi', name: 'Pound / Inci Persegi (psi)', symbol: 'psi', ratioToBase: 6894.76 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', ratioToBase: 1000 },
      { id: 'pa', name: 'Pascal', symbol: 'Pa', ratioToBase: 1 },
    ],
  },
  data: {
    label: 'Penyimpanan Data (Storage)',
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
