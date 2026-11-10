import { Booking, BookingStatus } from '../types';

/**
 * Validates Indian mobile number format (10 digits, optionally starting with +91 or 0).
 */
export function validateMobileNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Matches 10 digits starting with 6, 7, 8, or 9 (with optional 91 or 0 prefix)
  const indianMobileRegex = /^(?:0|91)?[6-9]\d{9}$/;
  return indianMobileRegex.test(cleaned);
}

/**
 * Normalizes vehicle registration number string into uppercase spaced standard format.
 * e.g. "mh08ab1234" -> "MH 08 AB 1234"
 */
export function formatRegistrationNumber(plate: string): string {
  if (!plate) return '';
  const cleaned = plate.trim().toUpperCase().replace(/[\s\-]/g, '');
  if (cleaned.length >= 6 && cleaned.length <= 11) {
    const match = cleaned.match(/^([A-Z]{2})(\d{1,2})([A-Z]{0,3})(\d{1,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join(' ');
    }
  }
  return plate.trim().toUpperCase();
}

/**
 * Checks if registration number has a reasonable length and alphanumeric characters.
 */
export function validateRegistrationNumber(plate: string): boolean {
  if (!plate) return false;
  const cleaned = plate.trim().replace(/[\s\-]/g, '');
  // Minimum 4 characters, up to 13 alphanumeric
  return /^[A-Za-z0-9]{4,13}$/.test(cleaned);
}

/**
 * Generates an automotive booking reference formatted as EEG-YYYYMMDD-XXXX
 */
export function generateBookingReference(date: Date = new Date(), randomSuffix?: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const suffix = randomSuffix || Math.floor(1000 + Math.random() * 9000).toString();
  return `EEG-${y}${m}${d}-${suffix}`;
}

/**
 * Generates properly encoded WhatsApp click-to-chat URL
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Builds prefilled service enquiry message for WhatsApp
 */
export function buildServiceWhatsAppMessage(serviceName: string, vehicleModel?: string): string {
  let msg = `Hello Engine Ear Garage! 🏍️\nI would like to enquire about: *${serviceName}*.`;
  if (vehicleModel && vehicleModel.trim()) {
    msg += `\nMy Vehicle: ${vehicleModel.trim()}`;
  }
  msg += `\nPlease let me know slot availability and estimated turnaround. Thank you!`;
  return msg;
}

/**
 * Builds prefilled booking confirmation / submission message for WhatsApp
 */
export function buildBookingWhatsAppMessage(booking: Partial<Booking>): string {
  return [
    `*ENGINE EAR GARAGE - SERVICE BOOKING REQUEST* 🏍️⚙️`,
    `Reference: *${booking.referenceNumber || 'New Request'}*`,
    `Customer Name: ${booking.customerName || 'N/A'}`,
    `Phone: ${booking.mobileNumber || 'N/A'}`,
    `Vehicle: ${booking.vehicleBrand || ''} ${booking.vehicleModel || ''} (${booking.vehicleType || 'Bike'})`,
    `Reg No: ${booking.vehicleRegistrationNumber || 'N/A'}`,
    `Requested Service: ${booking.requiredService || 'General Inspection'}`,
    `Preferred Date: ${booking.preferredDate || 'Earliest available'}`,
    `Preferred Time: ${booking.preferredTime || 'Anytime'}`,
    booking.problemDescription ? `Issue/Notes: ${booking.problemDescription}` : null,
    `\nPlease confirm slot availability. Thank you!`
  ].filter(Boolean).join('\n');
}

/**
 * Validates the online booking form data.
 */
export function validateBookingForm(data: {
  customerName: string;
  mobileNumber: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleRegistrationNumber: string;
  vehicleType: string;
  requiredService: string;
  preferredDate: string;
  preferredTime: string;
  problemDescription?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (at least 2 letters)';
  }

  if (!validateMobileNumber(data.mobileNumber)) {
    errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
  }

  if (!data.vehicleBrand || data.vehicleBrand.trim().length < 2) {
    errors.vehicleBrand = 'Please enter your vehicle brand (e.g. Royal Enfield, Honda, Ather)';
  }

  if (!data.vehicleModel || data.vehicleModel.trim().length < 1) {
    errors.vehicleModel = 'Please specify your vehicle model';
  }

  if (!validateRegistrationNumber(data.vehicleRegistrationNumber)) {
    errors.vehicleRegistrationNumber = 'Please enter a valid vehicle registration number (e.g. MH 08 AB 1234)';
  }

  if (!data.requiredService || data.requiredService.trim().length === 0) {
    errors.requiredService = 'Please select a service';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred service date';
  } else {
    const selected = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime()) || selected < today) {
      errors.preferredDate = 'Service date cannot be in the past';
    }
  }

  if (!data.preferredTime) {
    errors.preferredTime = 'Please select a preferred time slot';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Checks whether the garage is currently open based on local IST hours.
 * Mon - Sat: 9:00 AM - 8:00 PM (09:00 - 20:00)
 * Sun: 10:00 AM - 4:00 PM (10:00 - 16:00)
 */
export function isGarageOpenNow(targetDate: Date = new Date()): {
  isOpen: boolean;
  message: string;
  todayHours: string;
} {
  const day = targetDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = targetDate.getHours();
  const minute = targetDate.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  if (day === 0) {
    // Sunday: 10:00 to 16:00 (600 to 960 mins)
    const openTime = 10 * 60;
    const closeTime = 16 * 60;
    const isOpen = timeInMinutes >= openTime && timeInMinutes < closeTime;
    return {
      isOpen,
      message: isOpen ? 'Open Today until 4:00 PM' : 'Closed now · Opens Sunday 10:00 AM',
      todayHours: '10:00 AM - 4:00 PM'
    };
  } else {
    // Monday to Saturday: 09:00 to 20:00 (540 to 1200 mins)
    const openTime = 9 * 60;
    const closeTime = 20 * 60;
    const isOpen = timeInMinutes >= openTime && timeInMinutes < closeTime;
    return {
      isOpen,
      message: isOpen ? 'Open Today until 8:00 PM' : 'Closed now · Opens 9:00 AM',
      todayHours: '9:00 AM - 8:00 PM'
    };
  }
}

/**
 * Aggregates statistics for the Admin Dashboard
 */
export function calculateBookingStats(bookings: Booking[]) {
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
  return { total, pending, confirmed, completed, cancelled };
}
