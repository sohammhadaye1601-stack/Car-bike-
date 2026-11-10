import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { ServiceCard } from './ServiceCard';
import { Phone, MessageSquare, Wrench } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/booking';

export const ServicesSection: React.FC = () => {
  const { services, businessDetails } = useGarage();
  const [filter, setFilter] = useState<'All' | 'Bike' | 'Electric Scooter' | 'Repair' | 'General'>('All');

  const filteredServices = services.filter((s) => {
    if (filter === 'All') return true;
    return s.category === filter;
  });

  return (
    <section id="services" className="py-20 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Precision Automotive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-4">
            Our Workshop <span className="text-red-600">Services</span>
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Professional diagnostic testing, genuine spare replacements, and certified EV scooter service.
            Every service is backed by our strict quality inspection.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['All', 'Bike', 'Electric Scooter', 'Repair', 'General'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800'
              }`}
            >
              {cat === 'All' ? 'All Services (8)' : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Custom Workshop Assistance Banner */}
        <div className="mt-16 bg-gradient-to-r from-neutral-900 via-neutral-900 to-red-950/40 border border-neutral-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold block mb-1">
              Custom Diagnostic or Engine Noise?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
              Have an issue not listed above?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Bring your motorcycle or EV scooter directly to our workshop near Lions Club Eye Hospital, MIDC Mirjole,
              or send us an audio/video recording of the engine noise on WhatsApp for quick analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${businessDetails.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call Mechanic</span>
            </a>
            <a
              href={generateWhatsAppUrl(
                businessDetails.whatsapp,
                'Hello Engine Ear Garage! I have a custom vehicle issue and need technical advice.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
