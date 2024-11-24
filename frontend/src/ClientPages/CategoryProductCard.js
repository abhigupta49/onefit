import React from 'react';
import { Image } from '@mui/icons-material';
import { Star, ShoppingCart } from 'lucide-react';



const CategoryProductCard = ({ name, price, image, rating, reviewCount, inStock }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="transition-transform hover:scale-105"
            />
            {!inStock && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>
          <div className="p-4 flex-grow">
            <h2 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2">{name}</h2>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-gray-600">({reviewCount})</span>
            </div>
            <p className="text-lg font-bold text-blue-600">${price.toFixed(2)}</p>
          </div>
          <div className="p-4 pt-0">
            <button
              className={`w-full py-2 px-4 rounded font-semibold flex items-center justify-center transition-colors ${
                inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      );
};

export default CategoryProductCard;

