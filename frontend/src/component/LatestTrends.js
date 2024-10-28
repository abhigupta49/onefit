import React,{ useState, useRef, useEffect } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from './ProductCard';




const LatestTrends = ({ latestTrends, loading }) => {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { 
                breakpoint: 1024, 
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            { 
                breakpoint: 768, 
                settings: { slidesToShow: 2.5, slidesToScroll: 1 } // This is for tablets or smaller screens
            },
            { 
                breakpoint: 480, 
                settings: { slidesToShow: 2.2, slidesToScroll: 1 } // Shows 2 products + part of the next
            },
        ],
    };

    return (
        <section className="bg-background py-6">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Trends</h2>
                {loading ? (
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {/* Shimmer loading cards here */}
                    </div>
                ) : latestTrends && latestTrends.length > 0 ? (
                    <Slider {...sliderSettings} className="flex">
                        {latestTrends.map((product) => (
                            <div key={product.id} className="px-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p className="text-center text-gray-500">No products available</p>
                )}
            </div>
        </section>
    );
};

export default LatestTrends;
