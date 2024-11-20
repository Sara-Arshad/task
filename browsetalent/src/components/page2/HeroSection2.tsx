import React from "react";

const HeroSection2: React.FC = () => {
  return (
    <section
      className="relative flex flex-col mt-10 items-start justify-center py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-dark bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://demoapus1.com/freeio/wp-content/uploads/2022/09/bg-filter1.jpg')",
      }}
    >
      <div className="relative z-10 flex flex-col space-y-4 w-full max-w-3xl text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Freelancers List.
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mb-8">
          Millions of people use freeio.com to turn their ideas into reality.
        </p>
      </div>
    </section>
  );
};

export default HeroSection2;
