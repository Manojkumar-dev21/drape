export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  tags: string[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Retro Wave Graphic Tee',
    slug: 'retro-wave-graphic-tee',
    category: 'tee',
    description: 'Oversized graphic tee featuring a bold retro arcade print. Premium heavyweight cotton with a boxy fit that drapes effortlessly.',
    price: 2499,
    comparePrice: 3299,
    images: ['/products/tee.png'],
    colors: [
      { name: 'Cream', hex: '#F0ECE4' },
      { name: 'Black', hex: '#1A1A18' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['graphic', 'oversized', 'bestseller'],
  },
  {
    id: '2',
    name: 'Essential Black Tee',
    slug: 'essential-black-tee',
    category: 'tee',
    description: 'The perfect black tee. 220 GSM organic cotton, relaxed fit, ribbed collar. A wardrobe foundation piece.',
    price: 1499,
    images: ['/products/tee.png'],
    colors: [
      { name: 'Black', hex: '#1A1A18' },
      { name: 'Charcoal', hex: '#3A3A38' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['essential', 'organic'],
  },
  {
    id: '3',
    name: 'Cloud White Tee',
    slug: 'cloud-white-tee',
    category: 'tee',
    description: 'Ultra-soft supima cotton in a clean white. Minimal stitching, invisible seams, designed to be lived in.',
    price: 1499,
    images: ['/products/tee.png'],
    colors: [
      { name: 'White', hex: '#FAFAFA' },
      { name: 'Off-White', hex: '#F0ECE4' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['essential', 'minimal'],
  },
  {
    id: '4',
    name: 'Wide-Leg Cargo Shorts',
    slug: 'wide-leg-cargo-shorts',
    category: 'pants',
    description: 'Relaxed wide-leg shorts in washed khaki. Cargo pockets with magnetic closures. Adjustable drawstring waist.',
    price: 2999,
    comparePrice: 3999,
    images: ['/products/pants.png'],
    colors: [
      { name: 'Khaki', hex: '#C4A882' },
      { name: 'Stone', hex: '#9E9C96' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['cargo', 'relaxed'],
  },
  {
    id: '5',
    name: 'Lavender Button-Up',
    slug: 'lavender-button-up',
    category: 'shirt',
    description: 'Soft lavender oxford shirt with mother-of-pearl buttons. Tailored but relaxed. Perfect for layering or solo wear.',
    price: 3499,
    images: ['/products/shirt.png'],
    colors: [
      { name: 'Lavender', hex: '#B8A9C9' },
      { name: 'Powder Blue', hex: '#B0C4DE' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['oxford', 'layering'],
  },
  {
    id: '6',
    name: 'Light Blue Overshirt',
    slug: 'light-blue-overshirt',
    category: 'shirt',
    description: 'Structured overshirt in washed light blue. Dual chest pockets, snapped cuffs. Outerwear meets shirting.',
    price: 3999,
    images: ['/products/shirt.png'],
    colors: [
      { name: 'Light Blue', hex: '#B0C4DE' },
      { name: 'Navy', hex: '#2C3E50' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['overshirt', 'layering'],
  },
  {
    id: '7',
    name: 'Cinema Print Tee',
    slug: 'cinema-print-tee',
    category: 'tee',
    description: 'Dark movie-print graphic tee with cinematic imagery. Heavyweight cotton, oversized fit, statement piece.',
    price: 2499,
    images: ['/products/tee.png'],
    colors: [
      { name: 'Black', hex: '#1A1A18' },
      { name: 'Dark Grey', hex: '#2A2A28' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['graphic', 'oversized', 'cinema'],
  },
  {
    id: '8',
    name: 'Ash Grey Essential',
    slug: 'ash-grey-essential',
    category: 'tee',
    description: 'Muted ash grey tee in garment-dyed cotton. Soft hand-feel, slightly oversized, the quiet essential.',
    price: 1699,
    images: ['/products/tee.png'],
    colors: [
      { name: 'Ash Grey', hex: '#9E9C96' },
      { name: 'Warm Grey', hex: '#B0ADA6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['essential', 'garment-dyed'],
  },
]
