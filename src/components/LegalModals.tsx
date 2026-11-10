import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-950 text-neutral-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Engine Ear Garage Policy</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Privacy Policy
            </h2>
            <p className="text-neutral-400">
              Last updated: November 2026. Engine Ear Garage respects your privacy.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">1. Information We Collect</h3>
            <p>
              When you submit a service booking or contact inquiry on our website, we collect your name, mobile phone number, vehicle make and model, registration number, and service requirements.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">2. How We Use Your Details</h3>
            <p>
              Your contact details are strictly used to schedule your service appointment, discuss technical estimates, communicate job completion status via phone or WhatsApp, and maintain maintenance records for your vehicle.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">3. Data Protection</h3>
            <p>
              We do not sell, rent, or trade customer contact details or vehicle registration information to third-party telemarketers or external entities.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">4. Contacting Us</h3>
            <p>
              For any privacy queries regarding your vehicle service records, you may contact Engine Ear Garage at +91 8624018431 or visit our workshop in MIDC Mirjole, Ratnagiri.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs">
              <FileText className="w-4 h-4" />
              <span>Workshop Service Agreement</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Terms & Conditions
            </h2>
            <p className="text-neutral-400">
              Last updated: November 2026.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">1. Booking Requests & Confirmations</h3>
            <p>
              Online appointments submitted via this website represent slot requests. Official confirmation is provided by our service coordinator via phone or WhatsApp based on workshop hydraulic lift availability.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">2. Vehicle Inspection & Estimates</h3>
            <p>
              All listed rates are baseline starting estimates for labor. Any replacement spare parts, specialized fluids, machining, or electrical wiring components required after physical teardown will be pre-communicated to the vehicle owner for approval before fitment.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">3. Storage & Collection</h3>
            <p>
              Customers are requested to collect serviced vehicles within 24 hours of receiving the completion notification unless prior arrangements have been agreed upon with garage management.
            </p>

            <h3 className="text-white font-bold uppercase pt-2">4. Warranty on Workmanship</h3>
            <p>
              We stand behind our technical workmanship. Warranty on replacement spare parts and batteries is governed by original manufacturer policies.
            </p>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
