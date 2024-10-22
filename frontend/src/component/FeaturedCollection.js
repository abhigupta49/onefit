import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Shimmer Effect Component
const ShimmerCard = () => (
  <div className="min-w-[250px] p-6 rounded-lg shadow-lg bg-gray-200 animate-pulse">
    <div className="h-64 bg-gray-300 rounded-t-lg mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-4"></div>
    <div className="h-10 w-24 bg-gray-300 rounded-full mx-auto"></div>
  </div>
);

// Featured Collection Section
const FeaturedCollection = ({ featuredCollection, loading }) => {
  // Slider settings for single row with multiple items
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 products at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-12 overflow-x-hidden">
      <h2 className="text-4xl font-bold mb-8 text-center text-black">Featured Collection</h2>
      {loading ? (
        <div className="container mx-auto">
          <div className="flex space-x-6 p-8">
            {/* Show 4 shimmer cards as placeholders */}
            {[1, 2, 3, 4].map((_, idx) => (
              <ShimmerCard key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <Slider {...sliderSettings}>
            {featuredCollection.map((product) => (
              <div key={product._id} className="p-4">
                <div className="min-w-[250px] bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto h-64 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>

                  {/* Product Rating */}
                  <div className="flex justify-center items-center mb-4">
                    <span className="text-yellow-500 font-bold mr-2">
                      {product.rating?.rate || 4.5} ★
                    </span>
                    <span className="text-gray-600">
                      ({product.rating?.count || 100} reviews)
                    </span>
                  </div>

                  {/* Dynamic Routing using Link */}
                  <Link
                    to={`/products/${product._id}`}
                    className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default FeaturedCollection;
