import React, { useState } from 'react';
import { useGarage } from '../context/GarageContext';
import { BookingStatus, ServiceItem } from '../types';
import { calculateBookingStats } from '../utils/booking';
import {
  Shield,
  Key,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Phone,
  MessageSquare,
  Wrench,
  Edit2,
  Trash2,
  Save,
  Plus,
  Users,
  Eye,
  Settings,
  ChevronRight,
  Filter,
  Check,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    bookings,
    updateBookingStatus,
    services,
    updateService,
    reviews,
    approveReview,
    deleteReview,
    businessDetails,
    updateBusinessDetails,
    enquiries,
    gallery,
    vlogs,
  } = useGarage();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'reviews' | 'business' | 'enquiries'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');

  // Editing service state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({});

  // Editing business details state
  const [businessForm, setBusinessForm] = useState(businessDetails);

  const stats = calculateBookingStats(bookings);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasswordInput('');
    }
  };

  const handleStartEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm(service);
  };

  const handleSaveService = (original: ServiceItem) => {
    updateService({
      ...original,
      ...serviceForm,
    } as ServiceItem);
    setEditingServiceId(null);
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessDetails(businessForm);
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'All') return true;
    return b.status === statusFilter;
  });

  if (!isAdminLoggedIn) {
    return (
      <section className="py-24 bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-950 border border-red-800 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Key className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold block mb-1">
              Engine Ear Garage
            </span>
            <h2 className="text-2xl font-black uppercase text-white tracking-tight">
              Owner Administration
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Enter garage manager passcode to access bookings, update pricing, and moderate customer reviews.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-red-600 rounded-xl text-white text-sm focus:outline-none"
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">
                  Invalid passcode. (Hint: use <strong>admin123</strong>)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors shadow-lg shadow-red-950 cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
            Default Owner Passcode: <code className="text-neutral-300 font-mono">admin123</code>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Garage Admin Console
              </h1>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Engine Ear Garage · Ratnagiri, Maharashtra
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">Total Bookings</span>
            <span className="text-2xl font-black font-mono text-white">{stats.total}</span>
          </div>
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <span className="text-xs text-amber-400 uppercase tracking-wider block mb-1">Pending Approval</span>
            <span className="text-2xl font-black font-mono text-amber-400">{stats.pending}</span>
          </div>
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase tracking-wider block mb-1">Confirmed / Active</span>
            <span className="text-2xl font-black font-mono text-emerald-400">{stats.confirmed}</span>
          </div>
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">Completed Services</span>
            <span className="text-2xl font-black font-mono text-neutral-300">{stats.completed}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-4 mb-8">
          {[
            { id: 'bookings', label: `Service Bookings (${bookings.length})` },
            { id: 'services', label: `Services & Pricing (${services.length})` },
            { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
            { id: 'enquiries', label: `Inbound Enquiries (${enquiries.length})` },
            { id: 'business', label: 'Business Profile & Hours' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter by status */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter Requests</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === st
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-500 text-sm">
                  No bookings found for the selected filter.
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-red-400">{b.referenceNumber}</span>
                          <span className="text-neutral-600">·</span>
                          <span className="text-xs text-neutral-400">{new Date(b.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {b.customerName}
                          <span className="text-xs font-normal text-neutral-400 ml-2">
                            ({b.vehicleBrand} {b.vehicleModel} · {b.vehicleRegistrationNumber})
                          </span>
                        </h3>
                      </div>

                      {/* Status Badge & Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : b.status === 'Pending'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : b.status === 'Completed'
                              ? 'bg-blue-950 text-blue-400 border border-blue-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {b.status}
                        </span>

                        {b.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-white bg-neutral-800 hover:bg-red-900 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Completed')}
                            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-600 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-500 uppercase font-semibold block mb-0.5">Service Requested</span>
                        <span className="text-white font-medium">{b.requiredService}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 uppercase font-semibold block mb-0.5">Customer Contact</span>
                        <a href={`tel:${b.mobileNumber}`} className="text-red-400 hover:underline font-mono">
                          {b.mobileNumber}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-500 uppercase font-semibold block mb-0.5">Requested Slot</span>
                        <span className="text-white">{b.preferredDate} ({b.preferredTime})</span>
                      </div>
                    </div>

                    {b.problemDescription && (
                      <div className="mt-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400">
                        <strong className="text-neutral-300">Customer Problem Description:</strong> {b.problemDescription}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Services Management */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Workshop Services & Price List</h3>
                <p className="text-xs text-neutral-400">Update service descriptions, turnaround times, and pricing estimates.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => {
                const isEditing = editingServiceId === svc.id;

                return (
                  <div key={svc.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl">
                    {isEditing ? (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="text-neutral-400 block mb-1">Service Title</label>
                          <input
                            type="text"
                            value={serviceForm.name || ''}
                            onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-400 block mb-1">Price Estimate Note</label>
                          <input
                            type="text"
                            value={serviceForm.priceNote || ''}
                            onChange={(e) => setServiceForm({ ...serviceForm, priceNote: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-400 block mb-1">Short Description</label>
                          <textarea
                            rows={2}
                            value={serviceForm.shortDescription || ''}
                            onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingServiceId(null)}
                            className="flex-1 py-2 bg-neutral-800 rounded-lg text-neutral-300 font-bold uppercase"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveService(svc)}
                            className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold uppercase flex items-center justify-center gap-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-red-500 font-semibold">{svc.category}</span>
                            <h4 className="text-base font-bold text-white">{svc.name}</h4>
                          </div>
                          <span className="text-xs font-semibold font-mono text-red-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
                            {svc.priceNote}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {svc.shortDescription}
                        </p>

                        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                          <span className="text-neutral-500">Duration: {svc.estimatedDuration}</span>
                          <button
                            onClick={() => handleStartEditService(svc)}
                            className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Service</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Review Moderation</h3>
              <p className="text-xs text-neutral-400">Approve or remove customer reviews before they appear publicly on the website.</p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{rev.customerName}</span>
                      <span className="text-xs text-neutral-400">({rev.vehicleModel})</span>
                      <span className="text-xs text-amber-400 font-bold">★ {rev.rating}/5</span>
                      {rev.approved ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Public</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Pending Review</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 italic">"{rev.reviewText}"</p>
                    <span className="text-[10px] font-mono text-neutral-500 block">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    {!rev.approved && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-white bg-neutral-800 hover:bg-red-900 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Inbound Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Contact Form Messages</h3>
              <p className="text-xs text-neutral-400">Direct customer queries submitted via the contact page.</p>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-500 text-sm">
                No new contact form messages yet.
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white text-sm">{enq.name}</span>
                      <span className="font-mono text-neutral-500">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-red-400">
                      <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                      {enq.email && <span className="text-neutral-400">{enq.email}</span>}
                      <span className="text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">{enq.subject}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Business Profile & Hours */}
        {activeTab === 'business' && (
          <div className="max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">Edit Business Coordinates & Hours</h3>
            <p className="text-xs text-neutral-400 mb-6">Update contact numbers, address, and opening schedule displayed across the website.</p>

            <form onSubmit={handleSaveBusiness} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={businessForm.phone}
                    onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={businessForm.whatsapp}
                    onChange={(e) => setBusinessForm({ ...businessForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  value={businessForm.address}
                  onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Landmark</label>
                  <input
                    type="text"
                    value={businessForm.landmark}
                    onChange={(e) => setBusinessForm({ ...businessForm, landmark: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={businessForm.city}
                    onChange={(e) => setBusinessForm({ ...businessForm, city: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Pincode</label>
                  <input
                    type="text"
                    value={businessForm.pincode}
                    onChange={(e) => setBusinessForm({ ...businessForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Weekday Hours (Mon-Sat)</label>
                  <input
                    type="text"
                    value={businessForm.openingHours.weekdays}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        openingHours: { ...businessForm.openingHours, weekdays: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Sunday Hours</label>
                  <input
                    type="text"
                    value={businessForm.openingHours.sunday}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        openingHours: { ...businessForm.openingHours, sunday: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Business Details</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
