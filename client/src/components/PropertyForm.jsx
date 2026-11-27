import { useState } from 'react';

const propertyTypes = ['Apartment', 'House', 'Cottage', 'Room', 'Houseboat', 'Villa'];

const emptyValues = {
  title: '',
  description: '',
  location: '',
  propertyType: 'Apartment',
  pricePerNight: '',
  maxGuests: '',
  amenities: '',
};

const inputClass =
  'w-full rounded-lg border border-sand-300 bg-white px-3 py-2 focus:border-brand-500 focus:outline-none';
const labelClass = 'mb-1 block text-sm font-medium text-stone-700';

function PropertyForm({ initialValues, onSubmit, submitLabel, loading, error }) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      title: values.title,
      description: values.description,
      location: values.location,
      propertyType: values.propertyType,
      pricePerNight: Number(values.pricePerNight),
      maxGuests: Number(values.maxGuests),
      amenities: values.amenities
        .split(',')
        .map((amenity) => amenity.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input id="title" name="title" type="text" required value={values.title} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows="5" required value={values.description} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>Location (city and state)</label>
        <input id="location" name="location" type="text" required value={values.location} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="propertyType" className={labelClass}>Property type</label>
        <select id="propertyType" name="propertyType" value={values.propertyType} onChange={handleChange} className={inputClass}>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pricePerNight" className={labelClass}>Price per night (₹)</label>
          <input id="pricePerNight" name="pricePerNight" type="number" min="1" required value={values.pricePerNight} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="maxGuests" className={labelClass}>Maximum guests</label>
          <input id="maxGuests" name="maxGuests" type="number" min="1" required value={values.maxGuests} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="amenities" className={labelClass}>Amenities (separate with commas)</label>
        <input id="amenities" name="amenities" type="text" placeholder="WiFi, Parking, Kitchen" value={values.amenities} onChange={handleChange} className={inputClass} />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default PropertyForm;
