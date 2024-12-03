import React, { useState } from "react";
import FreelancerSearchInput from "./FreelancerSearchInput";
import CategorySelect from "./CategorySelect";
import SearchButton from "./SearchButton";
import { Freelancer } from "../../redux/slices/freelauncerSlice";
import { useGetAllFreelancers } from "../../libs/hooks/freelancer";
import { useGetAllCategories } from "../../libs/hooks/category";
import { useNavigate } from "react-router-dom";

const SearchContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>(
    []
  );
  const navigate = useNavigate();

  const {
    data: freelancers = [],
    isLoading: isFreelancersLoading,
    error: freelancersError,
  } = useGetAllFreelancers();

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetAllCategories(); // This hook will provide the category data

  const handleSearch = () => {
    if (!query || !selectedCategory) {
      alert("Please enter a search query and select a category.");
      return;
    }
    console.log("query", query, "selected category", selectedCategory);
    navigate("/home2", {
      state: {
        query,
        category: selectedCategory,
      },
    });
  };

  const freelancersErrorBoolean = !!freelancersError;
  const categoriesErrorBoolean = !!categoriesError;

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:space-x-2 bg-white rounded-md shadow-md px-4 py-2 max-w-2xl mx-auto">
      <FreelancerSearchInput
        query={query}
        setQuery={setQuery}
        filteredFreelancers={filteredFreelancers}
        setFilteredFreelancers={setFilteredFreelancers}
        isFreelancersLoading={isFreelancersLoading}
        freelancersError={freelancersErrorBoolean}
        freelancers={freelancers}
      />

      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isCategoriesLoading={isCategoriesLoading}
        categoriesError={categoriesErrorBoolean}
        categories={categories}
      />

      <SearchButton handleSearch={handleSearch} />
    </div>
  );
};

export default SearchContainer;
