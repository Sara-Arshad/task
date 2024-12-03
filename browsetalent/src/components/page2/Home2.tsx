import React from "react";
import Navbar from "../../shared/Navbar";
import HeroSection2 from "./HeroSection2";
import BrowseTalentByCategory from "./BrowseTalentByCategory";
import { useLocation } from "react-router-dom";

const Home2 = () => {
  const location = useLocation();
  const { query = "", category = "" } = location.state || {};
  return (
    <div className="h-screen overflow-x-hidden">
      {" "}
      <Navbar />
      <div className="mx-auto px-6 sm:px-12 lg:px-16 max-w-screen-xl">
        {" "}
        <HeroSection2 />
        <BrowseTalentByCategory query={query} category={category} />
      </div>
    </div>
  );
};

export default Home2;
