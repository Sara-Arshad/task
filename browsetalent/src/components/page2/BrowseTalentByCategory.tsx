import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCards";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import SortIcon from "@mui/icons-material/Sort"; // Importing MUI icon

interface Freelancer {
  id: string | number;
  name: string;
  profilePicture: string;
  rating: number;
  reviews: number;
  skills: string[];
  location: string;
  language: string;
  hourlyRate: string;
  jobSuccess: number;
  trending: boolean;
  category: string;
  service: string;
}

interface BrowseTalentByCategoryProps {
  query: string;
  category: string;
}

const BrowseTalentByCategory: React.FC<BrowseTalentByCategoryProps> = ({
  query,
  category,
}) => {
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(
    []
  );
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [skillsFilter, setSkillsFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<number>(0); // Filter by price range

  const { data: freelancers = [], isLoading, error } = useGetAllFreelancers();

  useEffect(() => {
    if (freelancers.length > 0) {
      const lowerCaseQuery = query.trim().toLowerCase();
      const filtered = freelancers.filter((freelancer) => {
        const matchesQuery =
          freelancer.name.toLowerCase().includes(lowerCaseQuery) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseQuery)
          ) ||
          freelancer.location.toLowerCase().includes(lowerCaseQuery);

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
    query,
    category,
    freelancers,
    locationFilter,
    languageFilter,
    skillsFilter,
    priceFilter,
  ]);

  if (isLoading) return <p>Loading freelancers...</p>;
  if (error) return <p>Error loading freelancers: {error.message}</p>;

  return (
    <section className="py-12 px-4">
      <div className="flex lg:flex-row flex-col md:flex-col justify-between items-start md:items-start mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Locations</option>
            <option value="USA">USA</option>
            <option value="London">London</option>
            <option value="Punjab">Punjab</option>
            <option value="Tronto">Tronto</option>
            <option value="Pakistan">Pakistan</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
          </select>

          <select
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="All">All Skills</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="php">PHP</option>
            <option value="angular">Angular</option>
            <option value="react">React</option>
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(parseFloat(e.target.value))}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((freelancer) => (
            <ProfileCard key={freelancer.id} freelancer={freelancer} />
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
