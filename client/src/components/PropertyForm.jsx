import { useEffect, useMemo, useState } from 'react';

const propertyTypes = ['Apartment', 'House', 'Cottage', 'Room', 'Houseboat', 'Villa'];

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
const smallButton = 'rounded-md border border-sand-300 px-2 py-1 text-xs text-stone-700 hover:bg-sand-100';

function PropertyForm({ initialValues, onSubmit, submitLabel, loading, error }) {
  const { images: savedImages = [], ...savedValues } = initialValues || {};

  const [values, setValues] = useState({ ...emptyValues, ...savedValues });
  const [removedIds, setRemovedIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [fileError, setFileError] = useState('');

  const keptCount = savedImages.length - removedIds.length;
  const previews = useMemo(() => newFiles.map((file) => URL.createObjectURL(file)), [newFiles]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleFiles(event) {
    const chosen = Array.from(event.target.files);
    event.target.value = '';
    setFileError('');

    if (chosen.some((file) => !file.type.startsWith('image/'))) {
      setFileError('Only image files are allowed.');
      return;
    }
    if (chosen.some((file) => file.size > MAX_FILE_SIZE)) {
      setFileError('Each image must be 5 MB or smaller.');
      return;
    }
    if (keptCount + newFiles.length + chosen.length > MAX_IMAGES) {
      setFileError(`A property can have at most ${MAX_IMAGES} images.`);
      return;
    }

    setNewFiles([...newFiles, ...chosen]);
  }

  function removeNewFile(index) {
    setNewFiles(newFiles.filter((file, position) => position !== index));
  }

  function toggleSavedImage(publicId) {
    setFileError('');

    if (removedIds.includes(publicId)) {
      if (keptCount + newFiles.length + 1 > MAX_IMAGES) {
        setFileError(`A property can have at most ${MAX_IMAGES} images.`);
        return;
      }
      setRemovedIds(removedIds.filter((id) => id !== publicId));
    } else {
      setRemovedIds([...removedIds, publicId]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amenities = values.amenities
      .split(',')
      .map((amenity) => amenity.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('location', values.location);
    formData.append('propertyType', values.propertyType);
    formData.append('pricePerNight', values.pricePerNight);
    formData.append('maxGuests', values.maxGuests);
    formData.append('amenities', JSON.stringify(amenities));

    if (removedIds.length > 0) {
      formData.append('removeImages', JSON.stringify(removedIds));
    }
    newFiles.forEach((file) => formData.append('images', file));

    onSubmit(formData);
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

      <div>
        <label htmlFor="photos" className={labelClass}>Photos (up to {MAX_IMAGES}, 5 MB each)</label>

        {(savedImages.length > 0 || newFiles.length > 0) && (
          <div className="mb-3 grid grid-cols-3 gap-3">
            {savedImages.map((image) => {
              const removed = removedIds.includes(image.publicId);
              return (
                <div key={image.publicId} className="space-y-1">
                  <img
                    src={image.url}
                    alt="Saved"
                    className={`h-24 w-full rounded-lg object-cover ${removed ? 'opacity-30' : ''}`}
                  />
                  <button type="button" onClick={() => toggleSavedImage(image.publicId)} className={smallButton}>
                    {removed ? 'Undo' : 'Remove'}
                  </button>
                </div>
              );
            })}

            {previews.map((url, index) => (
              <div key={url} className="space-y-1">
                <img src={url} alt="New" className="h-24 w-full rounded-lg object-cover" />
                <button type="button" onClick={() => removeNewFile(index)} className={smallButton}>Remove</button>
              </div>
            ))}
          </div>
        )}

        <input id="photos" type="file" accept="image/*" multiple onChange={handleFiles} className="text-sm" />
        {fileError && <p className="mt-2 text-sm text-red-700">{fileError}</p>}
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
