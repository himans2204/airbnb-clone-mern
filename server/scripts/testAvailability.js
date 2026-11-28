// Checks the date filter against bookings. It creates a test host, two properties and two
// bookings directly in the database, runs the filter, and deletes everything it created.
// Run it inside server/ with: node scripts/testAvailability.js
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import { buildPropertyQuery } from '../utils/propertyFilters.js';

const marker = `avail${Date.now()}`;

async function isListed(propertyId, checkIn, checkOut) {
  const { filter } = await buildPropertyQuery({ location: marker, checkIn, checkOut });
  const found = await Property.find(filter);
  return found.some((property) => property._id.equals(propertyId));
}

function report(name, passed) {
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}`);
}

async function run() {
  await connectDB();

  let host;
  let confirmedProperty;
  let pendingProperty;

  try {
    host = await User.create({ name: 'Availability Host', email: `${marker}@example.com`, password: 'secret123', role: 'host' });

    const propertyData = {
      host: host._id,
      description: 'Availability test property.',
      location: `Test City ${marker}`,
      propertyType: 'Cottage',
      pricePerNight: 1000,
      maxGuests: 2,
    };
    confirmedProperty = await Property.create({ ...propertyData, title: 'Has a confirmed booking' });
    pendingProperty = await Property.create({ ...propertyData, title: 'Has a pending booking' });

    const bookingData = {
      guest: host._id,
      checkIn: new Date('2030-02-10T00:00:00.000Z'),
      checkOut: new Date('2030-02-14T00:00:00.000Z'),
      guests: 2,
      totalPrice: 4000,
    };
    await Booking.create({ ...bookingData, property: confirmedProperty._id, status: 'confirmed' });
    await Booking.create({ ...bookingData, property: pendingProperty._id, status: 'pending' });

    report('Dates that overlap a confirmed booking hide the property', !(await isListed(confirmedProperty._id, '2030-02-12', '2030-02-16')));
    report('Dates inside a confirmed booking hide the property', !(await isListed(confirmedProperty._id, '2030-02-11', '2030-02-13')));
    report('Dates that contain a confirmed booking hide the property', !(await isListed(confirmedProperty._id, '2030-02-08', '2030-02-20')));
    report('Checking out on the day the booking starts is allowed', await isListed(confirmedProperty._id, '2030-02-08', '2030-02-10'));
    report('Checking in on the day the booking ends is allowed', await isListed(confirmedProperty._id, '2030-02-14', '2030-02-16'));
    report('Dates far from the booking keep the property', await isListed(confirmedProperty._id, '2030-06-01', '2030-06-05'));
    report('A pending booking does not block the dates', await isListed(pendingProperty._id, '2030-02-12', '2030-02-16'));
  } finally {
    const propertyIds = [confirmedProperty, pendingProperty].filter(Boolean).map((property) => property._id);
    await Booking.deleteMany({ property: { $in: propertyIds } });
    await Property.deleteMany({ _id: { $in: propertyIds } });
    if (host) await User.deleteOne({ _id: host._id });
    console.log('Test data deleted.');
    await mongoose.disconnect();
  }
}

run().catch((error) => {
  console.error('Test failed:', error.message);
  process.exit(1);
});
