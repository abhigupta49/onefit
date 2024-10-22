
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

// Latest Trends Section
const LatestTrends = ({ latestTrends, loading }) => {

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
    <section className="bg-white py-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-black">Latest Trends</h2>
      {loading ? (<div className="container mx-auto">
          <div className="flex space-x-6 p-8">
            {/* Show 4 shimmer cards as placeholders */}
            {[1, 2, 3, 4].map((_, idx) => (
              <ShimmerCard key={idx} />
            ))}
          </div>
        </div>
      )  : (
        <div className="container mx-auto">
          <Slider {...sliderSettings}>
            {latestTrends.map((item) => (
              <div key={item._id} className="p-4">
                <div className="bg-white text-black p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 font-bold mr-2">
                      {item.rating.rate} ★
                    </span>
                    <span className="text-gray-600">
                      ({item.rating.count} reviews)
                    </span>
                  </div>

                  {/* Dynamic Routing using Link */}
                  <Link
                    to={`/products/${item.id}`}
                    className="bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition"
                  >
                    Shop Now
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

export default LatestTrends;
