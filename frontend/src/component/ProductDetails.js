import React, { useEffect, useState } from 'react';
import { FaStar, FaTruck, FaStore } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import FeaturedCollection from './FeaturedCollection';
import { useContext } from 'react';
import CartContext, { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const discountBadgeClass = 'absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded';
const ratingClass = 'text-yellow-500 flex items-center';
const reviewsClass = 'text-zinc-500 text-sm ml-2';
const selectClass = 'mt-2 block w-full border border-gray-300 rounded-md p-2';
const colorButtonClass = 'w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-300';
const priceClass = 'text-2xl font-semibold text-gray-800';
const oldPriceClass = 'line-through text-zinc-500 text-lg';
const deliveryClass = 'text-sm text-gray-600 flex items-center mt-1';
const buttonClass = 'w-full py-3 text-white font-bold rounded-lg transition-all';
const shimmerClass = 'animate-pulse bg-gray-300 rounded-lg';
const quantityButtonClass = 'px-4 py-2 bg-gray-200 text-lg font-bold rounded hover:bg-gray-300';

const colorOptions = {
  gray: 'bg-gray-300',
  pink: 'bg-pink-300',
  yellow: 'bg-yellow-300',
  red: 'bg-red-300',
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('gray'); // Default color
  const [addedToCart, setAddedToCart] = useState(false); // New state for cart status
  const {addToCart} = useCart()

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        const updateData = data.map((product)=>({
          ...product,
          colors: ["white", "blue", "red"],
          originalPrice:product.price*8,
          discountPercentage:15,
          image: [product.image,"https://img.freepik.com/free-psd/white-t-shirt-front-mockup_23-292935585.jpg?t=st=1730027864~exp=1730031464~hmac=2e03a0e6c376fb815b627c017a99103dc09626d44dc8495f47133197bc6a30b9&w=740","https://img.freepik.com/free-photo/white-tshirt-red-background-template_1409-4076.jpg?t=st=1730028188~exp=1730031788~hmac=1c5b222eeef44b63bd53b942278a59b213203776a45e71662be5c36cf5cc0380&w=740"]
        }))
        setFeaturedCollection(updateData)
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        data.productColor = ["gray", "pink", "yellow", "red"]; // Example colors
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(true); // Set as added to cart
    toast.success("Added to cart"); // Show toast notification
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleColorChange = (color) => setSelectedColor(color);

  

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

  return (
    
    <>
      
      <div className="max-w-7xl mx-auto p-20 bg-white rounded-lg shadow-md grid grid-cols-1 m-20 mt-32 md:grid-cols-3 gap-8">
        <div className="relative">
          <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover" />
          <span className={discountBadgeClass}>-10%</span>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <div className={ratingClass}>
            <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar className="mr-1" /> <FaStar />
            <span className={reviewsClass}>{product.rating?.count}</span>
          </div>

          <div className={reviewsClass}>
            <span>{product.description}</span>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Choose Color</label>
            <div className="flex space-x-3 mt-2">
              {Object.keys(colorOptions).map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`${colorButtonClass} ${colorOptions[color]} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <div className="flex space-x-4 mt-2">
              {['M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-2 rounded-lg border ${selectedSize === size ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center mt-2 space-x-4">
              <button onClick={decreaseQuantity} className={quantityButtonClass}>-</button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button onClick={increaseQuantity} className={quantityButtonClass}>+</button>
            </div>
          </div>

          <div>
            <h3 className={priceClass}>Rs. {product.price} <span className={oldPriceClass}>Rs. {product.price * 4}</span></h3>
            <div className="mt-4 space-y-2">
              <p className={deliveryClass}><FaTruck className="mr-2" /> Delivery: February 1, from $15</p>
              <p className={deliveryClass}><FaStore className="mr-2" /> Pickup Point: Available in 3 warehouses, free</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            className={`${buttonClass} ${
              addedToCart ? 'bg-green-500' : 'bg-gray-800 hover:bg-gray-900'
            }`}
            onClick={() => handleAddToCart(product)}
            disabled={addedToCart} // Disable if already added
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
          <button className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}>
            Buy Now
          </button>
        </div>
      </div>

      <div>
        <FeaturedCollection featuredCollection={featuredCollection} loading={loading} />
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default ProductDetails;
