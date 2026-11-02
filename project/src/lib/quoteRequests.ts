import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SERVICE_NAMES } from '@/data/services';

export const PROPERTY_TYPES = ['Residential', 'Commercial'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const TIMEFRAME_OPTIONS = [
  'As soon as possible',
  'Within the next week',
  'Within the next 2 to 4 weeks',
  'Flexible, no rush',
];

export const PHOTO_BUCKET = 'quote-photos';
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export interface QuoteFormValues {
  fullName: string;
  email: string;
  phone: string;
  propertyType: PropertyType | '';
  service: string;
  suburb: string;
  timeframe: string;
  message: string;
  consent: boolean;
  website: string;
}

export type QuoteField = keyof QuoteFormValues | 'photo';
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const EMPTY_QUOTE_VALUES: QuoteFormValues = {
  fullName: '',
  email: '',
  phone: '',
  propertyType: '',
  service: '',
  suburb: '',
  timeframe: '',
  message: '',
  consent: false,
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{6,30}$/;

export function validateQuote(values: QuoteFormValues, photo: File | null): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const suburb = values.suburb.trim();

  if (name.length < 2 || name.length > 120) errors.fullName = 'Please enter your full name.';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';
  if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, '').length < 6) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.propertyType) errors.propertyType = 'Please choose a property type.';
  if (!SERVICE_NAMES.includes(values.service)) errors.service = 'Please choose a service.';
  if (suburb.length < 2 || suburb.length > 120) errors.suburb = 'Please enter your suburb or postcode.';
  if (!TIMEFRAME_OPTIONS.includes(values.timeframe)) errors.timeframe = 'Please choose a preferred timeframe.';
  if (values.message.trim().length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  if (photo && photo.size > MAX_PHOTO_BYTES) errors.photo = 'Photos must be 5 MB or smaller.';
  if (photo && !ALLOWED_PHOTO_TYPES.includes(photo.type)) {
    errors.photo = 'Please upload a JPEG, PNG, WebP or HEIC image.';
  }
  if (!values.consent) errors.consent = 'Please agree to the privacy acknowledgement to continue.';

  return errors;
}

function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
}

export async function submitQuote(values: QuoteFormValues, photo: File | null): Promise<void> {
  if (values.website.trim()) return;
  if (!isSupabaseConfigured) {
    throw new Error('Online enquiries are temporarily unavailable. Please call 1800 954 222.');
  }

  let photoPath: string | null = null;
  if (photo) {
    const path = `${crypto.randomUUID()}/${safeFileName(photo.name)}`;
    const { error } = await supabase.storage
      .from(PHOTO_BUCKET)
      .upload(path, photo, { contentType: photo.type });
    if (error) {
      throw new Error('We could not upload your photo. Please try again, or send your request without it.');
    }
    photoPath = path;
  }

  const { error } = await supabase.from('quote_requests').insert({
    full_name: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    property_type: values.propertyType,
    service: values.service,
    suburb: values.suburb.trim(),
    timeframe: values.timeframe,
    message: values.message.trim() || null,
    photo_path: photoPath,
    consent: true,
    source: 'website',
  });

  if (error) {
    throw new Error('Your request could not be sent. Please try again, or call 1800 954 222.');
  }
}
