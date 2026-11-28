import Property from '../models/Property.js';
import Booking from '../models/Booking.js';

const sortOptions = {
  newest: { createdAt: -1 },
  price_asc: { pricePerNight: 1 },
  price_desc: { pricePerNight: -1 },
};

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

// Reads one query value as text. A value that is not a string (for example a repeated parameter) is rejected.
function readText(query, name) {
  const value = query[name];

  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'string') {
    throw badRequest(`Invalid value for ${name}`);
  }

  const text = value.trim();
  return text === '' ? undefined : text;
}

function readNumber(query, name, { integer = false, min = 0 } = {}) {
  const text = readText(query, name);
  if (text === undefined) {
    return undefined;
  }

  const number = Number(text);
  if (!Number.isFinite(number) || number < min || (integer && !Number.isInteger(number))) {
    throw badRequest(`Invalid value for ${name}`);
  }

  return number;
}

function readDate(query, name) {
  const text = readText(query, name);
  if (text === undefined) {
    return undefined;
  }

  const date = new Date(`${text}T00:00:00.000Z`);
  const isRealDate = /^\d{4}-\d{2}-\d{2}$/.test(text) && !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === text;

  if (!isRealDate) {
    throw badRequest(`${name} must be a date like 2027-01-31`);
  }

  return date;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Turns the query string into a MongoDB filter and a sort order. Bad values throw a 400 error.
export async function buildPropertyQuery(query) {
  const filter = {};

  const location = readText(query, 'location');
  if (location) {
    if (location.length > 100) {
      throw badRequest('Location is too long');
    }
    filter.location = { $regex: escapeRegex(location), $options: 'i' };
  }

  const minPrice = readNumber(query, 'minPrice');
  const maxPrice = readNumber(query, 'maxPrice');
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw badRequest('minPrice cannot be higher than maxPrice');
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.pricePerNight = {};
    if (minPrice !== undefined) filter.pricePerNight.$gte = minPrice;
    if (maxPrice !== undefined) filter.pricePerNight.$lte = maxPrice;
  }

  const propertyType = readText(query, 'propertyType');
  if (propertyType !== undefined) {
    const allowedTypes = Property.schema.path('propertyType').enumValues;
    if (!allowedTypes.includes(propertyType)) {
      throw badRequest(`propertyType must be one of: ${allowedTypes.join(', ')}`);
    }
    filter.propertyType = propertyType;
  }

  const guests = readNumber(query, 'guests', { integer: true, min: 1 });
  if (guests !== undefined) {
    filter.maxGuests = { $gte: guests };
  }

  const checkIn = readDate(query, 'checkIn');
  const checkOut = readDate(query, 'checkOut');
  if ((checkIn && !checkOut) || (!checkIn && checkOut)) {
    throw badRequest('Please give both checkIn and checkOut');
  }

  if (checkIn && checkOut) {
    if (checkOut <= checkIn) {
      throw badRequest('checkOut must be after checkIn');
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (checkIn < today) {
      throw badRequest('checkIn cannot be in the past');
    }

    // A confirmed booking overlaps the requested dates when it starts before the check-out
    // and ends after the check-in. Those properties are left out.
    const busyPropertyIds = await Booking.find({
      status: 'confirmed',
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    }).distinct('property');

    if (busyPropertyIds.length > 0) {
      filter._id = { $nin: busyPropertyIds };
    }
  }

  const sortName = readText(query, 'sort') ?? 'newest';
  if (!sortOptions[sortName]) {
    throw badRequest(`sort must be one of: ${Object.keys(sortOptions).join(', ')}`);
  }

  return { filter, sort: sortOptions[sortName] };
}
