export interface Turf {
  id: string;
  name: string;
  image: string;
  distance: number;
  rating: number;
  pricePerHour: number;
  address: string;
  isFavorite: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  price: number;
}

export interface TurfDetails extends Turf {
  description?: string;
  amenities?: string[];
  images?: string[];
  openTime?: string;
  closeTime?: string;
  timeSlots?: TimeSlot[];
}