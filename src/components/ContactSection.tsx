import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2, Navigation, Mail, AlertCircle } from 'lucide-react';
import { generateWhatsAppUrl, isGarageOpenNow, validateMobileNumber } from '../utils/booking';

export const ContactSection: React.FC = () => {
  const { businessDetails, submitEnquiry } = useGarage();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Service Enquiry',
    message: '',
    website_hp: '', // Spam honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const status = isGarageOpenNow();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check: if website_hp is filled, silently discard spam bot
    if (form.website_hp) {
      setSubmitted(true);
      return;
    }

    const errs: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2) {
      errs.name = 'Please provide your name';
    }
    if (!validateMobileNumber(form.phone)) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!form.message || form.message.trim().length < 5) {
      errs.message = 'Please provide details about your query';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    submitEnquiry({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      subject: form.subject,
      message: form.message.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        phone: '',
        email: '',
        subject: 'General Service Enquiry',
        message: '',
        website_hp: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Or Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-3">
            Contact <span className="text-red-600">Engine Ear Garage</span>
          </h2>
          <p className="text-neutral-400 text-sm">
            Located at MIDC Mirjole, Ratnagiri. Drop by for a quick vehicle inspection or message us on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight border-b border-neutral-800 pb-3">
                Workshop Coordinates
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-red-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold block mb-1">
                      Full Address
                    </span>
                    <p className="text-neutral-200 font-medium leading-relaxed">
                      {businessDetails.address},<br />
                      {businessDetails.landmark},<br />
                      {businessDetails.city}, {businessDetails.state} – {businessDetails.pincode}
                    </p>
                    <a
                      href={businessDetails.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 mt-2"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-red-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold block mb-1">
                      Phone & Call Desk
                    </span>
                    <a
                      href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
                      className="text-neutral-200 font-bold hover:text-red-400 transition-colors text-base"
                    >
                      {businessDetails.phone}
                    </a>
                    <span className="text-xs text-neutral-500 block mt-0.5">Direct line to workshop coordinator</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-emerald-500 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold block mb-1">
                      WhatsApp Chat Support
                    </span>
                    <a
                      href={generateWhatsAppUrl(businessDetails.whatsapp, 'Hello Engine Ear Garage! I would like to get my vehicle serviced.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors text-base flex items-center gap-1.5"
                    >
                      <span>{businessDetails.whatsapp}</span>
                      <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">Chat Now</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                        Workshop Working Hours
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${status.isOpen ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400'}`}>
                        {status.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-neutral-200 text-xs font-mono">{businessDetails.openingHours.weekdays}</p>
                    <p className="text-neutral-300 text-xs font-mono">{businessDetails.openingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg h-64 sm:h-72 relative">
              <iframe
                title="Engine Ear Garage Ratnagiri Location Map"
                src={businessDetails.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-950/90 backdrop-blur-sm border border-neutral-800 px-3 py-1.5 rounded-lg text-xs text-neutral-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Near Lions Club Eye Hospital, Ratnagiri</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
              Send Workshop <span className="text-red-600">Enquiry</span>
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Have questions about pricing, spare parts availability, or engine rebuilds? Send us a message and our team will get back to you.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Thank you! Our garage manager will reach out via call or WhatsApp shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field for spam bots */}
                <input
                  type="text"
                  name="website_hp"
                  value={form.website_hp}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="enquiry_name" className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="enquiry_name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Mahesh Patil"
                    className={`w-full px-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="enquiry_phone" className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="enquiry_phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className={`w-full px-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enquiry_email" className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="enquiry_email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enquiry_subject" className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Enquiry Subject
                  </label>
                  <select
                    id="enquiry_subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
                  >
                    <option value="General Service Enquiry">General Service Enquiry</option>
                    <option value="Motorcycle Engine Repair">Motorcycle Engine Repair</option>
                    <option value="Electric Scooter Battery / Wiring">Electric Scooter Battery / Wiring</option>
                    <option value="Spare Parts Availability">Spare Parts Availability</option>
                    <option value="Breakdown / Towing Query">Breakdown / Towing Query</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry_message" className="block text-xs font-semibold uppercase text-neutral-300 mb-1">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="enquiry_message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Provide your vehicle model and what assistance you need..."
                    className={`w-full px-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none ${
                      errors.message ? 'border-red-500' : 'border-neutral-800 focus:border-red-600'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors shadow-lg shadow-red-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
