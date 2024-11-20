import React from "react";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
// import AddFreelancerForm from "../page2/AddFreelancerForm";
import BrwoseServiceByCategory from "./BrwoseServiceByCategory";
import TrendingServices from "./TrendingServices";

const Home = () => {
  return (
    <>
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://demoapus1.com/freeio/wp-content/uploads/2022/10/slider1.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <div className="p-10 ">
            <BrwoseServiceByCategory />
          </div>
          <div className="p-10 bg-[#F1FCFA]">
            <TrendingServices />
          </div>
          {/* <div className="mt-28 p-10 m-10">
            <AddFreelancerForm />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
