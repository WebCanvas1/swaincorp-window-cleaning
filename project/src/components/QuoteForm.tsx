import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, ImagePlus, Loader2, X } from 'lucide-react';
import { SERVICE_NAMES } from '@/data/services';
import {
  ALLOWED_PHOTO_TYPES,
  EMPTY_QUOTE_VALUES,
  PROPERTY_TYPES,
  TIMEFRAME_OPTIONS,
  submitQuote,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteFormValues,
} from '@/lib/quoteRequests';

const MIN_FILL_MS = 2000;

const inputClass =
  'w-full border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-base text-charcoal placeholder:text-graphite/60 transition-colors duration-300 hover:border-charcoal/40 focus:border-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold aria-[invalid=true]:border-error';

interface QuoteFormProps {
  selectedService: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function QuoteForm({ selectedService }: QuoteFormProps) {
  const [values, setValues] = useState<QuoteFormValues>({ ...EMPTY_QUOTE_VALUES, service: selectedService });
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (selectedService) setValues((current) => ({ ...current, service: selectedService }));
  }, [selectedService]);

  const update = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handlePhoto = (file: File | null) => {
    setPhoto(file);
    if (errors.photo) setErrors((current) => ({ ...current, photo: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateQuote(values, photo);
    setErrors(found);
    setServerError('');
    if (Object.keys(found).length > 0) {
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus('submitting');
    const submitted = Date.now() - startedAt.current < MIN_FILL_MS ? { ...values, website: 'automated' } : values;
    try {
      await submitQuote(submitted, photo);
      setStatus('success');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const resetForm = () => {
    setValues({ ...EMPTY_QUOTE_VALUES, service: selectedService });
    setPhoto(null);
    setErrors({});
    setStatus('idle');
    startedAt.current = Date.now();
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center bg-white p-8 sm:p-14">
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="mt-8 font-display text-4xl font-medium leading-tight">Thank you, your request is in.</h3>
        <p className="mt-5 max-w-md text-base leading-[1.5] text-graphite">
          We have received your details and our team will be in touch to discuss your cleaning requirements. If your
          enquiry is urgent, please call us on 1800 954 222.
        </p>
        <button type="button" onClick={resetForm} className="btn-secondary mt-10">
          Send another request
        </button>
      </div>
    );
  }

  const describedBy = (field: QuoteField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 lg:p-12" aria-label="Request a quote">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName} id="fullName" fieldKey="fullName" describedBy={describedBy}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => update('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
            className={inputClass}
          />
        </Field>

        <Field label="Email" error={errors.email} id="email" fieldKey="email" describedBy={describedBy}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass}
          />
        </Field>

        <Field label="Phone" error={errors.phone} id="phone" fieldKey="phone" describedBy={describedBy}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className={inputClass}
          />
        </Field>

        <Field label="Suburb / postcode" error={errors.suburb} id="suburb" fieldKey="suburb" describedBy={describedBy}>
          <input
            id="suburb"
            name="suburb"
            autoComplete="address-level2"
            value={values.suburb}
            onChange={(event) => update('suburb', event.target.value)}
            aria-invalid={Boolean(errors.suburb)}
            aria-describedby={describedBy('suburb')}
            className={inputClass}
          />
        </Field>

        <Field label="Property type" error={errors.propertyType} id="propertyType" fieldKey="propertyType" describedBy={describedBy}>
          <div role="radiogroup" aria-labelledby="propertyType-label" className="grid grid-cols-2 gap-3">
            {PROPERTY_TYPES.map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center justify-center border px-4 py-3.5 font-sans text-sm font-medium transition-all duration-300 ${
                  values.propertyType === type
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/15 text-charcoal hover:border-charcoal/40'
                }`}
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={values.propertyType === type}
                  onChange={() => update('propertyType', type)}
                  className="sr-only"
                />
                {type}
              </label>
            ))}
          </div>
        </Field>

        <Field label="Required service" error={errors.service} id="service" fieldKey="service" describedBy={describedBy}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => update('service', event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy('service')}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select a service</option>
            {SERVICE_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred timeframe" error={errors.timeframe} id="timeframe" fieldKey="timeframe" describedBy={describedBy}>
          <select
            id="timeframe"
            name="timeframe"
            value={values.timeframe}
            onChange={(event) => update('timeframe', event.target.value)}
            aria-invalid={Boolean(errors.timeframe)}
            aria-describedby={describedBy('timeframe')}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select a timeframe</option>
            {TIMEFRAME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message (optional)" error={errors.message} id="message" fieldKey="message" describedBy={describedBy}>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy('message')}
              placeholder="Tell us about the number of windows, levels or anything we should know."
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <span id="photo-label" className="block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
            Photo (optional)
          </span>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="inline-flex cursor-pointer items-center gap-3 border border-dashed border-charcoal/30 px-5 py-3.5 font-sans text-sm text-graphite transition-colors hover:border-charcoal hover:text-charcoal focus-within:ring-2 focus-within:ring-gold">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              {photo ? 'Change photo' : 'Attach a photo'}
              <input
                type="file"
                name="photo"
                accept={ALLOWED_PHOTO_TYPES.join(',')}
                aria-labelledby="photo-label"
                aria-invalid={Boolean(errors.photo)}
                aria-describedby={describedBy('photo')}
                className="sr-only"
                onChange={(event) => handlePhoto(event.target.files?.[0] ?? null)}
              />
            </label>
            {photo && (
              <span className="inline-flex items-center gap-2 text-sm text-charcoal">
                {photo.name}
                <button
                  type="button"
                  onClick={() => handlePhoto(null)}
                  aria-label="Remove photo"
                  className="flex h-8 w-8 items-center justify-center text-graphite transition-colors hover:text-charcoal"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            )}
          </div>
          <FieldError id="photo-error" message={errors.photo} />
        </div>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-4 text-sm leading-[1.5] text-graphite">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
            className="mt-1 h-4 w-4 shrink-0 accent-charcoal"
          />
          <span>
            I agree that Swaincorp Window Cleaning may contact me about this enquiry, and I have read the Privacy
            Policy.
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={(event) => update('website', event.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {status === 'error' && (
        <p role="alert" className="mt-8 border-l-2 border-error bg-error/5 px-5 py-4 text-sm text-error">
          {serverError}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-[1.5] text-graphite">Your details are only used to respond to this enquiry.</p>
        <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:cursor-wait disabled:opacity-70">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            'Request My Quote'
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  fieldKey: QuoteField;
  error?: string;
  describedBy: (field: QuoteField) => string | undefined;
  children: ReactNode;
}

function Field({ label, id, fieldKey, error, describedBy, children }: FieldProps) {
  return (
    <div>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-charcoal"
      >
        {label}
      </label>
      <div className="mt-3">{children}</div>
      <FieldError id={describedBy(fieldKey) ?? `${fieldKey}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {message}
    </p>
  );
}
