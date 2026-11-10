import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateMobileNumber,
  formatRegistrationNumber,
  validateRegistrationNumber,
  generateBookingReference,
  generateWhatsAppUrl,
  buildServiceWhatsAppMessage,
  buildBookingWhatsAppMessage,
  validateBookingForm,
  isGarageOpenNow,
  calculateBookingStats,
} from './booking';
import { Booking } from '../types';

test('validateMobileNumber correctly identifies valid and invalid Indian numbers', () => {
  assert.equal(validateMobileNumber('8624018431'), true);
  assert.equal(validateMobileNumber('+91 8624018431'), true);
  assert.equal(validateMobileNumber('08624018431'), true);
  assert.equal(validateMobileNumber('9876543210'), true);
  assert.equal(validateMobileNumber('7123456789'), true);

  // Invalid cases
  assert.equal(validateMobileNumber('1234567890'), false); // Starts with 1
  assert.equal(validateMobileNumber('862401843'), false); // 9 digits
  assert.equal(validateMobileNumber('862401843199'), false); // Too long
  assert.equal(validateMobileNumber(''), false);
  assert.equal(validateMobileNumber('abcdefghij'), false);
});

test('formatRegistrationNumber formats standard Indian license plates', () => {
  assert.equal(formatRegistrationNumber('mh08ab1234'), 'MH 08 AB 1234');
  assert.equal(formatRegistrationNumber('MH-08-AB-1234'), 'MH 08 AB 1234');
  assert.equal(formatRegistrationNumber('mh081234'), 'MH 08 1234');
  assert.equal(formatRegistrationNumber('ka01ef9999'), 'KA 01 EF 9999');
});

test('validateRegistrationNumber validates vehicle plate lengths', () => {
  assert.equal(validateRegistrationNumber('MH08AB1234'), true);
  assert.equal(validateRegistrationNumber('MH 08 Q 500'), true);
  assert.equal(validateRegistrationNumber(''), false);
  assert.equal(validateRegistrationNumber('A'), false); // Too short
});

test('generateBookingReference produces expected EEG prefix and format', () => {
  const fixedDate = new Date('2026-11-10T10:00:00Z');
  const ref = generateBookingReference(fixedDate, '9999');
  assert.equal(ref, 'EEG-20261110-9999');
});

test('generateWhatsAppUrl builds safe click-to-chat links with encoded message', () => {
  const url = generateWhatsAppUrl('+91 8624018431', 'Hello Engine Ear Garage!');
  assert.ok(url.startsWith('https://wa.me/918624018431?text='));
  assert.ok(url.includes('Hello%20Engine%20Ear%20Garage!'));
});

test('buildServiceWhatsAppMessage includes service name and vehicle details', () => {
  const msg = buildServiceWhatsAppMessage('Electric Scooter Servicing', 'Ather 450X');
  assert.ok(msg.includes('Electric Scooter Servicing'));
  assert.ok(msg.includes('Ather 450X'));
});

test('validateBookingForm validates all required booking fields correctly', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const validData = {
    customerName: 'Rahul Shinde',
    mobileNumber: '8624018431',
    vehicleBrand: 'Royal Enfield',
    vehicleModel: 'Classic 350',
    vehicleRegistrationNumber: 'MH 08 AB 4321',
    vehicleType: 'Bike',
    requiredService: 'Bike General Servicing',
    preferredDate: tomorrowStr,
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    problemDescription: 'Chain noise and regular 5000km service'
  };

  const result = validateBookingForm(validData);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);

  // Incomplete data test
  const invalidResult = validateBookingForm({
    ...validData,
    customerName: 'R',
    mobileNumber: '123',
    requiredService: '',
    preferredDate: '2020-01-01' // Past date
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.customerName);
  assert.ok(invalidResult.errors.mobileNumber);
  assert.ok(invalidResult.errors.requiredService);
  assert.ok(invalidResult.errors.preferredDate);
});

test('isGarageOpenNow correctly reports status based on hours', () => {
  // Tuesday at 11:30 AM (Open)
  const tuesdayOpen = new Date('2026-11-10T11:30:00');
  const status1 = isGarageOpenNow(tuesdayOpen);
  assert.equal(status1.isOpen, true);

  // Tuesday at 11:00 PM (Closed)
  const tuesdayClosed = new Date('2026-11-10T23:00:00');
  const status2 = isGarageOpenNow(tuesdayClosed);
  assert.equal(status2.isOpen, false);
});

test('calculateBookingStats accurately aggregates counts by status', () => {
  const mockBookings: Booking[] = [
    {
      id: '1',
      referenceNumber: 'EEG-001',
      customerName: 'A',
      mobileNumber: '9999999999',
      vehicleBrand: 'Honda',
      vehicleModel: 'Activa',
      vehicleRegistrationNumber: 'MH08AB1111',
      vehicleType: 'Bike',
      requiredService: 'Oil Change',
      preferredDate: '2026-11-12',
      preferredTime: 'Morning',
      problemDescription: '',
      status: 'Pending',
      createdAt: '2026-11-09'
    },
    {
      id: '2',
      referenceNumber: 'EEG-002',
      customerName: 'B',
      mobileNumber: '9999999999',
      vehicleBrand: 'Ather',
      vehicleModel: '450X',
      vehicleRegistrationNumber: 'MH08AB2222',
      vehicleType: 'Electric Scooter',
      requiredService: 'Electric Scooter Servicing',
      preferredDate: '2026-11-12',
      preferredTime: 'Afternoon',
      problemDescription: '',
      status: 'Confirmed',
      createdAt: '2026-11-09'
    },
    {
      id: '3',
      referenceNumber: 'EEG-003',
      customerName: 'C',
      mobileNumber: '9999999999',
      vehicleBrand: 'Yamaha',
      vehicleModel: 'R15',
      vehicleRegistrationNumber: 'MH08AB3333',
      vehicleType: 'Bike',
      requiredService: 'Engine Repair',
      preferredDate: '2026-11-11',
      preferredTime: 'Morning',
      problemDescription: '',
      status: 'Completed',
      createdAt: '2026-11-08'
    }
  ];

  const stats = calculateBookingStats(mockBookings);
  assert.equal(stats.total, 3);
  assert.equal(stats.pending, 1);
  assert.equal(stats.confirmed, 1);
  assert.equal(stats.completed, 1);
  assert.equal(stats.cancelled, 0);
});
