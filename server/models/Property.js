import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'Cottage', 'Room', 'Houseboat', 'Villa'],
      required: true,
    },
    pricePerNight: { type: Number, required: true, min: 1 },
    maxGuests: { type: Number, required: true, min: 1 },
    amenities: [String],
    images: [{ _id: false, url: String, publicId: String }],
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
