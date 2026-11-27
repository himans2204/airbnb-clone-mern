import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/authContext';

const smallButton = 'rounded-md border border-sand-300 px-3 py-1 text-sm text-stone-700 hover:bg-sand-100';

function Dashboard() {
  const { user } = useAuth();
  const isHost = user.role === 'host';

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isHost) return;

    let ignore = false;

    api
      .get('/properties/mine')
      .then(({ data }) => {
        if (!ignore) setProperties(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.response?.data?.message || 'Could not load your listings.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isHost]);

  async function handleDelete(id) {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;

    try {
      await api.delete(`/properties/${id}`);
      setProperties((current) => current.filter((property) => property._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete the listing.');
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-700">Dashboard</h1>
      <p className="mt-2 text-stone-700">Welcome, {user.name}.</p>
      <p className="text-sm text-stone-500">{user.email} · {user.role}</p>

      {!isHost && (
        <p className="mt-6 text-stone-600">Your bookings will appear here.</p>
      )}

      {isHost && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-stone-800">My listings</h2>
            <Link
              to="/dashboard/properties/new"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Add a property
            </Link>
          </div>

          {loading && <p className="mt-4 text-stone-600">Loading your listings...</p>}

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          {!loading && !error && properties.length === 0 && (
            <p className="mt-4 text-stone-600">You have not listed any properties yet.</p>
          )}

          <ul className="mt-4 space-y-3">
            {properties.map((property) => (
              <li
                key={property._id}
                className="flex flex-col gap-3 rounded-xl border border-sand-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-stone-800">{property.title}</p>
                  <p className="text-sm text-stone-500">
                    {property.location} · ₹{property.pricePerNight.toLocaleString('en-IN')} / night
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link to={`/properties/${property._id}`} className={smallButton}>View</Link>
                  <Link to={`/dashboard/properties/${property._id}/edit`} className={smallButton}>Edit</Link>
                  <button onClick={() => handleDelete(property._id)} className={smallButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
