import { useEffect, useState } from 'react';
import { APP_NAME } from '../config';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    api
      .get('/properties')
      .then(({ data }) => {
        if (!ignore) setProperties(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.response?.data?.message || 'Could not load the stays. Please check that the server is running.');
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold text-brand-700">Find a place that feels like home</h1>
        <p className="mt-3 text-stone-600">
          Search stays, book your dates and manage your trips with {APP_NAME}.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-stone-800">Available stays</h2>

        {loading && <p className="text-stone-600">Loading stays...</p>}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {!loading && !error && properties.length === 0 && (
          <p className="text-stone-600">No stays have been listed yet.</p>
        )}

        {properties.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
