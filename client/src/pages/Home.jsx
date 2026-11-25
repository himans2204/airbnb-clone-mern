import { APP_NAME } from '../config';
import PropertyCard from '../components/PropertyCard';
import { sampleProperties } from '../data/sampleProperties';

function Home() {
  return (
    <>
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold text-brand-700">Find a place that feels like home</h1>
        <p className="mt-3 text-stone-600">
          Search stays, book your dates and manage your trips with {APP_NAME}.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-stone-800">Popular stays</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
