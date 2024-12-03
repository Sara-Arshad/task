import React from "react";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import Coding from "../../assets/coding.png";
import webDevelopmentIcon from "../../assets/computer.png";
// import devIcon from "../../assets/dev-icon.png";
// import designIcon from "../../assets/design-icon.png";
import defaultIcon from "../../assets/react.svg";
import { Link } from "react-router-dom";
const BrwoseServiceByCategory: React.FC = () => {
  const { data: freelancers = [], isLoading, error } = useGetAllFreelancers();
  const categoryIcons = {
    "Web Development": Coding,
    Dev: webDevelopmentIcon,
  };

  if (isLoading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error.message}</p>;

  const groupedByCategory = freelancers.reduce(
    (acc: Record<string, string[]>, freelancer) => {
      if (!acc[freelancer.category]) {
        acc[freelancer.category] = [];
      }
      acc[freelancer.category].push(freelancer.service);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <section className="py-12 mt-32 px-4 ">
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Browse services by category
        </h3>
        <div className="flex flex-col md:flex-row md:justify-between text-center md:text-left">
          <p className="text-gray-600 text-sm md:text-base">
            Get some Inspirations from 1800+ skills
          </p>
          <Link to="/home2">
            <p className="text-gray-600 text-sm md:text-base mt-2 md:mt-0 cursor-pointer hover:underline">
              All Categories →
            </p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-8">
        {Object.entries(groupedByCategory).map(([category, services]) => (
          <div
            key={category}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-8">
              <img
                src={
                  categoryIcons[category as keyof typeof categoryIcons] ||
                  defaultIcon
                }
                alt="Category Icon"
                className="w-10 h-10 mr-2"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {services.length} Services
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
              {category}
            </h3>

            <div className="text-sm text-gray-600">{services[0]}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrwoseServiceByCategory;
