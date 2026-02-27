
export type Language = 'en' | 'hi';

export interface BoomLift {
  id: string;
  model: string;
  brand: string;
  platformHeight: string;
  horizontalOutreach: string;
  platformCapacity: string;
  weight: string;
  description: {
    en: string;
    hi: string;
  };
  imageUrl: string;
  features: {
    en: string[];
    hi: string[];
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    en: string;
    hi: string;
  };
}
