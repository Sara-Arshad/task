// import React, { useState, useEffect, Key } from "react";
// import axiosInstance from "../../libs/axiosInstance";
// import { useAddSingleFreelancer } from "../../libs/hooks/freelancer";

// interface Category {
//   name: string;
//   image: string;
//   price: string;
//   service: string;
// }

// const AddFreelancerForm = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     profilePicture: null,
//     rating: "",
//     reviews: "",
//     skills: "",
//     location: "",
//     language: "",
//     hourlyRate: "",
//     jobSuccess: "",
//     trending: false,
//     category: "",
//     service: "",
//   });

//   const fetchAllCategories = async (): Promise<Category[]> => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get("/categories/all");
//       setCategories(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setIsError(true);
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchAllCategories();
//   }, []);
//   const { mutate: addFreeLancer, isPending } = useAddSingleFreelancer({
//     onSuccess: () => {
//       alert("Freelancer added successfully!");
//       resetForm();
//     },
//     onError: (error) => {
//       alert(
//         `Error adding freelancer: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//     },
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]:
//         type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     }));
//   };

//   const resetForm = () => {
//     setFormValues({
//       name: "",
//       profilePicture: null,
//       rating: "",
//       reviews: "",
//       skills: "",
//       location: "",
//       language: "",
//       hourlyRate: "",
//       jobSuccess: "",
//       trending: false,
//       category: "",
//       service: "",
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check for required fields
//     const requiredFields = [
//       "name",
//       "rating",
//       "reviews",
//       "skills",
//       "location",
//       "language",
//       "hourlyRate",
//       "jobSuccess",
//       "category",
//     ];
//     const missingFields = requiredFields.filter((field) => !formValues[field]);

//     if (missingFields.length) {
//       alert(`Missing fields: ${missingFields.join(", ")}`);
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(formValues).forEach((key) => {
//       formData.append(key, formValues[key]);
//     });

//     addFreeLancer(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

//       <input
//         type="text"
//         name="name"
//         value={formValues.name}
//         onChange={handleInputChange}
//         placeholder="Freelancer Name"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="profilePicture"
//         onChange={handleInputChange}
//         className="p-2 border rounded"
//         accept="image/*"
//       />

//       <input
//         type="number"
//         name="rating"
//         value={formValues.rating}
//         onChange={handleInputChange}
//         placeholder="Rating (0-5)"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="number"
//         name="reviews"
//         value={formValues.reviews}
//         onChange={handleInputChange}
//         placeholder="Number of Reviews"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="skills"
//         value={formValues.skills}
//         onChange={handleInputChange}
//         placeholder="Skills (comma-separated)"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="location"
//         value={formValues.location}
//         onChange={handleInputChange}
//         placeholder="Location"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="language"
//         value={formValues.language}
//         onChange={handleInputChange}
//         placeholder="Language"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="number"
//         name="hourlyRate"
//         value={formValues.hourlyRate}
//         onChange={handleInputChange}
//         placeholder="Hourly Rate"
//         className="p-2 border rounded"
//         required
//       />

//       <input
//         type="number"
//         name="jobSuccess"
//         value={formValues.jobSuccess}
//         onChange={handleInputChange}
//         placeholder="Job Success Percentage"
//         className="p-2 border rounded"
//         required
//       />

//       <label className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           name="trending"
//           checked={formValues.trending}
//           onChange={handleInputChange}
//         />
//         <span>Trending</span>
//       </label>

//       <select
//         name="category"
//         value={formValues.category}
//         onChange={handleInputChange}
//         className="p-2 border rounded"
//         required
//       >
//         <option value="">Select a Category</option>
//         {categories.map((category, index) => (
//           <option key={index} value={category.name}>
//             {category.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         name="service"
//         value={formValues.service}
//         onChange={handleInputChange}
//         placeholder="Service Offered"
//         className="p-2 border rounded"
//         required
//       />

//       <button
//         type="submit"
//         className={`p-2 rounded ${
//           isPending ? "bg-gray-400" : "bg-blue-500 text-white"
//         }`}
//         disabled={isPending}
//       >
//         {isPending ? "Adding..." : "Add Freelancer"}
//       </button>
//     </form>
//   );
// };

// export default AddFreelancerForm;
