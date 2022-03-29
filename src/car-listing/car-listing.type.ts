export const CAR_BRANDS = [
  'Audi',
  'BMW',
  'Honda',
  'Isuzu',
  'Mazda',
  'Mercedes',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Perodua',
  'Proton',
  'Toyota',
  'Volkswagen',
] as const;

export type CarBrands = typeof CAR_BRANDS[number];
