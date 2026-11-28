import mongoose from 'mongoose';
import Property from '../models/Property.js';
import { uploadImageBuffer, deleteImage } from '../utils/cloudinaryUpload.js';
import { buildPropertyQuery } from '../utils/propertyFilters.js';

const MAX_IMAGES = 5;

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

// Forms send lists as text. This accepts an array, a JSON list or a comma-separated string.
function toList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // not JSON, so treat it as a comma-separated list
    }
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function pickEditableFields(body) {
  const data = {};
  const source = body || {};

  for (const field of editableFields) {
    if (source[field] !== undefined) {
      data[field] = field === 'amenities' ? toList(source[field]) : source[field];
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

async function removeFromCloudinary(images) {
  await Promise.allSettled(images.map((image) => deleteImage(image.publicId)));
}

// Uploads all files. If one fails, the ones that already went up are removed again.
async function uploadFiles(files, res) {
  const results = await Promise.allSettled(files.map((file) => uploadImageBuffer(file.buffer)));
  const uploaded = results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
  const failed = results.find((result) => result.status === 'rejected');

  if (failed) {
    await removeFromCloudinary(uploaded);
    console.error('Cloudinary upload failed:', failed.reason?.message);
    res.status(failed.reason?.http_code === 400 ? 400 : 500);
    throw new Error('Could not upload the images. Please check the files and try again.');
  }

  return uploaded;
}

export async function createProperty(req, res, next) {
  try {
    const property = new Property({ ...pickEditableFields(req.body), host: req.user._id });

    // Check the text fields first, so nothing is uploaded for a listing that would be rejected.
    await property.validate();

    const uploaded = await uploadFiles(req.files || [], res);
    property.images = uploaded;

    try {
      await property.save();
    } catch (error) {
      await removeFromCloudinary(uploaded);
      throw error;
    }

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
}

export async function getProperties(req, res, next) {
  try {
    const { filter, sort } = await buildPropertyQuery(req.query);
    const properties = await Property.find(filter).populate('host', 'name').sort(sort);
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

    const files = req.files || [];
    const idsToRemove = toList(req.body?.removeImages);
    const keptImages = property.images.filter((image) => !idsToRemove.includes(image.publicId));
    const removedImages = property.images.filter((image) => idsToRemove.includes(image.publicId));

    if (keptImages.length + files.length > MAX_IMAGES) {
      res.status(400);
      throw new Error(`A property can have at most ${MAX_IMAGES} images`);
    }

    Object.assign(property, pickEditableFields(req.body));
    await property.validate();

    const uploaded = await uploadFiles(files, res);
    property.images = [...keptImages, ...uploaded];

    try {
      await property.save();
    } catch (error) {
      await removeFromCloudinary(uploaded);
      throw error;
    }

    await removeFromCloudinary(removedImages);

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
    await removeFromCloudinary(property.images);

    res.json({ message: 'Property deleted' });
  } catch (error) {
    next(error);
  }
}
