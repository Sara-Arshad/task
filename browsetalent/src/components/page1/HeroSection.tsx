import React from "react";
// import { useAddSingleCategory } from "../../libs/hooks/category";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
// } from "@mui/material";

import SearchContainer from "./SearchContainer";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center sm:mt-0 md:mt-0 lg:mt-24 lg:items-start lg:justify-start lg:px-20 text-center lg:text-left py-20 px-6 text-white">
      <div className="lg:w-1/2">
        <h1 className="text-3xl sm:text-xl md:text-2xl  font-bold lg:mb-4">
          Hire the best freelancers for any job, online.
        </h1>
        <p className="text-base sm:text-sm md:text-md lg:mb-4 md:mb-6 ">
          Millions of people use freeio.com to turn their ideas into reality.
        </p>

        <SearchContainer />
      </div>
    </section>
  );
};

export default HeroSection;
