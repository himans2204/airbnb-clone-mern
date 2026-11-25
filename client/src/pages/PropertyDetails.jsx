import { useParams } from 'react-router-dom';

function PropertyDetails() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-700">Property details</h1>
      <p className="mt-2 text-stone-600">Showing property with id: {id}</p>
    </section>
  );
}

export default PropertyDetails;
