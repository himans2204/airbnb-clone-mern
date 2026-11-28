import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    api
      .get(`/properties/${id}`)
      .then(({ data }) => {
        if (!ignore) setProperty(data);
      })
      .catch((err) => {
        if (ignore) return;
        if (err.response?.status === 404) {
          setError('This property does not exist.');
        } else {
          setError('Could not load this property. Please check that the server is running.');
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-stone-600">Loading...</p>;
  }

  if (error) {
    return (
      <section>
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        <Link to="/" className="mt-4 inline-block text-brand-600 underline">Back to home</Link>
      </section>
    );
  }

  const images = property.images || [];

  return (
    <section className="mx-auto max-w-3xl">
      {images.length > 0 ? (
        <img src={images[0].url} alt={property.title} className="h-72 w-full rounded-xl object-cover" />
      ) : (
        <div className="flex h-72 items-center justify-center rounded-xl bg-sand-200 text-stone-500">
          Photo coming soon
        </div>
      )}

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.slice(1).map((image) => (
            <img
              key={image.publicId}
              src={image.url}
              alt={property.title}
              className="h-24 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      <h1 className="mt-6 text-3xl font-bold text-brand-700">{property.title}</h1>
      <p className="mt-1 text-stone-600">{property.location}</p>
      <p className="mt-1 text-sm text-stone-500">
        {property.propertyType} · up to {property.maxGuests} guests
        {property.host && ` · Hosted by ${property.host.name}`}
      </p>

      <p className="mt-4 text-xl text-brand-700">
        <span className="font-bold">₹{property.pricePerNight.toLocaleString('en-IN')}</span> / night
      </p>

      <h2 className="mt-6 text-lg font-semibold text-stone-800">About this place</h2>
      <p className="mt-2 whitespace-pre-line text-stone-700">{property.description}</p>

      {property.amenities && property.amenities.length > 0 && (
        <>
          <h2 className="mt-6 text-lg font-semibold text-stone-800">Amenities</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <li key={amenity} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-stone-700">
                {amenity}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default PropertyDetails;
