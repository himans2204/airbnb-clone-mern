import { APP_NAME } from '../config';

function Home() {
  return (
    <section className="py-10 text-center">
      <h1 className="text-4xl font-bold text-brand-700">Find a place that feels like home</h1>
      <p className="mt-3 text-stone-600">Search stays, book your dates and manage your trips with {APP_NAME}.</p>
    </section>
  );
}

export default Home;
