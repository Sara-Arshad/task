import React from "react";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import { Link } from "react-router-dom";

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

const TrendingServices: React.FC = () => {
  const { data: freelancers = [], isLoading, error } = useGetAllFreelancers();

  const trendingFreelancers = freelancers.filter(
    (freelancer) => freelancer.trending
  );

  // Arrow Components
  function NextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          right: "0px",
          borderRadius: "50%",
          color: "white",
          position: "absolute",
        }}
        onClick={onClick}
      />
    );
  }

  // PrevArrow component
  function PrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "5px",
        }}
        onClick={onClick}
      />
    );
  }

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: (
      <NextArrow className="slick-next" style={{}} onClick={() => {}} />
    ),
    prevArrow: (
      <PrevArrow className="slick-prev" style={{}} onClick={() => {}} />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <p>Loading trending services...</p>;
  if (error) return <p>Error loading trending services: {error.message}</p>;

  return (
    <section className="py-12 px-4 bg-[#F1FCFA]">
      <div className=" mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Trending Services
        </h3>
        <div className="flex flex-col md:flex-row md:justify-between text-center md:text-left">
          <p className="text-gray-600 text-sm md:text-base">
            Most viewed and all-time top-selling services
          </p>
          <Link to="/home2">
            <p className="text-gray-600 text-sm md:text-base mt-2 md:mt-0 cursor-pointer hover:underline">
              All Categories →
            </p>
          </Link>
        </div>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {trendingFreelancers.map((freelancer, index) => (
            <div
              key={freelancer.id || index}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mx-3 mb-4 w-full sm:w-72 md:w-56"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={freelancer.profilePicture || "default-image.jpg"}
                  alt={freelancer.name}
                  className="w-full h-36 sm:h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Category */}
                <p className="text-xs sm:text-sm text-gray-600">
                  {freelancer.category}
                </p>

                {/* Service Title */}
                <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mt-2">
                  <a
                    href={`/services/${freelancer.id}`}
                    className="text-grey-600 hover:underline"
                  >
                    {freelancer.service}
                  </a>
                </h3>

                {/* Rating Section */}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-yellow-500 text-sm sm:text-base">
                    ⭐ {freelancer.rating}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    ({freelancer.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex items-center justify-between border-t p-4">
                {/* Freelancer Info */}
                <div className="flex items-center space-x-2">
                  <img
                    src={freelancer.profilePicture || "default-image.jpg"}
                    alt={freelancer.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                  />
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">
                    {freelancer.name}
                  </p>
                </div>

                {/* Hourly Rate */}
                <p className="text-sm sm:text-lg font-semibold text-gray-800">
                  ${freelancer.hourlyRate}/hr
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TrendingServices;
