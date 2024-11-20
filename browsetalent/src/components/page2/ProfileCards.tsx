import React from "react";
import { Link } from "react-router-dom";

interface Freelancer {
  id: string | number;
  name: string;
  profilePicture: string;
  rating: number;
  reviews: number;
  skills: string[];
  location: string;
  hourlyRate: string;
  jobSuccess: number;
  trending: boolean;
  category: string;
}

const ProfileCard: React.FC<{ freelancer: Freelancer }> = ({ freelancer }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="relative mb-4">
        <img
          src={freelancer.profilePicture}
          alt={freelancer.name}
          className="w-20 h-20 rounded-full object-cover mx-auto md:w-28 md:h-28"
        />
      </div>
      <h3 className="text-xl font-semibold text-center">{freelancer.name}</h3>

      {/* Rating and Reviews */}
      <div className="flex justify-center items-center space-x-1 mb-2">
        <span className="text-xs px-1 py-0.5 flex justify-center items-center">
          ⭐ {freelancer.rating}
        </span>
        <span className="text-gray-500 text-xs">
          ({freelancer.reviews} reviews)
        </span>
      </div>

      <div className="text-sm text-gray-600 text-center mt-2">
        {freelancer.category}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-1 my-2 border-b border-gray-400 pb-2">
        {freelancer.skills
          .flatMap((skill) =>
            skill
              .split(/[\s,]+/)
              .map((individualSkill) => individualSkill.trim())
          )
          .map((individualSkill, index) => (
            <span
              key={index}
              style={{ backgroundColor: "#ffd7f2" }}
              className="text-sm text-gray-700 rounded-full px-3 py-1 mb-2 text-center"
            >
              {individualSkill}
            </span>
          ))}
      </div>

      <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 space-y-2 md:space-y-0">
        <div className="flex flex-col items-center md:items-start w-1/3">
          <span className="font-semibold text-gray-700">Location</span>
          <span>{freelancer.location}</span>
        </div>
        <div className="flex flex-col items-center md:items-start w-1/3">
          <span className="font-semibold text-gray-700">Hourly Rate</span>
          <span>{freelancer.hourlyRate}</span>
        </div>
        <div className="flex flex-col items-center md:items-start w-1/3">
          <span className="font-semibold text-gray-700">Job Success</span>
          <span>{freelancer.jobSuccess}%</span>
        </div>
      </div>

      <Link to="#">
        <div className="bg-[#b9e1ca] text-green-700 text-sm text-center p-2 mt-3">
          View Profile Details
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
