import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const { id, title, location, type, guests, pricePerNight } = property;

  return (
    <Link
      to={`/properties/${id}`}
      className="block overflow-hidden rounded-xl border border-sand-200 bg-white transition hover:shadow-md"
    >
      <div className="flex h-44 items-center justify-center bg-sand-200 text-sm text-stone-500">
        Photo coming soon
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-stone-800">{title}</h2>
        <p className="text-sm text-stone-500">{location}</p>
        <p className="mt-1 text-sm text-stone-500">
          {type} · up to {guests} guests
        </p>
        <p className="mt-3 text-brand-700">
          <span className="font-bold">₹{pricePerNight.toLocaleString('en-IN')}</span> / night
        </p>
      </div>
    </Link>
  );
}

export default PropertyCard;
