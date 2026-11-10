import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { useGarage } from '../context/GarageContext';
import {
  Wrench,
  Cog,
  Disc,
  Droplets,
  ShieldCheck,
  Zap,
  Cpu,
  ClipboardCheck,
  MessageSquare,
  Calendar,
  Clock,
  Info,
  ChevronRight,
  X
} from 'lucide-react';
import { generateWhatsAppUrl, buildServiceWhatsAppMessage } from '../utils/booking';

const ICON_MAP: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5 text-red-500" />,
  Cog: <Cog className="w-5 h-5 text-red-500" />,
  Disc: <Disc className="w-5 h-5 text-red-500" />,
  Droplets: <Droplets className="w-5 h-5 text-red-500" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-red-500" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
  Cpu: <Cpu className="w-5 h-5 text-red-500" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5 text-red-500" />,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { businessDetails, setCurrentView, setSelectedServiceForBooking } = useGarage();
  const [modalOpen, setModalOpen] = useState(false);

  const whatsappMessage = buildServiceWhatsAppMessage(service.name);
  const whatsappUrl = generateWhatsAppUrl(businessDetails.whatsapp, whatsappMessage);

  const handleBookService = () => {
    setSelectedServiceForBooking(service.name);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="group relative bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-red-900/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-red-950/20">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 group-hover:border-red-800/40 transition-colors">
              {ICON_MAP[service.icon] || <Wrench className="w-5 h-5 text-red-500" />}
            </div>
            <div className="text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                {service.category}
              </span>
              <span className="text-xs font-semibold text-red-400 mt-0.5 block">
                {service.priceNote}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-300 leading-relaxed mb-4">
            {service.shortDescription}
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-400 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>Est. {service.estimatedDuration}</span>
            </span>
            <button
              onClick={() => setModalOpen(true)}
              className="text-neutral-400 hover:text-white inline-flex items-center gap-0.5 ml-auto text-xs font-medium cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-red-400" />
              <span>Details</span>
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-neutral-800/80">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
            title={`Enquire on WhatsApp for ${service.name}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>

          <button
            onClick={handleBookService}
            className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-950"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                {ICON_MAP[service.icon] || <Wrench className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest">{service.category}</span>
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
              </div>
            </div>

            <div className="space-y-4 my-6 text-sm text-neutral-300">
              <div>
                <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1">Overview</h4>
                <p>{service.shortDescription}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-1">Scope of Work</h4>
                <p className="leading-relaxed">{service.fullDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block">Typical Duration</span>
                  <span className="text-white font-medium">{service.estimatedDuration}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Pricing Info</span>
                  <span className="text-red-400 font-medium">{service.priceNote}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setModalOpen(false);
                  handleBookService();
                }}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
