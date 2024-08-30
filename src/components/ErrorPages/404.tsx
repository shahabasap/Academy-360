import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-md">
        <p className="text-3xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={() => navigate('/')}
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300 ease-in-out"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
