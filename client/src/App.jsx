import { APP_NAME } from './config';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-brand-700">{APP_NAME}</h1>
      <p className="text-stone-600">Find a place that feels like home.</p>
      <button className="rounded-lg bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700">
        Explore stays
      </button>
    </div>
  )
}

export default App
