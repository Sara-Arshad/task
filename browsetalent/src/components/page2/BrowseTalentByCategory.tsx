import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCards";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocationFilter,
  setLanguageFilter,
  setSkillsFilter,
  setPriceFilter,
} from "../../redux/slices/filterSlice";
import SortIcon from "@mui/icons-material/Sort";
import { Freelancer } from "../../redux/slices/freelauncerSlice";
import { RootState } from "../../redux/store";

interface BrowseTalentByCategoryProps {
  query: string;
  category: string;
}

const BrowseTalentByCategory: React.FC<BrowseTalentByCategoryProps> = ({
  query = "",
  category,
}) => {
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(
    []
  );

  const { data: freelancers = [], isLoading, error } = useGetAllFreelancers();

  const locationFilter = useSelector(
    (state: RootState) => state.filters.location
  );
  const languageFilter = useSelector(
    (state: RootState) => state.filters.language
  );
  const skillsFilter = useSelector((state: RootState) => state.filters.skills);
  const priceFilter = useSelector((state: RootState) => state.filters.price);

  const dispatch = useDispatch();

  const [locations, setLocations] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (freelancers.length > 0) {
      const uniqueLocations = Array.from(
        new Set(freelancers.map((freelancer) => freelancer.location))
      );
      const uniqueLanguages = Array.from(
        new Set(freelancers.map((freelancer) => freelancer.language))
      );
      const allSkills = Array.from(
        new Set(
          freelancers.flatMap((freelancer) =>
            freelancer.skills.flatMap((skill) =>
              skill.split(/[\s,]+/).map((s) => s.trim())
            )
          )
        )
      );

      setLocations(uniqueLocations);
      setLanguages(uniqueLanguages);
      setSkills(allSkills);

      // Filter freelancers based on search and filters
      const lowerCaseQuery = query.trim().toLowerCase();
      const filtered = freelancers.filter((freelancer) => {
        const matchesQuery =
          freelancer.name.toLowerCase().includes(lowerCaseQuery) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseQuery)
          );
        const matchesCategory = category
          ? freelancer.category === category
          : true;
        const matchesLocation =
          locationFilter === "All" || freelancer.location === locationFilter;
        const matchesLanguage =
          languageFilter === "All" || freelancer.language === languageFilter;
        const matchesSkills =
          skillsFilter === "All" ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(skillsFilter.toLowerCase())
          );
        const matchesPrice =
          priceFilter === 0 || parseFloat(freelancer.hourlyRate) <= priceFilter;

        return (
          matchesQuery &&
          matchesCategory &&
          matchesLocation &&
          matchesLanguage &&
          matchesSkills &&
          matchesPrice
        );
      });

      setFilteredFreelancers(filtered);
    } else {
      setFilteredFreelancers([]);
    }
  }, [
    freelancers,
    query,
    category,
    locationFilter,
    languageFilter,
    skillsFilter,
    priceFilter,
  ]);

  if (isLoading) return <p>Loading freelancers...</p>;
  if (error) return <p>Error loading freelancers: {error.message}</p>;

  return (
    <section className="py-12 px-4">
      <div className="flex lg:flex-row flex-col md:flex-col justify-between items-start mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={locationFilter}
            onChange={(e) => dispatch(setLocationFilter(e.target.value))}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={languageFilter}
            onChange={(e) => dispatch(setLanguageFilter(e.target.value))}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          <select
            value={skillsFilter}
            onChange={(e) => dispatch(setSkillsFilter(e.target.value))}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Skills</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) =>
              dispatch(setPriceFilter(parseFloat(e.target.value)))
            }
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value={0}>All Price Ranges</option>
            <option value={50}>Up to $50</option>
            <option value={100}>Up to $100</option>
            <option value={150}>Up to $150</option>
            <option value={200}>Up to $200</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortIcon className="text-gray-600" />
          <select className="p-2 border rounded">
            <option value="trending">Trending</option>
            <option value="rating">Highest Rating</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((freelancer, index) => (
            <ProfileCard key={freelancer.id || index} freelancer={freelancer} />
          ))
        ) : (
          <div className="text-center col-span-full">
            No freelancers found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseTalentByCategory;
