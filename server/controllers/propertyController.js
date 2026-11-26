import mongoose from 'mongoose';
import Property from '../models/Property.js';

// Only these fields can be set by the client. The host always comes from the logged-in user.
const editableFields = [
  'title',
  'description',
  'location',
  'propertyType',
  'pricePerNight',
  'maxGuests',
  'amenities',
];

function pickEditableFields(body) {
  const data = {};
  const source = body || {};

  for (const field of editableFields) {
    if (source[field] !== undefined) {
      data[field] = source[field];
    }
  }

  return data;
}

async function findPropertyOr404(id, res) {
  const property = mongoose.isValidObjectId(id) ? await Property.findById(id) : null;

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  return property;
}

function checkOwner(property, user, res) {
  if (property.host.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error('You can only change your own listings');
  }
}

export async function createProperty(req, res, next) {
  try {
    const property = await Property.create({ ...pickEditableFields(req.body), host: req.user._id });
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
}

export async function getProperties(req, res, next) {
  try {
    const properties = await Property.find().populate('host', 'name').sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    next(error);
  }
}

export async function getMyProperties(req, res, next) {
  try {
    const properties = await Property.find({ host: req.user._id }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    next(error);
  }
}

export async function getPropertyById(req, res, next) {
  try {
    const property = await findPropertyOr404(req.params.id, res);
    await property.populate('host', 'name');
    res.json(property);
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const property = await findPropertyOr404(req.params.id, res);
    checkOwner(property, req.user, res);

    Object.assign(property, pickEditableFields(req.body));
    await property.save();

    res.json(property);
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(req, res, next) {
  try {
    const property = await findPropertyOr404(req.params.id, res);
    checkOwner(property, req.user, res);

    await property.deleteOne();

    res.json({ message: 'Property deleted' });
  } catch (error) {
    next(error);
  }
}
