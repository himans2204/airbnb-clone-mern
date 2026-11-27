import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import PropertyForm from '../components/PropertyForm';

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let ignore = false;

    api
      .get(`/properties/${id}`)
      .then(({ data }) => {
        if (!ignore) setProperty(data);
      })
      .catch((err) => {
        if (!ignore) {
          setLoadError(err.response?.status === 404 ? 'This property does not exist.' : 'Could not load this property.');
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleSubmit(values) {
    setSaveError('');
    setSaving(true);

    try {
      await api.put(`/properties/${id}`, values);
      navigate(`/properties/${id}`);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-stone-600">Loading...</p>;
  }

  if (loadError) {
    return (
      <section>
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{loadError}</p>
        <Link to="/dashboard" className="mt-4 inline-block text-brand-600 underline">Back to dashboard</Link>
      </section>
    );
  }

  const initialValues = {
    title: property.title,
    description: property.description,
    location: property.location,
    propertyType: property.propertyType,
    pricePerNight: String(property.pricePerNight),
    maxGuests: String(property.maxGuests),
    amenities: (property.amenities || []).join(', '),
  };

  return (
    <section className="mx-auto max-w-xl rounded-xl border border-sand-200 bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold text-brand-700">Edit property</h1>
      <PropertyForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        loading={saving}
        error={saveError}
      />
    </section>
  );
}

export default EditProperty;
