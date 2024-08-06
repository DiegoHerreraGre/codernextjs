'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ product }) {
  const router = useRouter();

  return (
    <article className="overflow-hidden bg-white rounded-lg shadow-xl backdrop-blur-md backdrop-filter">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-96 md:h-auto">
          {product.thumbnail && product.thumbnail.length > 0 ? (
            <Image
              src={product.thumbnail[0]}
              alt={product.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition duration-300 ease-in-out hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-xl text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div className="p-8 space-y-6">
          <h1 className="mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-conic from-blue-500 via-purple-500 to-pink-500 animate-text-gradient">{product.title}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-600">ID</p>
              <p className="text-gray-800">{product._id}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Code</p>
              <p className="text-gray-800">{product.code}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Stock</p>
              <p className="text-gray-800">{product.stock}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Category</p>
              <p className="text-gray-800">{product.category}</p>
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 space-x-2 font-sans">
            <p className="text-5xl font-extrabold text-gray-900">
              ${product.price != null ? product.price.toFixed(2) : 'N/A'}
            </p>
            {product.status != null && (
              <p className={`px-3 py-1 text-sm font-medium rounded-full ${
                product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.status ? 'Available' : 'Not Available'}
              </p>
            )}
          </div>
          <button
            onClick={() => router.back()}
            className="w-full px-6 py-3 text-lg font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-input hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Product List
          </button>
        </div>
      </div>
    </article>
  );
}