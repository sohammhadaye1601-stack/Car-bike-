import React from 'react';
import { useGarage } from '../context/GarageContext';
import { Calendar, Phone, MessageSquare, ShieldCheck, Wrench, Zap, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/booking';

export const HeroSection: React.FC = () => {
  const { setCurrentView, businessDetails, setSelectedServiceForBooking } = useGarage();

  const handleBookClick = () => {
    setSelectedServiceForBooking(null);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background with subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_motorcycle_workshop_1794283004953.jpg"
          alt="Engine Ear Garage modern motorcycle workshop in Ratnagiri"
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 scale-105 transform motion-safe:transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl">
          {/* Subtle Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            ENGINE EAR GARAGE · {businessDetails.tagline}
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none mb-6">
            Your Bike Deserves <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
              Expert Care.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Professional Bike Servicing, Repairs & Electric Scooter Maintenance in Ratnagiri.
            From high-performance superbike tuning to EV battery diagnostics.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <button
              onClick={handleBookClick}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-all shadow-xl shadow-red-950/60 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Service</span>
            </button>

            <a
              href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-100 bg-neutral-900/90 hover:bg-neutral-800 active:bg-neutral-700 border border-neutral-700/80 rounded-xl transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call Now</span>
            </a>

            <a
              href={generateWhatsAppUrl(
                businessDetails.whatsapp,
                'Hello Engine Ear Garage! I would like to book a service / get a quote for my bike.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Key Value Points Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Genuine Spares</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Electric Scooter Care</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <Wrench className="w-4 h-4 text-red-500 shrink-0" />
              <span>Hydraulic Lift Bays</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Same-Day Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
