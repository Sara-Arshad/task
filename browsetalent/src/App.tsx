import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/page1/Home";
import Home2 from "./components/page2/Home2";
import ErrorBoundary from "./shared/ErrorBoundary";

const App: React.FC = () => {
  return (
    <Router>
      {/* Wrap the entire Routes component with ErrorBoundary */}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
