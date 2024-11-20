import React, { useState, useEffect } from "react";
import axiosInstance from "../../libs/axiosInstance";
// import { useAddSingleCategory } from "../../libs/hooks/category";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
// } from "@mui/material";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  image: string;
  price: string;
  service: string;
}

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

const HeroSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(
    []
  );
  const { data: freelancers = [], isLoading, error } = useGetAllFreelancers();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   image: "",
  //   price: "",
  //   service: "",
  // });
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get("/categories/all");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredFreelancers(
        freelancers.filter(
          (freelancer) =>
            freelancer.name.toLowerCase().includes(lowerCaseQuery) ||
            freelancer.skills.some((skill) =>
              skill.toLowerCase().includes(lowerCaseQuery)
            ) ||
            freelancer.location.toLowerCase().includes(lowerCaseQuery)
        )
      );
    } else {
      setFilteredFreelancers([]);
    }
  }, [query, freelancers]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const { mutate: addCategory } =
  //   useAddSingleCategory({
  //     onSuccess: () => {
  //       alert("Category added successfully!");
  //       setFormValues({ name: "", image: "", price: "", service: "" });
  //       setIsModalOpen(false);
  //     },
  //     onError: (err) => {
  //       alert(`Error adding category: ${err.message}`);
  //     },
  //   });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { name, image, price, service } = formValues;

  //   if (!name || !image || !price || !service) {
  //     alert("All fields are required");
  //     return;
  //   }

  //   addCategory({ name, image, price, service });
  // };

  const handleSearch = () => {
    if (!query || !selectedCategory) {
      alert("Please enter a search query and select a category.");
      return;
    }

    navigate("/home2", {
      state: {
        query,
        category: selectedCategory,
      },
    });
  };

  if (isLoading) return <p>Loading freelancers...</p>;
  if (error) return <p>Error loading freelancers: {error.message}</p>;

  return (
    <section className="flex flex-col lg:flex-row items-center sm:mt-0 md:mt-0 lg:mt-24 lg:items-start lg:justify-start lg:px-20 text-center lg:text-left py-20 px-6 text-white">
      <div className="lg:w-1/2">
        <h1 className="text-3xl sm:text-xl md:text-2xl  font-bold lg:mb-4">
          Hire the best freelancers for any job, online.
        </h1>
        <p className="text-base sm:text-sm md:text-md lg:mb-4 md:mb-6 ">
          Millions of people use freeio.com to turn their ideas into reality.
        </p>

        <div className="relative  flex flex-col lg:flex-row items-center lg:space-x-2 bg-white rounded-md  shadow-md px-4 py-2 max-w-2xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for freelancers..."
              className="w-full py-2 px-4 text-gray-800 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
            {filteredFreelancers.length > 0 && (
              <ul className="absolute left-0 top-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {filteredFreelancers.map((freelancer) => (
                  <li
                    key={freelancer.id}
                    onClick={() => {
                      setQuery(freelancer.name);
                      setFilteredFreelancers([]);
                    }}
                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer space-x-4"
                  >
                    <img
                      src={freelancer.profilePicture}
                      alt={freelancer.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="text-black font-medium">
                        {freelancer.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ${freelancer.hourlyRate}/hr • {freelancer.location}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-4 rounded-lg lg:mt-0 w-full lg:w-auto ">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-2  w-full lg:w-auto  text-gray-800 bg-gray-100 rounded-lg border-none outline-none focus:ring focus:ring-green-500"
            >
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="mt-4 lg:mt-0  w-3/4 lg:w-auto py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
