import { ORIGINAL_IMAGES } from '@/data/business';

export interface ServiceImage {
  src: string;
  alt: string;
  placeholder: boolean;
}

export interface Service {
  id: string;
  name: string;
  audience: string;
  summary: string;
  details: string;
  highlights: string[];
  image: ServiceImage;
}

export const SERVICES: Service[] = [
  {
    id: 'residential-window-cleaning',
    name: 'Residential Window Cleaning',
    audience: 'Homes, townhouses and units',
    summary: 'Clean glass that lets more natural light into every room.',
    details:
      'We offer quick, efficient services covering all residential window cleaning needs. Our team ensures crystal clean, sparkling windows every time.',
    highlights: [
      'Clean, streak-free glass',
      'Window tracks, ledges and sills where included in your service',
      'Quick, efficient visits for homes, townhouses and units',
    ],
    image: {
      src: ORIGINAL_IMAGES.glassInterior,
      alt: 'Clean glass windows in a modern home interior',
      placeholder: false,
    },
  },
  {
    id: 'commercial-window-cleaning',
    name: 'Commercial Window Cleaning',
    audience: 'Offices, shops, schools and commercial properties',
    summary: 'A bright, presentable workplace with a reliable, professional team.',
    details:
      'Our team brings professional equipment and a serious approach to every commercial contract. We offer all window cleaning services for commercial properties, with flexible scheduling and after-hours availability where necessary.',
    highlights: [
      'Professional equipment for a perfect result',
      'Flexible scheduling and after-hours availability',
      'Occupational health and safety, security and confidentiality',
    ],
    image: {
      src: ORIGINAL_IMAGES.commercialBuilding,
      alt: 'Glass windows of a commercial building',
      placeholder: false,
    },
  },
  {
    id: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    audience: 'Residential and commercial properties',
    summary: 'Professional gutter cleaning from our trained team.',
    details:
      'Our trained team also specialises in gutter cleaning. Call our friendly team to find out how we can assist with your cleaning needs.',
    highlights: ['Professional gutter cleaning', 'Carried out by trained cleaners'],
    image: {
      src: 'https://images.pexels.com/photos/37386040/pexels-photo-37386040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Placeholder image for gutter cleaning',
      placeholder: true,
    },
  },
  {
    id: 'pressure-cleaning',
    name: 'Pressure Cleaning',
    audience: 'Suitable exterior surfaces',
    summary: 'Pressure cleaning for suitable exterior surfaces.',
    details:
      'Our trained team also specialises in pressure cleaning for suitable exterior surfaces. Call our friendly team to discuss what can be done for your property.',
    highlights: ['Pressure cleaning for suitable exterior surfaces', 'Carried out by trained cleaners'],
    image: {
      src: 'https://images.pexels.com/photos/4876639/pexels-photo-4876639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Placeholder image for pressure cleaning',
      placeholder: true,
    },
  },
  {
    id: 'house-washing',
    name: 'House Washing',
    audience: 'Exterior house cleaning',
    summary: 'Exterior house cleaning by a team of trained professionals.',
    details:
      'Swaincorp is a team of trained, professional cleaners offering exterior house washing. Call our friendly team to find out more.',
    highlights: ['Exterior house washing', 'Carried out by trained cleaners'],
    image: {
      src: 'https://images.pexels.com/photos/5667308/pexels-photo-5667308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Placeholder image for house washing',
      placeholder: true,
    },
  },
  {
    id: 'solar-panel-cleaning',
    name: 'Solar Panel Cleaning',
    audience: 'Residential and commercial solar systems',
    summary: 'Careful solar panel cleaning by our trained team.',
    details:
      'Swaincorp also specialises in solar panel cleaning. Call our friendly team to find out more about how we can help with your solar panels.',
    highlights: ['Solar panel cleaning', 'Carried out by trained cleaners'],
    image: {
      src: 'https://images.pexels.com/photos/33379364/pexels-photo-33379364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Placeholder image for solar panel cleaning',
      placeholder: true,
    },
  },
];

export const SERVICE_NAMES = [...SERVICES.map((service) => service.name), 'Not sure yet'];
