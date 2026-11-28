import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/authContext';
import PropertyForm from '../components/PropertyForm';

function AddProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/properties', formData);
      navigate(`/properties/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (user.role !== 'host') {
    return (
      <section>
        <h1 className="text-2xl font-bold text-brand-700">Add a property</h1>
        <p className="mt-2 text-stone-600">Only host accounts can add properties. Create a new account and choose "List my property".</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl rounded-xl border border-sand-200 bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold text-brand-700">Add a property</h1>
      <PropertyForm onSubmit={handleSubmit} submitLabel="Create listing" loading={loading} error={error} />
    </section>
  );
}

export default AddProperty;
