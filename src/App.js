// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import { LangThemeProvider } from "./landing/LangThemeProvider";
import BookingDemoPage from "./demo/BookingDemoPage";
import QuoteDemoPage from "./quote/QuoteDemoPage";
import SmartNumberDemoPage from "./smartNumber/SmartNumberDemoPage";
import { QuoteProvider } from "./quote/QuoteContext";

// ⬇️ NEW
import JobReportDemoPage from "./jobReport/JobReportDemoPage";

function App() {
  return (
    <Router>
      <LangThemeProvider>
        <QuoteProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingDemoPage />} />
            <Route path="/quotes" element={<QuoteDemoPage />} />
            {/* ⬇️ NEW route */}
            <Route path="/job-reports" element={<JobReportDemoPage />} />
            <Route path="/smart-number" element={<SmartNumberDemoPage />} />
          </Routes>
        </QuoteProvider>
      </LangThemeProvider>
    </Router>
  );
}

export default App;
