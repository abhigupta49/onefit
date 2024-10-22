import React, { useEffect, useState } from 'react';
import { FaStar, FaTruck, FaStore } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const discountBadgeClass = 'absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded';
const ratingClass = 'text-yellow-500 flex items-center';
const reviewsClass = 'text-zinc-500 text-sm ml-2';
const selectClass = 'mt-2 block w-full border border-gray-300 rounded-md p-2';
const colorButtonClass = 'w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-300';
const priceClass = 'text-2xl font-semibold text-gray-800';
const oldPriceClass = 'line-through text-zinc-500 text-lg';
const deliveryClass = 'text-sm text-gray-600 flex items-center mt-1';
const buttonClass = 'w-full py-3 text-white font-bold rounded-lg transition-all';
const shimmerClass = 'animate-pulse bg-gray-300 rounded-lg'; // Shimmer effect class

const ProductDetails = () => {

  const {id} = useParams();  // Capture the product ID from the URL
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    const fetchProduct = async () =>{
      try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      }
      catch(error){
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct()

  },[id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-20 bg-white rounded-lg shadow-md grid grid-cols-1 m-20 mt-32 md:grid-cols-3 gap-8">
        <div className="relative">
          <div className={`${shimmerClass} h-64 w-full`} />
          <span className={discountBadgeClass}>-10%</span>
        </div>
        <div className="flex flex-col space-y-4">
          <div className={`${shimmerClass} h-6 w-full`} />
          <div className={`${shimmerClass} h-4 w-1/2`} />
          <div className={`${shimmerClass} h-8 w-full`} />
          <div className={`${shimmerClass} h-8 w-16`} />
          <div className={`${shimmerClass} h-4 w-32`} />
        </div>
        <div className="space-y-4">
          <div className={`${shimmerClass} h-12 w-full`} />
          <div className={`${shimmerClass} h-12 w-full`} />
        </div>
      </div>
    );
  }

  console.log(product)
  return (
    <div className="max-w-7xl mx-auto p-20 bg-white rounded-lg shadow-md grid grid-cols-1 m-20 mt-32 md:grid-cols-3 gap-8">
      
      {/* Product Image */}
      <div className="relative">
        <img src={product.image} alt="Apple iPad Mini 2021" className="w-full rounded-lg object-cover" />
        <span className={discountBadgeClass}>-10%</span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <div className={ratingClass}>
          <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar />
          <span className={reviewsClass}>{product.rating.count}</span>
        </div>

        {/* Description */}
        <div className={reviewsClass}>
          
          <span className={reviewsClass}>{product.description}</span>
        </div>
        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose Color</label>
          <div className="flex space-x-3 mt-2">
            <button className={`${colorButtonClass} bg-gray-300`} title="Gray"></button>
            <button className={`${colorButtonClass} bg-pink-300`} title="Pink"></button>
            <button className={`${colorButtonClass} bg-yellow-300`} title="Yellow"></button>
          </div>
        </div>

        {/* Pricing and Delivery Info */}
        <div>
          <h3 className={priceClass}>Rs. {product.price} <span className={oldPriceClass}>Rs. {product.price*4}</span></h3>
          <div className="mt-4 space-y-2">
            <p className={deliveryClass}><FaTruck className="mr-2" /> Delivery: February 1, from $15</p>
            <p className={deliveryClass}><FaStore className="mr-2" /> Pickup Point: Available in 3 warehouses, free</p>
          </div>
        </div>
      </div>

      {/* Add to Cart and Buy Now */}
      <div className="space-y-4">
        <button className={`${buttonClass} bg-gray-800 hover:bg-gray-900`}>Add to Cart</button>
        <button className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}>Buy Now</button>
      </div>
      
    </div>
  );
};

export default ProductDetails;
