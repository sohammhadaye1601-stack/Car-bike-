import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessDetails,
  ServiceItem,
  Booking,
  CustomerReview,
  GarageVlog,
  GalleryItem,
  ContactEnquiry,
  BookingStatus,
} from '../types';
import {
  INITIAL_BUSINESS_DETAILS,
  INITIAL_SERVICES,
  INITIAL_GALLERY,
  INITIAL_REVIEWS,
  INITIAL_VLOGS,
  INITIAL_BOOKINGS,
} from '../data/initialData';
import { generateBookingReference } from '../utils/booking';

interface GarageContextType {
  businessDetails: BusinessDetails;
  updateBusinessDetails: (details: BusinessDetails) => void;
  services: ServiceItem[];
  updateService: (service: ServiceItem) => void;
  addService: (service: ServiceItem) => void;
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, notes?: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  reviews: CustomerReview[];
  submitReview: (review: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  vlogs: GarageVlog[];
  addVlog: (vlog: Omit<GarageVlog, 'id'>) => void;
  deleteVlog: (id: string) => void;
  enquiries: ContactEnquiry[];
  submitEnquiry: (enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'read'>) => void;
  markEnquiryRead: (id: string) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  selectedServiceForBooking: string | null;
  setSelectedServiceForBooking: (serviceName: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BUSINESS: 'eeg_business_details',
  SERVICES: 'eeg_services',
  BOOKINGS: 'eeg_bookings',
  GALLERY: 'eeg_gallery',
  REVIEWS: 'eeg_reviews',
  VLOGS: 'eeg_vlogs',
  ENQUIRIES: 'eeg_enquiries',
  ADMIN_AUTH: 'eeg_admin_session',
};

export const GarageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUSINESS);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_DETAILS;
    } catch {
      return INITIAL_BUSINESS_DETAILS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [vlogs, setVlogs] = useState<GarageVlog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VLOGS);
      return saved ? JSON.parse(saved) : INITIAL_VLOGS;
    } catch {
      return INITIAL_VLOGS;
    }
  });

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(businessDetails));
    } catch (e) {
      console.error(e);
    }
  }, [businessDetails]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VLOGS, JSON.stringify(vlogs));
    } catch (e) {
      console.error(e);
    }
  }, [vlogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const updateBusinessDetails = (details: BusinessDetails) => {
    setBusinessDetails(details);
    showToast('Business details updated successfully');
  };

  const updateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast(`Service "${updated.name}" updated`);
  };

  const addService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    showToast(`Service "${newService.name}" added`);
  };

  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'referenceNumber' | 'status' | 'createdAt'>
  ): Booking => {
    const referenceNumber = generateBookingReference();
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      referenceNumber,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, notes?: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, ...(notes !== undefined ? { adminNotes: notes } : {}) } : b))
    );
    showToast(`Booking marked as ${status}`);
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
    showToast('Image added to gallery');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    showToast('Image removed from gallery');
  };

  const submitReview = (review: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => {
    const newReview: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: false, // Requires admin approval as per prompt
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Review submitted! It will appear after garage verification.');
  };

  const approveReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    showToast('Review approved for public display');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted');
  };

  const addVlog = (vlog: Omit<GarageVlog, 'id'>) => {
    const newVlog: GarageVlog = {
      ...vlog,
      id: `vlog-${Date.now()}`,
    };
    setVlogs((prev) => [newVlog, ...prev]);
    showToast('Vlog/Tip published');
  };

  const deleteVlog = (id: string) => {
    setVlogs((prev) => prev.filter((v) => v.id !== id));
    showToast('Video tip removed');
  };

  const submitEnquiry = (enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'read'>) => {
    const newEnquiry: ContactEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Enquiry received! We will reach out shortly.');
  };

  const markEnquiryRead = (id: string) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)));
  };

  const loginAdmin = (password: string): boolean => {
    // Default owner passcode: admin123 or engineear2026
    if (password === 'admin123' || password === 'engineear2026') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      showToast('Admin session active');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
    showToast('Admin logged out');
  };

  return (
    <GarageContext.Provider
      value={{
        businessDetails,
        updateBusinessDetails,
        services,
        updateService,
        addService,
        bookings,
        createBooking,
        updateBookingStatus,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        reviews,
        submitReview,
        approveReview,
        deleteReview,
        vlogs,
        addVlog,
        deleteVlog,
        enquiries,
        submitEnquiry,
        markEnquiryRead,
        currentView,
        setCurrentView,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </GarageContext.Provider>
  );
};

export const useGarage = () => {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
};
