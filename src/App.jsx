import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/projectsData';
import Contact from './components/Contact';
import Resume from './pages/Resume'; // Adjust path if saved under ./components/Resume

// Main Home Page Component
function Home() {
  return (
    <div className="min-h-screen pt-24">
      <Header />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Single-Page Portfolio */}
        <Route path="/" element={<Home />} />

        {/* Dedicated Resume Page */}
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}