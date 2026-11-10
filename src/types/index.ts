export type VehicleType = 'Bike' | 'Electric Scooter';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Bike' | 'Electric Scooter' | 'General' | 'Repair';
  shortDescription: string;
  fullDescription: string;
  estimatedDuration: string;
  priceNote: string; // e.g. "Starting from ₹499" or "Estimate upon inspection"
  icon: string;
  image?: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  referenceNumber: string;
  customerName: string;
  mobileNumber: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleRegistrationNumber: string;
  vehicleType: VehicleType;
  requiredService: string;
  preferredDate: string;
  preferredTime: string;
  problemDescription: string;
  status: BookingStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  vehicleModel: string;
  rating: number; // 1 to 5
  reviewText: string;
  date: string;
  approved: boolean;
  verifiedCustomer?: boolean;
}

export interface GarageVlog {
  id: string;
  title: string;
  category: 'Bike Maintenance Tips' | 'Engine Care' | 'Electric Scooter Tips' | 'Bike Repair Videos' | 'Garage Vlogs';
  youtubeId: string;
  description: string;
  readTimeOrDuration: string;
  date: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Servicing' | 'Engine Repair' | 'Electric Scooter' | 'Team & Tools';
  imageUrl: string;
  description: string;
}

export interface BusinessDetails {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  googleReviewUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
}

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
