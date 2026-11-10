import { BusinessDetails, CustomerReview, GarageVlog, GalleryItem, ServiceItem, Booking } from '../types';

export const INITIAL_BUSINESS_DETAILS: BusinessDetails = {
  name: 'Engine Ear Garage',
  tagline: 'Your Ride, Our Responsibility',
  phone: '+91 8624018431',
  whatsapp: '+91 8624018431',
  address: 'JK File Navnirman College Road, Near Lions Club Eye Hospital, MIDC Mirjole',
  landmark: 'Near Lions Club Eye Hospital',
  city: 'Ratnagiri',
  state: 'Maharashtra',
  pincode: '415639',
  email: 'contact@engineeargarage.com',
  googleMapsUrl: 'https://maps.google.com/?q=MIDC+Mirjole+Ratnagiri+Maharashtra+415639',
  // Official Ratnagiri MIDC Mirjole embed location
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.428456209867!2d73.3421295!3d16.9952136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be99d0e1a47814b%3A0x6a0a037b561cbe16!2sMIDC%20Mirjole%2C%20Ratnagiri%2C%20Maharashtra%20415639!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleReviewUrl: 'https://maps.google.com/?q=Engine+Ear+Garage+Ratnagiri',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  openingHours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 8:00 PM',
    sunday: 'Sunday: 10:00 AM – 4:00 PM'
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'bike-general-servicing',
    name: 'Bike General Servicing',
    category: 'Bike',
    shortDescription: 'Complete multi-point vehicle wash, carburettor/fuel-injection tuning, chain adjustment, air filter cleaning, and full nut-bolt tightening.',
    fullDescription: 'Comprehensive bumper-to-bumper inspection including brake pad checks, clutch cable lubrication, wheel alignment inspection, engine flush if required, electrical lighting test, and road test before delivery.',
    estimatedDuration: '2 - 3 Hours',
    priceNote: 'Starting at ₹499 (Excl. Consumables)',
    icon: 'Wrench',
    popular: true
  },
  {
    id: 'engine-repair',
    name: 'Engine Repair & Overhaul',
    category: 'Repair',
    shortDescription: 'Precision cylinder head machining, piston replacement, valve lapping, clutch plate rebuild, and crank balancing.',
    fullDescription: 'Deep diagnostic assessment using specialized compression testers and automotive gauges. We handle smoke issues, unusual tapping noises, poor mileage, low compression, and complete engine rebuilds with original OEM parts.',
    estimatedDuration: '1 - 2 Days',
    priceNote: 'Estimate upon detailed teardown',
    icon: 'Cog',
    popular: true
  },
  {
    id: 'brake-inspection-repair',
    name: 'Brake Inspection & Repair',
    category: 'Repair',
    shortDescription: 'Hydraulic disc brake bleeding, caliper pin greasing, master cylinder rebuilding, and high-friction pad replacement.',
    fullDescription: 'Ensure maximum stopping safety on Konkan ghats and coastal rains. We test brake fluid boiling point, resurface brake discs, calibrate drum brake liners, and eliminate brake fade or squeal.',
    estimatedDuration: '45 - 60 Mins',
    priceNote: 'Starting at ₹250 + Spares',
    icon: 'Disc'
  },
  {
    id: 'oil-change',
    name: 'Oil Change & Fluid Service',
    category: 'General',
    shortDescription: 'High-grade semi-synthetic and 100% synthetic engine oil replacement with magnetic drain plug cleaning and filter swap.',
    fullDescription: 'We stock manufacturer-recommended grades (10W-30, 10W-40, 15W-50, 20W-50) from premium brands (Motul, Castrol, Yamalube, HP). Service includes fresh crush washer, oil strainer check, and chain spray lubrication.',
    estimatedDuration: '30 Mins',
    priceNote: 'Starting at ₹399 (Incl. Labor)',
    icon: 'Droplets',
    popular: true
  },
  {
    id: 'bike-maintenance',
    name: 'Periodic Bike Maintenance',
    category: 'Bike',
    shortDescription: 'Scheduled preventative care, spark plug replacement, battery load test, fork seal inspection, and tire pressure check.',
    fullDescription: 'Keep your motorcycle performing like brand new between long commutes and monsoon rides in Ratnagiri. Prevents sudden roadside breakdowns and keeps fuel economy optimized.',
    estimatedDuration: '1.5 Hours',
    priceNote: 'Starting at ₹350',
    icon: 'ShieldCheck'
  },
  {
    id: 'electric-scooter-servicing',
    name: 'Electric Scooter Servicing',
    category: 'Electric Scooter',
    shortDescription: 'Dedicated EV diagnostics, battery health check, BLDC hub motor inspection, throttle potentiometer calibration, and wiring harness check.',
    fullDescription: 'Specialized tooling for Ather, Ola, TVS iQube, Bajaj Chetak, Hero Vida, and local EV brands. We inspect BMS error codes, regenerative braking circuits, regenerative charging ports, tire wear, and moisture protection.',
    estimatedDuration: '2 Hours',
    priceNote: 'Starting at ₹599',
    icon: 'Zap',
    popular: true
  },
  {
    id: 'electrical-system-inspection',
    name: 'Electrical System Inspection',
    category: 'General',
    shortDescription: 'Starter motor relay testing, alternator/stator coil check, LED headlamp wiring, horn, ignition coil and fuse box diagnosis.',
    fullDescription: 'Eliminate sudden battery draining and electrical cutoffs caused by coastal humidity and monsoon rains in the Konkan belt. Complete wire harness continuity and parasitic draw testing.',
    estimatedDuration: '1 Hour',
    priceNote: 'Starting at ₹200 + Parts',
    icon: 'Cpu'
  },
  {
    id: 'general-vehicle-checkup',
    name: 'General Vehicle Checkup',
    category: 'General',
    shortDescription: '40-point safety and pre-purchase checkup for used bikes, road trip prep, or seasonal monsoon health inspection.',
    fullDescription: 'Detailed health card delivered to the rider covering chassis alignment, steering cone bearing free-play, suspension swingarm bushes, wheel truing, tire tread depth, and road test evaluation.',
    estimatedDuration: '1 Hour',
    priceNote: 'Starting at ₹299',
    icon: 'ClipboardCheck'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Workshop & Hydraulic Service Bays',
    category: 'Workshop',
    imageUrl: '/src/assets/images/hero_motorcycle_workshop_1794283004953.jpg',
    description: 'Equipped with heavy-duty motorcycle scissor lifts, diagnostic consoles, and professional tool chests.'
  },
  {
    id: 'gal-2',
    title: 'Engine Rebuild & Torque Calibration',
    category: 'Engine Repair',
    imageUrl: '/src/assets/images/service_engine_repair_1794283005676.jpg',
    description: 'Micrometer and digital torque wrench assembly for 4-stroke single and twin cylinder motorcycle engines.'
  },
  {
    id: 'gal-3',
    title: 'Electric Scooter Battery & BMS Diagnostics',
    category: 'Electric Scooter',
    imageUrl: '/src/assets/images/service_electric_scooter_1794283007133.jpg',
    description: 'Specialized testing station for high-voltage EV battery packs, throttle sensors, and firmware health.'
  },
  {
    id: 'gal-4',
    title: 'Active Workshop Floor & Ratnagiri Service Team',
    category: 'Team & Tools',
    imageUrl: '/src/assets/images/workshop_interior_bay_1794283007306.jpg',
    description: 'Experienced mechanics working on customer bikes with authentic parts and clean workspace practices.'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Prathamesh Kadam',
    vehicleModel: 'Royal Enfield Classic 350',
    rating: 5,
    reviewText: 'Got my Classic 350 serviced at Engine Ear Garage near Lions Eye Hospital. The engine sound became super smooth, and they cleaned the carburettor and chain thoroughly. Very honest mechanics in Ratnagiri!',
    date: '2026-11-02',
    approved: true,
    verifiedCustomer: true
  },
  {
    id: 'rev-2',
    customerName: 'Snehal Sawant',
    vehicleModel: 'Ather 450X Gen 3',
    rating: 5,
    reviewText: 'Finding a reliable garage for electric scooters in Ratnagiri was tough until I came here. They diagnosed my regenerative brake sensor issue within an hour and checked the entire wiring. Exceptional service.',
    date: '2026-10-27',
    approved: true,
    verifiedCustomer: true
  },
  {
    id: 'rev-3',
    customerName: 'Aniket Parab',
    vehicleModel: 'Yamaha FZ-S V3',
    rating: 5,
    reviewText: 'Oil change, disc brake bleeding, and general maintenance done on time. Transparent pricing with genuine Motul oil. They even shared WhatsApp updates with photos during the work.',
    date: '2026-10-18',
    approved: true,
    verifiedCustomer: true
  },
  {
    id: 'rev-4',
    customerName: 'Vikram Joshi',
    vehicleModel: 'Honda Activa 6G',
    rating: 5,
    reviewText: 'Very convenient location on Navnirman College Road. Booked my service via their website, received quick WhatsApp confirmation, and bike was delivered washed and ready before evening.',
    date: '2026-10-09',
    approved: true,
    verifiedCustomer: true
  }
];

