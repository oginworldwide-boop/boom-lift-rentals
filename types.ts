
export type Language = 'en' | 'hi';

export interface BoomLift {
  id: string;
  /** URL segment for /fleet/[slug]. Stored explicitly, never derived: these URLs are
   *  permanent once indexed, and deriving them from `model` would let an edit to a
   *  display name silently change a live URL. */
  slug: string;
  model: string;
  brand: string;
  platformHeight: string;
  horizontalOutreach: string;
  platformCapacity: string;
  weight: string;
  /** Numeric forms of the four specs above, for JSON-LD QuantitativeValue and for
   *  sorting. Every value is an exact transcription of the display string beside it —
   *  no rounding, no conversion, nothing sourced from anywhere else. */
  heightM: number;
  outreachM: number;
  capacityKg: number;
  weightKg: number;
  /** The manufacturer's nominal height in feet, as it appears in the model designation
   *  (660SJ -> 66, S-60 J -> 60). This is a naming/search term, NOT a measured spec:
   *  use `platformHeight` or `heightM` whenever an actual figure is being stated. */
  nominalHeightFt: number;
  description: {
    en: string;
    hi: string;
  };
  imageUrl: string;
  /** Intrinsic pixel dimensions of imageUrl, measured from the file. Rendered as
   *  width/height attributes so the browser reserves the right aspect ratio and the
   *  image does not shift the layout as it loads. */
  imageWidth: number;
  imageHeight: number;
  features: {
    en: string[];
    hi: string[];
  };
}

export interface ContactInfo {
  phone: string;
  phone2: string;
  email: string;
  address: {
    en: string;
    hi: string;
  };
}
