import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to html root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch portfolio data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/data');
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
      setError(null);
    } catch (err) {
      console.warn("Using fallback/offline data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Submit contact message
  const submitMessage = async (formData) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit message');
      }
      return { success: true, message: result.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio: data,
        isLoading,
        error,
        theme,
        toggleTheme,
        refreshData: fetchData,
        submitMessage
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