export const INITIAL_VLOGS: GarageVlog[] = [
  {
    id: 'vlog-1',
    title: 'Essential Monsoon Bike Maintenance Tips for Konkan Coastal Roads',
    category: 'Bike Maintenance Tips',
    youtubeId: 'u4o-yP9a_wE',
    description: 'How to protect your motorcycle chassis, electrical connectors, and chain from coastal humidity and salty air in Ratnagiri.',
    readTimeOrDuration: '6 Min Watch',
    date: '2026-11-01',
    featured: true
  },
  {
    id: 'vlog-2',
    title: 'Electric Scooter Battery Health: Dos and Don’ts in Hot Weather',
    category: 'Electric Scooter Tips',
    youtubeId: 'r2h98j0uTz4',
    description: 'Learn optimal charging cycles, thermal management, and how to avoid deep battery discharge on Ather, Ola, and TVS EV scooters.',
    readTimeOrDuration: '5 Min Watch',
    date: '2026-10-24',
    featured: true
  },
  {
    id: 'vlog-3',
    title: 'How to Spot Engine Oil Degradation & Avoid Piston Seizure',
    category: 'Engine Care',
    youtubeId: '0bL1sUuXUqA',
    description: 'Clear signs of dark oxidized oil, metal shavings, clutch slippage, and when you must immediately change engine oil.',
    readTimeOrDuration: '8 Min Watch',
    date: '2026-10-15',
    featured: false
  },
  {
    id: 'vlog-4',
    title: 'A Day Inside Engine Ear Garage: From Teardown to Road Test',
    category: 'Garage Vlogs',
    youtubeId: 'yJq-61z6r08',
    description: 'Behind-the-scenes walkthrough of our Ratnagiri workshop, customer bike check-in, ultrasonic cleaning, and quality testing.',
    readTimeOrDuration: '10 Min Watch',
    date: '2026-10-05',
    featured: false
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    referenceNumber: 'EEG-20261108-4821',
    customerName: 'Gaurav Salvi',
    mobileNumber: '8624018431',
    vehicleBrand: 'Royal Enfield',
    vehicleModel: 'Hunter 350',
    vehicleRegistrationNumber: 'MH 08 BV 8821',
    vehicleType: 'Bike',
    requiredService: 'Bike General Servicing',
    preferredDate: '2026-11-10',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    problemDescription: 'Slight clutch hardness and periodic 10,000 km general servicing with synthetic oil.',
    status: 'Confirmed',
    createdAt: '2026-11-08T14:32:00.000Z',
    adminNotes: 'Assigned to lift bay 2. Motul 15W-50 reserved.'
  },
  {
    id: 'book-102',
    referenceNumber: 'EEG-20261109-7712',
    customerName: 'Pooja Mane',
    mobileNumber: '9822114433',
    vehicleBrand: 'Ola Electric',
    vehicleModel: 'S1 Pro Gen 2',
    vehicleRegistrationNumber: 'MH 08 CC 4519',
    vehicleType: 'Electric Scooter',
    requiredService: 'Electric Scooter Servicing',
    preferredDate: '2026-11-11',
    preferredTime: 'Afternoon (12:00 PM - 3:00 PM)',
    problemDescription: 'Handlebar vibration and rear brake squeak.',
    status: 'Pending',
    createdAt: '2026-11-09T09:15:00.000Z'
  },
  {
    id: 'book-103',
    referenceNumber: 'EEG-20261107-1290',
    customerName: 'Deepak Chogle',
    mobileNumber: '9423887711',
    vehicleBrand: 'KTM',
    vehicleModel: 'Duke 250',
    vehicleRegistrationNumber: 'MH 08 AQ 9102',
    vehicleType: 'Bike',
    requiredService: 'Brake Inspection and Repair',
    preferredDate: '2026-11-07',
    preferredTime: 'Evening (3:00 PM - 7:00 PM)',
    problemDescription: 'Front brake lever sinking. Replaced DOT4 brake fluid and sintered pads.',
    status: 'Completed',
    createdAt: '2026-11-07T11:00:00.000Z',
    adminNotes: 'Work completed and test ridden. Customer paid in person.'
  }
];
