import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function AdminShortcutListener() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret key combination: Ctrl + Shift + A or Alt + Shift + A
      if ((e.ctrlKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  return null;
}

import { PortfolioProvider } from './context/PortfolioContext';
import { AdminProvider } from './context/AdminContext';

import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Resume from './pages/Resume';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

// Main Home Page Component
function Home() {
  return (
    <div className="min-h-screen pt-20 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash loader once per session
    const hasLoaded = sessionStorage.getItem('portfolio_has_loaded');
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('portfolio_has_loaded', 'true');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PortfolioProvider>
      <AdminProvider>
        <BrowserRouter>
          <AdminShortcutListener />
          <Routes>
            {/* Main Single-Page Portfolio */}
            <Route path="/" element={<Home />} />

            {/* Dedicated Resume Page */}
            <Route path="/resume" element={<Resume />} />

            {/* Admin Management Dashboard & Authentication */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </PortfolioProvider>
  );
}