import React from "react";
import { Category } from "../../redux/slices/categoriesSlice";

interface CategorySelectProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  isCategoriesLoading: boolean;
  categoriesError: boolean;
  categories: Category[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setSelectedCategory,
  isCategoriesLoading,
  categoriesError,
  categories,
}) => {
  return (
    <div className="mt-4 rounded-lg lg:mt-0 w-full lg:w-auto">
      {isCategoriesLoading ? (
        <p className="text-gray-500">Loading ...</p>
      ) : categoriesError ? (
        <p className="text-red-500">
          Failed to load categories. Please try again.
        </p>
      ) : (
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="py-2 px-2 w-full lg:w-auto text-gray-800 bg-gray-100 rounded-lg border-none outline-none focus:ring focus:ring-green-500"
        >
          <option value="">Category</option>
          {categories.map((category, index) => (
            <option key={category.id || index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategorySelect;
