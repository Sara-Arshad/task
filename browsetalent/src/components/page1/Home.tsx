import React from "react";
import Navbar from "../../shared/Navbar";
import HeroSection from "./HeroSection";
import BrwoseServiceByCategory from "./BrwoseServiceByCategory";
import TrendingServices from "./TrendingServices";
import ErrorBoundary from "../../shared/ErrorBoundary";

const Home = () => {
  return (
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
        {/* Wrap components in ErrorBoundary */}
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        <div className="p-10">
          <ErrorBoundary>
            <BrwoseServiceByCategory />
          </ErrorBoundary>
        </div>
        <div className="p-10 bg-[#F1FCFA]">
          <ErrorBoundary>
            <TrendingServices />
          </ErrorBoundary>
        </div>
        {/* Uncomment when AddFreelancerForm is ready */}
        {/* <div className="mt-28 p-10 m-10">
          <ErrorBoundary>
            <AddFreelancerForm />
          </ErrorBoundary>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
