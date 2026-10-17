import type { Product } from '../types'

const image = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=85`

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Apple',
    category: 'Fruits',
    price: '$2.76',
    description: 'A crisp, bright fruit for the everyday basket.',
    imageUrl: image('photo-1560806887-1e4cd0b6cbd6'),
  },
  {
    id: 2,
    name: 'Cheese',
    category: 'Dairy',
    price: '$6.38',
    description: 'A creamy table cheese with a mellow finish.',
    imageUrl: image('photo-1486297678162-eb2a19b0a32d'),
  },
  {
    id: 3,
    name: 'Orange',
    category: 'Fruits',
    price: '$4.85',
    description: 'Sun-bright citrus with a fresh, zesty peel.',
    imageUrl: image('photo-1547514701-42782101795e'),
  },
  {
    id: 4,
    name: 'Tomato',
    category: 'Vegetables',
    price: '$5.01',
    description: 'A ripe kitchen staple for salads and sauces.',
    imageUrl: image('photo-1546094096-0df4bcaaa337'),
  },
  {
    id: 5,
    name: 'Table Cloth',
    category: 'Kitchen Essentials',
    price: '$6.13',
    description: 'A simple woven layer for the dining table.',
    imageUrl: image('photo-1600210492486-724fe5c67fb0'),
  },
  {
    id: 6,
    name: 'Cranberries - Frozen',
    category: 'Fruits',
    price: '$7.08',
    description: 'Tart berries ready for baking or blending.',
    imageUrl: image('photo-1570913149827-d2ac84ab3f9a'),
  },
  {
    id: 7,
    name: 'Angular 7 Book',
    category: 'Books',
    price: '$6.89',
    description: 'A well-thumbed guide to frontend fundamentals.',
    imageUrl: image('photo-1512820790803-83ca734da794'),
  },
  {
    id: 8,
    name: 'NFS - PS4 Game',
    category: 'Games',
    price: '$9.48',
    description: 'A fast-paced racing game for a quiet evening.',
    imageUrl: image('photo-1493711662062-fa541adb3fc8'),
  },
  {
    id: 9,
    name: 'Pepper',
    category: 'Grocery',
    price: '$5.51',
    description: 'A fragrant pantry seasoning with a little bite.',
    imageUrl: image('photo-1563565375-f3fdfdbefa83'),
  },
  {
    id: 10,
    name: 'Potatoes - Organic',
    category: 'Vegetables',
    price: '$9.63',
    description: 'Earthy, versatile potatoes for weeknight meals.',
    imageUrl: image('photo-1518977676601-b53f82aba655'),
  },
]

export const getProduct = (productId: number) =>
  PRODUCTS.find((product) => product.id === productId)
