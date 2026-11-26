import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';

const testEmail = 'test-host@example.com';

async function run() {
  await connectDB();
  await User.init();
  await User.deleteMany({ email: testEmail });

  let host;
  let property;

  try {
    host = await User.create({
      name: 'Test Host',
      email: testEmail,
      password: 'secret123',
      role: 'host',
    });
    console.log('1. User saved. Password is hashed:', host.password !== 'secret123');
    console.log('2. Password check works:', await host.matchPassword('secret123'));

    try {
      await User.create({ name: 'Duplicate', email: testEmail, password: 'secret123' });
      console.log('3. ERROR: duplicate email was accepted');
    } catch (error) {
      console.log('3. Duplicate email rejected:', error.code === 11000);
    }

    property = await Property.create({
      host: host._id,
      title: 'Test cottage',
      description: 'A test property used to check the model.',
      location: 'Test City',
      propertyType: 'Cottage',
      pricePerNight: 3000,
      maxGuests: 4,
      amenities: ['WiFi', 'Parking'],
      images: [{ url: 'https://example.com/photo.jpg', publicId: 'test' }],
    });
    console.log('4. Property saved:', property.title);

    const booking = await Booking.create({
      property: property._id,
      guest: host._id,
      checkIn: new Date('2026-12-10'),
      checkOut: new Date('2026-12-13'),
      guests: 2,
      totalPrice: 3 * property.pricePerNight,
    });
    console.log('5. Booking saved. Status:', booking.status, '| Total price:', booking.totalPrice);

    try {
      await Booking.create({
        property: property._id,
        guest: host._id,
        checkIn: new Date('2026-12-13'),
        checkOut: new Date('2026-12-10'),
        guests: 2,
        totalPrice: 9000,
      });
      console.log('6. ERROR: invalid dates were accepted');
    } catch (error) {
      console.log('6. Invalid dates rejected:', error.errors.checkOut.message);
    }
  } finally {
    if (property) await Booking.deleteMany({ property: property._id });
    if (property) await Property.deleteOne({ _id: property._id });
    if (host) await User.deleteOne({ _id: host._id });
    console.log('Test data deleted.');
    await mongoose.disconnect();
  }
}

run().catch((error) => {
  console.error('Test failed:', error.message);
  process.exit(1);
});
