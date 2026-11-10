import React, { useState, useEffect } from 'react';
import { useGarage } from '../context/GarageContext';
import { VehicleType, Booking } from '../types';
import {
  validateBookingForm,
  formatRegistrationNumber,
  generateWhatsAppUrl,
  buildBookingWhatsAppMessage,
} from '../utils/booking';
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

const COMMON_BIKE_BRANDS = [
  'Royal Enfield',
  'Honda',
  'Yamaha',
  'Bajaj',
  'KTM',
  'TVS',
  'Suzuki',
  'Hero MotoCorp',
  'Jawa / Yezdi',
  'Ather Energy',
  'Ola Electric',
  'TVS iQube',
  'Bajaj Chetak EV',
  'Other',
];

const TIME_SLOTS = [
  'Morning (9:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 3:00 PM)',
  'Evening (3:00 PM – 7:00 PM)',
];

export const BookingForm: React.FC = () => {
  const {
    services,
    createBooking,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    businessDetails,
    setCurrentView,
  } = useGarage();

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    vehicleBrand: 'Royal Enfield',
    vehicleModel: '',
    vehicleRegistrationNumber: '',
    vehicleType: 'Bike' as VehicleType,
    requiredService: selectedServiceForBooking || (services[0]?.name ?? 'Bike General Servicing'),
    preferredDate: '',
    preferredTime: TIME_SLOTS[0],
    problemDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync selected service if passed from another component
  useEffect(() => {
    if (selectedServiceForBooking) {
      setFormData((prev) => ({ ...prev, requiredService: selectedServiceForBooking }));
    }
  }, [selectedServiceForBooking]);

  // Set default min date to today
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'vehicleRegistrationNumber') {
      finalValue = formatRegistrationNumber(value);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Process valid booking
    const booking = createBooking({
      customerName: formData.customerName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      vehicleBrand: formData.vehicleBrand.trim(),
      vehicleModel: formData.vehicleModel.trim(),
      vehicleRegistrationNumber: formData.vehicleRegistrationNumber.trim(),
      vehicleType: formData.vehicleType,
      requiredService: formData.requiredService,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      problemDescription: formData.problemDescription.trim(),
    });

    setSubmittedBooking(booking);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setSelectedServiceForBooking(null);
    setFormData({
      customerName: '',
      mobileNumber: '',
      vehicleBrand: 'Royal Enfield',
      vehicleModel: '',
      vehicleRegistrationNumber: '',
      vehicleType: 'Bike',
      requiredService: services[0]?.name || 'Bike General Servicing',
      preferredDate: '',
      preferredTime: TIME_SLOTS[0],
      problemDescription: '',
    });
    setErrors({});
  };

  return (
    <section id="book" className="py-16 sm:py-24 bg-neutral-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {submittedBooking ? (
          /* Confirmation Card */
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
              Booking Request Received
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-3">
              Thank You, {submittedBooking.customerName}!
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-6">
              Your service request has been logged. Our garage coordinator will review technician availability and contact you via phone/WhatsApp to confirm your slot.
            </p>

            {/* Reference Badge */}
            <div className="inline-block p-4 bg-neutral-950 rounded-2xl border border-neutral-800 mb-8 max-w-md w-full text-left">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-3">
                <span className="text-xs text-neutral-400">Booking Reference</span>
                <span className="text-sm font-mono font-bold text-red-400">{submittedBooking.referenceNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block">Vehicle</span>
                  <span className="font-medium text-white">{submittedBooking.vehicleBrand} {submittedBooking.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Registration</span>
                  <span className="font-medium text-white">{submittedBooking.vehicleRegistrationNumber}</span>
                </div>
                <div className="mt-2">
                  <span className="text-neutral-500 block">Service</span>
                  <span className="font-medium text-white">{submittedBooking.requiredService}</span>
                </div>
                <div className="mt-2">
                  <span className="text-neutral-500 block">Preferred Slot</span>
                  <span className="font-medium text-white">{submittedBooking.preferredDate}</span>
                </div>
              </div>
            </div>

            {/* Note about confirmation */}
            <div className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl max-w-md mx-auto text-xs text-amber-400/90 flex items-center gap-2 text-left mb-8">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Note: All bookings are appointment requests. Final confirmation is sent after bay allocation.
              </span>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={generateWhatsAppUrl(
                  businessDetails.whatsapp,
                  buildBookingWhatsAppMessage(submittedBooking)
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        ) : (
          /* The Form */
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Online Appointment System</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-3">
                Book Your <span className="text-red-600">Service</span>
              </h2>
              <p className="text-neutral-400 text-sm">
                Reserve your bike or electric scooter service slot in Ratnagiri. Fast turnaround, transparent estimates, and genuine spare parts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Shinde"
                      className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors ${
                        errors.customerName ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-red-600'
                      }`}
                    />
                    <User className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" />
                  </div>
                  {errors.customerName && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile (e.g. 8624018431)"
                      className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors ${
                        errors.mobileNumber ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-red-600'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Vehicle Type Radio */}
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, vehicleType: 'Bike' }))}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      formData.vehicleType === 'Bike'
                        ? 'bg-neutral-800 border-red-600 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>🏍️ Motorcycle / Scooter (Petrol)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, vehicleType: 'Electric Scooter' }))}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      formData.vehicleType === 'Electric Scooter'
                        ? 'bg-neutral-800 border-amber-500 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>⚡ Electric Scooter (EV)</span>
                  </button>
                </div>
              </div>

              {/* Vehicle Brand, Model, Registration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="vehicleBrand" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Vehicle Brand <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="vehicleBrand"
                    name="vehicleBrand"
                    value={formData.vehicleBrand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
                  >
                    {COMMON_BIKE_BRANDS.map((brand) => (
                      <option key={brand} value={brand} className="bg-neutral-900 text-white">
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="vehicleModel" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Model Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    placeholder="e.g. Classic 350 / 450X"
                    className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors ${
                      errors.vehicleModel ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                    }`}
                  />
                  {errors.vehicleModel && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.vehicleModel}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="vehicleRegistrationNumber" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Registration No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="vehicleRegistrationNumber"
                    name="vehicleRegistrationNumber"
                    value={formData.vehicleRegistrationNumber}
                    onChange={handleInputChange}
                    placeholder="MH 08 AB 1234"
                    className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none uppercase font-mono transition-colors ${
                      errors.vehicleRegistrationNumber ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                    }`}
                  />
                  {errors.vehicleRegistrationNumber && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.vehicleRegistrationNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="requiredService" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                  Required Service Package <span className="text-red-500">*</span>
                </label>
                <select
                  id="requiredService"
                  name="requiredService"
                  value={formData.requiredService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.name} className="bg-neutral-900 text-white">
                      {service.name} — {service.priceNote}
                    </option>
                  ))}
                  <option value="Custom Repair / Diagnostic" className="bg-neutral-900 text-white">
                    Custom Problem / Unlisted Diagnostic
                  </option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      min={today}
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-colors ${
                        errors.preferredDate ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-neutral-900 text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label htmlFor="problemDescription" className="block text-xs font-semibold uppercase text-neutral-300 tracking-wider mb-2">
                  Additional Problem Description / Notes (Optional)
                </label>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  rows={3}
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  placeholder="Describe symptoms, noise, vibrations, battery discharge, or last service date..."
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none"
                />
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-neutral-200">Booking Policy:</strong> Online bookings are requests and subject to workshop bay availability.
                  Our team confirms your appointment via phone/WhatsApp prior to drop-off.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 rounded-xl transition-all shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Confirming Request...' : 'Submit Service Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
