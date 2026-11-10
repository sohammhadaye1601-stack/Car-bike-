import React from 'react';
import { useGarage } from '../context/GarageContext';
import { Phone, MessageSquare, MapPin, Shield, Heart } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/booking';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const { businessDetails, setCurrentView } = useGarage();

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-base">
                EE
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Engine Ear <span className="text-red-600">Garage</span>
              </span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold">
              {businessDetails.tagline}
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Professional motorcycle servicing, engine repairs, and electric scooter maintenance located in MIDC Mirjole, Ratnagiri.
              Dedicated to precision engineering, genuine spare parts, and customer trust.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={businessDetails.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={businessDetails.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={businessDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors text-xs font-bold"
                aria-label="Google Maps"
              >
                GM
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Workshop Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('book')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Book Service Online
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Workshop Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('vlogs')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Garage Vlogs & Tips
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-red-400 transition-colors cursor-pointer">
                  About & Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-red-400 transition-colors cursor-pointer">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Workshop Location</h4>
            <div className="space-y-2 text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {businessDetails.address},<br />
                  {businessDetails.landmark},<br />
                  {businessDetails.city}, {businessDetails.state} {businessDetails.pincode}
                </span>
              </p>

              <p className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`} className="text-white hover:text-red-400">
                  {businessDetails.phone}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={generateWhatsAppUrl(businessDetails.whatsapp, 'Hello Engine Ear Garage!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400"
                >
                  WhatsApp: {businessDetails.whatsapp}
                </a>
              </p>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500">
              <p>{businessDetails.openingHours.weekdays}</p>
              <p>{businessDetails.openingHours.sunday}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Engine Ear Garage. All rights reserved. Ratnagiri, Maharashtra.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
