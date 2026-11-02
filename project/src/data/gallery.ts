import { ORIGINAL_IMAGES } from '@/data/business';

export const GALLERY_CATEGORIES = [
  'All',
  'Residential',
  'Commercial',
  'Window Cleaning',
  'Exterior Cleaning',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'All'>;
  placeholder: boolean;
  aspect: 'portrait' | 'landscape' | 'square';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: ORIGINAL_IMAGES.glassInterior,
    alt: 'Clean glass windows in a modern home interior',
    category: 'Residential',
    placeholder: false,
    aspect: 'portrait',
  },
  {
    src: ORIGINAL_IMAGES.modernHouse,
    alt: 'Modern house with pool and clean windows',
    category: 'Residential',
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: ORIGINAL_IMAGES.newConstruction,
    alt: 'Windows of a new construction home',
    category: 'Residential',
    placeholder: false,
    aspect: 'square',
  },
  {
    src: ORIGINAL_IMAGES.commercialBuilding,
    alt: 'Glass windows of a commercial building',
    category: 'Commercial',
    placeholder: false,
    aspect: 'portrait',
  },
  {
    src: 'https://images.pexels.com/photos/946310/pexels-photo-946310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Placeholder: contemporary office building with glass facade',
    category: 'Commercial',
    placeholder: true,
    aspect: 'landscape',
  },
  {
    src: 'https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Placeholder: curved glass facade in an urban setting',
    category: 'Window Cleaning',
    placeholder: true,
    aspect: 'portrait',
  },
  {
    src: ORIGINAL_IMAGES.nightHouse,
    alt: 'Modern house with illuminated windows at night',
    category: 'Window Cleaning',
    placeholder: false,
    aspect: 'landscape',
  },
  {
    src: ORIGINAL_IMAGES.storyBridge,
    alt: 'Brisbane Story Bridge',
    category: 'Exterior Cleaning',
    placeholder: false,
    aspect: 'square',
  },
  {
    src: 'https://images.pexels.com/photos/5667308/pexels-photo-5667308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Placeholder: exterior of a residential building in sunlight',
    category: 'Exterior Cleaning',
    placeholder: true,
    aspect: 'portrait',
  },
  {
    src: 'https://images.pexels.com/photos/33379364/pexels-photo-33379364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Placeholder: solar panel being cleaned',
    category: 'Exterior Cleaning',
    placeholder: true,
    aspect: 'landscape',
  },
];
