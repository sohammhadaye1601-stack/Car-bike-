import React from 'react';
import { useGarage } from '../context/GarageContext';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/booking';

export const FloatingActions: React.FC = () => {
  const { businessDetails, setCurrentView } = useGarage();

  const handleBook = () => {
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom Right) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        <button
          onClick={handleBook}
          className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-950 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Service</span>
        </button>

        <a
          href={generateWhatsAppUrl(
            businessDetails.whatsapp,
            'Hello Engine Ear Garage! I would like to enquire about vehicle servicing.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center transition-transform hover:scale-110 group"
          title="Chat with Engine Ear Garage on WhatsApp"
          aria-label="WhatsApp Us"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar (<15% mobile viewport height constraint) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 flex items-center gap-2">
        <a
          href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 bg-neutral-900 border border-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 active:bg-neutral-800"
        >
          <Phone className="w-3.5 h-3.5 text-red-500" />
          <span>Call</span>
        </a>

        <a
          href={generateWhatsAppUrl(
            businessDetails.whatsapp,
            'Hello Engine Ear Garage! I would like to enquire about servicing.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={handleBook}
          className="flex-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 active:bg-red-800 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </>
  );
};
