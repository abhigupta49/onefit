import React, { useState, useEffect } from 'react';
import mensCollectionImage from '../images/mensCollection.jpg';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Assuming Tailwind is already installed

const HomePage = () => {
  const [latestTrends, setLatestTrends] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState([]);

  useEffect(() => {
    const dummyTrends = [
      { _id: '1', name: 'Stylish Tracksuit', description: 'Comfortable tracksuit for all-day wear.', imageUrl: 'https://via.placeholder.com/400x400' },
      { _id: '2', name: 'Cool T-shirt', description: 'Breathable fabric for your workout sessions.', imageUrl: 'https://via.placeholder.com/400x400' },
    ];

    const dummyFeatured = [
      { _id: '3', name: 'Premium Hoodie', description: 'Warm and stylish hoodie.', imageUrl: 'https://via.placeholder.com/400x400' },
      { _id: '4', name: 'Running Shoes', description: 'Lightweight running shoes for better performance.', imageUrl: 'https://via.placeholder.com/400x400' },
      { _id: '5', name: 'Sports Cap', description: 'Trendy cap to complete your sporty look.', imageUrl: 'https://via.placeholder.com/400x400' },
    ];

    setLatestTrends(dummyTrends);
    setFeaturedCollection(dummyFeatured);
  }, []);

  return (
    <div className="pt-16 font-bebas">
      
      {/* Hero Section */}
      <section className="relative h-[40rem] flex items-center justify-center text-white mb-8">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src='/hero.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black opacity-70 z-1"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Welcome to OneFit Sports</h1>
          <p className="text-xl mb-8">Get the best sportswear for men</p>
          <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Men Section with Background Image and Overlay */}
      <section className="relative bg-cover bg-center bg-no-repeat py-24 text-center m-8 rounded-md" style={{ backgroundImage: `url(${mensCollectionImage})` }}>
        <div className="absolute inset-0 bg-black opacity-70 rounded-md"></div>

        <div className="relative z-10 ">
          <h2 className="text-5xl font-bold mb-4 text-white">Men's Collection</h2>
          <p className="text-lg text-gray-200 mb-8">Explore the best collection of men's sportswear.</p>
          <Link to="/men">
            <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition">
              Shop Men’s Collection
            </button>
          </Link>
        </div>
      </section>

      {/* Latest Trends */}
      <section className="bg-white py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-black">Latest Trends</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestTrends.map((item) => (
            <div key={item._id} className="bg-white text-black p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
              <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-black">Featured Collection</h2>
        <div className="container mx-auto overflow-x-auto">
          <div className="flex space-x-6 p-8">
            {featuredCollection.map((product) => (
              <div key={product._id} className="min-w-[250px] bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl text-center">
                <img src={product.imageUrl} alt={product.name} className="mx-auto h-64 object-cover rounded-t-lg mb-4" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
