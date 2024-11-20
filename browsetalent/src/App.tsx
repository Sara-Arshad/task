import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/page1/Home";
import Home2 from "./components/page2/Home2";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the HeroSection */}
        <Route path="/" element={<Home />} />
        {/* Route for the Home2 component */}
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </Router>
  );
};

export default App;
