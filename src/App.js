// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import { LangThemeProvider } from "./landing/LangThemeProvider";
import BookingDemoPage from "./demo/BookingDemoPage";
import QuoteDemoPage from "./quote/QuoteDemoPage";
import { QuoteProvider } from "./quote/QuoteContext";

function App() {
  return (
    <Router>
      <LangThemeProvider>
        {/* 👇 Now the whole app can use useQuoteDemo */}
        <QuoteProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingDemoPage />} />
            <Route path="/quotes" element={<QuoteDemoPage />} />
          </Routes>
        </QuoteProvider>
      </LangThemeProvider>
    </Router>
  );
}

export default App;
