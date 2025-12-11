// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import { LangThemeProvider } from "./landing/LangThemeProvider";
import BookingDemoPage from "./demo/BookingDemoPage";

function App() {
  return (
    <Router>
      <LangThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<BookingDemoPage />} />
        </Routes>
      </LangThemeProvider>
    </Router>
  );
}

export default App;
