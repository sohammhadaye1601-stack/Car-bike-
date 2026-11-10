import React, { useState } from 'react';
import { GarageProvider, useGarage } from './context/GarageContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingForm } from './components/BookingForm';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { VlogsSection } from './components/VlogsSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { LegalModal } from './components/LegalModals';
import {
  Wrench,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import { generateWhatsAppUrl } from './utils/booking';

const MainContent: React.FC = () => {
  const { currentView, setCurrentView, businessDetails, toastMessage } = useGarage();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleBookClick = () => {
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 border border-red-600/80 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl shadow-red-950/60 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Why Choose Us (Trust & Technical Precision) */}
            <section className="py-16 bg-neutral-900/40 border-b border-neutral-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold block mb-1">
                    Precision & Integrity
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    Why Riders Trust <span className="text-red-600">Engine Ear Garage</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800 hover:border-red-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">Expert Technicians</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Specialized in multi-cylinder motorcycles, fuel-injection tuning, and precision engine rebuilds with calibrated torque tools.
                    </p>
                  </div>

                  <div className="p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800 hover:border-red-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 mb-4">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">EV Scooter Specialists</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Dedicated diagnostics for Ather, Ola, TVS iQube, and Chetak EV batteries, controllers, and wiring harnesses.
                    </p>
                  </div>

                  <div className="p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800 hover:border-red-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">100% Genuine Spares</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      No substandard duplicates. We use genuine OEM filters, brake pads, spark plugs, and Motul/Castrol fluids.
                    </p>
                  </div>

                  <div className="p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800 hover:border-red-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-500 mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">Transparent Turnaround</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Direct WhatsApp photo updates during repairs, itemized job cards, and timely same-day service turnaround.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Core Services Grid */}
            <ServicesSection />

            {/* 4. Workshop Showcase Feature */}
            <section className="py-20 bg-neutral-900/30 border-y border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
                    <img
                      src="/src/assets/images/service_engine_repair_1794283005676.jpg"
                      alt="Engine repair and diagnostics in Engine Ear Garage"
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                        Diagnostics & Precision
                      </span>
                      <h4 className="text-base font-bold text-white">
                        Advanced Engine & Electrical Diagnostics
                      </h4>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
                      <span>Inside Engine Ear Garage</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                      Equipped for Modern Motorcycles & <span className="text-red-600">Smart EV Scooters</span>
                    </h2>

                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Whether you need routine periodic oil servicing or a comprehensive engine overhaul, our Ratnagiri workshop
                      is engineered to maintain two-wheelers with manufacturer precision.
                    </p>

                    <div className="space-y-3 pt-2 text-xs text-neutral-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>High-capacity hydraulic bike lifts for safe, scratch-free chassis mounting.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>Digital multi-meter and battery load testers for EV cells and electrical stators.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>Dedicated engine rebuilding bay with torque wrenches and micrometer calibration.</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={handleBookClick}
                        className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-red-950"
                      >
                        <span>Schedule Appointment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('gallery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
                      >
                        Explore Gallery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Online Booking Section */}
            <BookingForm />

            {/* 6. Gallery Preview */}
            <GallerySection />

            {/* 7. About & Philosophy */}
            <AboutSection />

            {/* 8. Customer Reviews */}
            <ReviewsSection />

            {/* 9. Garage Vlogs & Tips */}
            <VlogsSection />

            {/* 10. Contact & Location with Google Maps */}
            <ContactSection />
          </>
        )}

        {currentView === 'services' && (
          <div className="pt-6">
            <ServicesSection />
            <BookingForm />
          </div>
        )}

        {currentView === 'book' && (
          <div className="pt-6">
            <BookingForm />
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="pt-6">
            <GallerySection />
          </div>
        )}

        {currentView === 'vlogs' && (
          <div className="pt-6">
            <VlogsSection />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <ReviewsSection />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="pt-6">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Floating Call & WhatsApp Actions */}
      <FloatingActions />

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Legal Modals */}
      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </div>
  );
};

export default function App() {
  return (
    <GarageProvider>
      <MainContent />
    </GarageProvider>
  );
}
