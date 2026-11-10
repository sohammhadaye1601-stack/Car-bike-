import React from 'react';
import { useGarage } from '../context/GarageContext';
import { MapPin, Shield, Wrench, HeartHandshake, Sparkles, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { businessDetails, setCurrentView } = useGarage();

  return (
    <section id="about" className="py-20 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Workshop Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
              <Shield className="w-3.5 h-3.5" />
              <span>About Engine Ear Garage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Honest Motorcycle & EV Scooter <br />
              <span className="text-red-600">Care in Ratnagiri</span>
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed">
              Located on <strong className="text-white">JK File Navnirman College Road, near Lions Club Eye Hospital in MIDC Mirjole</strong>,
              Engine Ear Garage was founded with a straightforward mission: to deliver uncompromising, transparent, and technically sound two-wheeler care to riders across Ratnagiri.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed">
              We cater to both modern internal combustion motorcycles—from commuter bikes to mid-displacement touring machines—and modern electric scooters.
              Every vehicle that rolls onto our hydraulic lifts receives systematic diagnosis, torque-spec assembly, and authentic consumables. We do not recommend unnecessary part replacements; we believe in fixing issues right the first time.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                <div className="p-2 w-fit rounded-lg bg-neutral-950 text-red-500 mb-3 border border-neutral-800">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Our Service Philosophy</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every bolt torqued correctly, clean work environment, and direct consultation with the technician handling your machine.
                </p>
              </div>

              <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
                <div className="p-2 w-fit rounded-lg bg-neutral-950 text-red-500 mb-3 border border-neutral-800">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Commitment to Quality</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We use genuine OEM spare parts, manufacturer-spec synthetic oils, and proper diagnostic meters for electric scooter BMS packs.
                </p>
              </div>
            </div>

            {/* Location highlight badge */}
            <div className="p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800/80 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300">
                <strong className="text-white block font-semibold mb-0.5">Workshop Location</strong>
                <span>{businessDetails.address}, {businessDetails.city}, {businessDetails.state} {businessDetails.pincode}</span>
                <span className="block text-neutral-400 mt-1">Conveniently accessible near Lions Club Eye Hospital with secure bike parking and road-test loop.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Workshop Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img
                src="/src/assets/images/workshop_interior_bay_1794283007306.jpg"
                alt="Engine Ear Garage workshop floor in Ratnagiri"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 block mb-1">
                  Engine Ear Garage
                </span>
                <p className="text-sm font-bold text-white uppercase tracking-tight">
                  "Your Ride, Our Responsibility."
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  MIDC Mirjole, Ratnagiri · Open Mon-Sat 9AM-8PM, Sun 10AM-4PM
                </p>
              </div>
            </div>

            {/* Floating stat accent */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-white">Full-Spectrum Two-Wheeler Care</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Motorcycles · Superbikes · Commuters · Electric Scooters
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
