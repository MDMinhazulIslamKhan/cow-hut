export type Location =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type Breed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type Category = 'Dairy' | 'Beef' | 'Dual Purpose';

export type Label = 'sale' | 'sold out';

export const cowLabel: Label[] = ['sale', 'sold out'];

export const cowCategory: Category[] = ['Beef', 'Dairy', 'Dual Purpose'];

export const cowLocation: Location[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowBreed: Breed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const cowFilterableField = [
  'location',
  'breed',
  'category',
  'age',
  'price',
  'age',
  'weight',
  'label',
];
