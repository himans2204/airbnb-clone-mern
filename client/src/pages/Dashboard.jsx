import { useAuth } from '../context/authContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-700">Dashboard</h1>
      <p className="mt-2 text-stone-700">Welcome, {user.name}.</p>
      <p className="text-sm text-stone-500">{user.email} · {user.role}</p>
      <p className="mt-4 text-stone-600">Your bookings and listings will appear here.</p>
    </section>
  );
}

export default Dashboard;
