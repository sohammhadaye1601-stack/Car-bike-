import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { Phone, MessageSquare, Menu, X, Shield, Clock } from 'lucide-react';
import { isGarageOpenNow, generateWhatsAppUrl } from '../utils/booking';

export const Header: React.FC = () => {
  const { currentView, setCurrentView, businessDetails, isAdminLoggedIn } = useGarage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = isGarageOpenNow();

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', view: 'services' },
    { label: 'Book Service', view: 'book' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Vlogs & Tips', view: 'vlogs' },
    { label: 'About & Reviews', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      {/* Subtle Top Announcement Strip */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 bg-neutral-900/90 text-xs border-b border-neutral-800/80">
        <div className="flex items-center gap-4 text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="font-medium text-neutral-300">{status.message}</span>
          </span>
          <span className="text-neutral-600">·</span>
          <span>MIDC Mirjole, Ratnagiri</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <a
            href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>{businessDetails.phone}</span>
          </a>
          {isAdminLoggedIn && (
            <button
              onClick={() => handleNavClick('admin')}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-lg tracking-wider shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
            EE
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase whitespace-nowrap">
              Engine Ear <span className="text-red-600">Garage</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 -mt-1 hidden sm:block">
              Ratnagiri · Bike & EV Care
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNavClick(link.view)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                currentView === link.view
                  ? 'text-red-500 font-semibold border-b-2 border-red-500'
                  : 'hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={generateWhatsAppUrl(
              businessDetails.whatsapp,
              'Hello Engine Ear Garage! I would like to enquire about motorcycle / EV scooter servicing.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-400 hover:text-emerald-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 transition-colors"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Us"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <button
            onClick={() => handleNavClick('book')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg transition-colors shadow-md shadow-red-950 whitespace-nowrap shrink-0"
          >
            Book Your Service
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('book')}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-md"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'home' ? 'bg-neutral-900 text-red-500' : 'text-neutral-300'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === link.view ? 'bg-neutral-900 text-red-500' : 'text-neutral-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'admin' ? 'bg-neutral-900 text-red-500' : 'text-neutral-400'
              }`}
            >
              Admin Dashboard
            </button>
          </nav>
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <a
              href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs text-neutral-300 py-1"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call: {businessDetails.phone}</span>
            </a>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{status.todayHours}</span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
