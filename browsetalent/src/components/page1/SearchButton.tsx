import React from "react";

interface SearchButtonProps {
  handleSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ handleSearch }) => {
  return (
    <button
      onClick={handleSearch}
      className="mt-4 lg:mt-0 w-3/4 lg:w-auto py-2 px-6 bg-green-500 text-white rounded-md hover:border hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500"
    >
      Search
    </button>
  );
};

export default SearchButton;
