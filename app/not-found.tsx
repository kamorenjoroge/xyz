// components/NotFound.tsx
import Link from 'next/link';
import { FiAlertTriangle, FiHome, FiPackage, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-warning/10 mb-6">
          <FiAlertTriangle className="h-10 w-10 text-warning" />
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-dark mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-dark mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition"
          >
            <FiHome className="h-5 w-5" />
            Return Home
          </Link>
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-dark text-dark hover:bg-dark hover:text-white rounded-lg font-medium transition"
          >
            <FiSearch className="h-5 w-5" />
            Browse Products
          </Link>
        </div>

        {/* Optional Search */}
        <div className="mt-12 w-full max-w-sm mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search our machines..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            <button className="absolute right-3 top-3 text-gray-500 hover:text-primary">
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Display popular products or categories */}
      <div className="mt-16 w-full max-w-4xl">
        <h3 className="text-lg font-medium text-dark mb-6">Popular Machines</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['CNC Machines', 'Lathes', 'Milling', 'Grinders'].map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category.toLowerCase().replace(' ', '-')}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center"
            >
              <div className="h-12 w-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <FiPackage
                 className="h-5 w-5" />
              </div>
              <span className="text-dark font-medium">{category}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;