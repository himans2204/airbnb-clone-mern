import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const { _id, title, location, propertyType, maxGuests, pricePerNight, images } = property;
  const photo = images && images.length > 0 ? images[0].url : null;

  return (
    <Link
      to={`/properties/${_id}`}
      className="block overflow-hidden rounded-xl border border-sand-200 bg-white transition hover:shadow-md"
    >
      {photo ? (
        <img src={photo} alt={title} className="h-44 w-full object-cover" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-sand-200 text-sm text-stone-500">
          Photo coming soon
        </div>
      )}
      <div className="p-4">
        <h2 className="font-semibold text-stone-800">{title}</h2>
        <p className="text-sm text-stone-500">{location}</p>
        <p className="mt-1 text-sm text-stone-500">
          {propertyType} · up to {maxGuests} guests
        </p>
        <p className="mt-3 text-brand-700">
          <span className="font-bold">₹{pricePerNight.toLocaleString('en-IN')}</span> / night
        </p>
      </div>
    </Link>
  );
}

export default PropertyCard;
