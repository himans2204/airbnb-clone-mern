import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="py-10 text-center">
      <h1 className="text-4xl font-bold text-brand-700">404</h1>
      <p className="mt-2 text-stone-600">This page does not exist.</p>
      <Link to="/" className="mt-4 inline-block text-brand-600 underline">Back to home</Link>
    </section>
  );
}

export default NotFound;
