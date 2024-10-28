import React, { useState, useEffect } from 'react';
import mensCollectionImage from '../images/mensCollection.jpg';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Assuming Tailwind is already installed
import LatestTrends from './LatestTrends';
import FeaturedCollection from './FeaturedCollection';
import { Button } from '@mui/material';

const HomePage = () => {
  const [latestTrends, setLatestTrends] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
    .then((response) => response.json())
    .then((data)=>{
      
      const updateData = data.map((product)=>({
        ...product,
        colors: ["white", "blue", "red"],
        originalPrice:product.price*8,
        discountPercentage:15,
        image: [product.image,"https://img.freepik.com/free-psd/white-t-shirt-front-mockup_23-292935585.jpg?t=st=1730027864~exp=1730031464~hmac=2e03a0e6c376fb815b627c017a99103dc09626d44dc8495f47133197bc6a30b9&w=740","https://img.freepik.com/free-photo/white-tshirt-red-background-template_1409-4076.jpg?t=st=1730028188~exp=1730031788~hmac=1c5b222eeef44b63bd53b942278a59b213203776a45e71662be5c36cf5cc0380&w=740"]
      }))
      setLatestTrends(updateData);
      setFeaturedCollection(updateData)
      setLoading(false)

      console.log(updateData)
    })
    .catch((error)=>{
      console.error("Error fetching the products:",error)
      setLoading(false)
    })

    
  }, []);

  return (
    <div className="pt-16 font-bebas">
      <section className="relative h-[85vh] flex flex-col md:flex-row">
      {/* Left side */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src="https://img.freepik.com/free-photo/handsome-man-exercising-park-sports-wear_1303-21908.jpg?ga=GA1.1.441838425.1730028145&semt=ais_hybrid"
          alt="Man demonstrating flexibility"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src="https://media.istockphoto.com/id/1321017606/photo/multicolored-sport-sleeveless-t-shirts-and-shirts.jpg?s=612x612&w=0&k=20&c=NddwChiHYyB2Swr3emp94PiSGHV2RQXzghkmmj3KkWo="
          alt="Close-up of feet with one wearing a blue athletic shoe"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay for enhanced text visibility */}
      <div className="absolute inset-0 bg-black opacity-40 z-5"></div>

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">ULTIMATE</h1>
        <h2 className="text-5xl md:text-7xl font-light mb-8">COMFORT</h2>
        <p className="text-xl mb-8">Rest & Recovery</p>
        <Button
          variant="outlined"
          size="large"
          style={{
            color: 'white',
            borderColor: 'white',
          }}
          className="hover:bg-black hover:text-black transition-colors"
        >
          SHOP ALL
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>

      {/* Logo */}
      <div className="absolute bottom-4 left-4 z-20">
        <img
          src="https://media.istockphoto.com/id/173884521/photo/red-football-shirt.webp?a=1&b=1&s=612x612&w=0&k=20&c=_4g1-OJKmNQAD3ILUZU3RyOuajTe9Scf8X0-A0AZfEs="
          alt="Under Armour logo"
          width={50}
          height={50}
        />
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
      <LatestTrends latestTrends={latestTrends} loading={loading}/>

      {/* Featured Collection */}
      <FeaturedCollection featuredCollection={featuredCollection} loading={loading}/>
      
    </div>
  );
};

export default HomePage;
