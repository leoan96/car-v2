export const CAR_FEATURES = [
  'automatic',
  'manual',
  '2wd',
  '4wd',
  'RON95',
  'RON97',
  'hybrid',
  'electric',
  '4 seater',
  '2 seater',
  'bluetooth',
  'apple carplay',
  'android auto',
] as const;

export type CarFeatures = typeof CAR_FEATURES[number];
