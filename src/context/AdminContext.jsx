import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Authenticated fetch helper
  const authFetch = useCallback(async (endpoint, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    if (res.status === 401) {
      logout();
      throw new Error('Session expired or unauthorized');
    }

    return res;
  }, [token]);

  // Load entire admin data
  const fetchAdminData = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await authFetch('/api/admin/all');
      const data = await res.json();
      if (data.success) {
        setAdminData(data.data);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, authFetch]);

  // Login action with password
  const login = useCallback(async (password, username = 'admin') => {
    try {
      setAuthError(null);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, username })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Incorrect password');
      }

      localStorage.setItem('portfolio_admin_token', data.token);
      setToken(data.token);
      setAdminUser(data.user);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Check token validity on mount or when token changes
  useEffect(() => {
    if (!token) {
      setAdminUser(null);
      setAdminData(null);
      return;
    }

    let isMounted = true;
    (async () => {
      try {
        const res = await authFetch('/api/auth/me');
        const json = await res.json();
        if (isMounted && json.authenticated) {
          setAdminUser(json.user);
          fetchAdminData();
        }
      } catch (e) {
        if (isMounted) {
          logout();
        }
      }
    })();

    return () => { isMounted = false; };
  }, [token, authFetch, fetchAdminData]);

  // Logout action
  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken('');
    setAdminUser(null);
    setAdminData(null);
    setStats(null);
  };

  // Change username or password
  const changeCredentials = async ({ currentPassword, newUsername, newPassword }) => {
    try {
      const res = await authFetch('/api/auth/change-credentials', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newUsername, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update credentials');
      }
      if (data.token) {
        localStorage.setItem('portfolio_admin_token', data.token);
        setToken(data.token);
      }
      if (data.user) {
        setAdminUser(data.user);
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Upload file (images/documents)
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await authFetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      return { success: true, url: data.url };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // CRUD Operations
  const updateProfile = async (profileData) => {
    const res = await authFetch('/api/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateSocials = async (socialsList) => {
    const res = await authFetch('/api/admin/socials', {
      method: 'PUT',
      body: JSON.stringify(socialsList)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const createProject = async (project) => {
    const res = await authFetch('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateProject = async (id, project) => {
    const res = await authFetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteProject = async (id) => {
    const res = await authFetch(`/api/admin/projects/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const createService = async (service) => {
    const res = await authFetch('/api/admin/services', {
      method: 'POST',
      body: JSON.stringify(service)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateService = async (id, service) => {
    const res = await authFetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteService = async (id) => {
    const res = await authFetch(`/api/admin/services/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const createSkill = async (skill) => {
    const res = await authFetch('/api/admin/skills', {
      method: 'POST',
      body: JSON.stringify(skill)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateSkill = async (id, skill) => {
    const res = await authFetch(`/api/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteSkill = async (id) => {
    const res = await authFetch(`/api/admin/skills/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const createExperience = async (exp) => {
    const res = await authFetch('/api/admin/experience', {
      method: 'POST',
      body: JSON.stringify(exp)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateExperience = async (id, exp) => {
    const res = await authFetch(`/api/admin/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(exp)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteExperience = async (id) => {
    const res = await authFetch(`/api/admin/experience/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const createEducation = async (edu) => {
    const res = await authFetch('/api/admin/education', {
      method: 'POST',
      body: JSON.stringify(edu)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateEducation = async (id, edu) => {
    const res = await authFetch(`/api/admin/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(edu)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteEducation = async (id) => {
    const res = await authFetch(`/api/admin/education/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateCaseStudy = async (data) => {
    const res = await authFetch('/api/admin/case-study', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const markMessageRead = async (id, read) => {
    const res = await authFetch(`/api/admin/messages/${id}/read`, {
      method: 'PUT',
      body: JSON.stringify({ read })
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const deleteMessage = async (id) => {
    const res = await authFetch(`/api/admin/messages/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  const updateSettings = async (settings) => {
    const res = await authFetch('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
    const json = await res.json();
    if (json.success) fetchAdminData();
    return json;
  };

  return (
    <AdminContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token && adminUser),
        adminUser,
        adminData,
        stats,
        isLoading,
        authError,
        login,
        logout,
        changeCredentials,
        fetchAdminData,
        uploadFile,
        updateProfile,
        updateSocials,
        createProject,
        updateProject,
        deleteProject,
        createService,
        updateService,
        deleteService,
        createSkill,
        updateSkill,
        deleteSkill,
        createExperience,
        updateExperience,
        deleteExperience,
        createEducation,
        updateEducation,
        deleteEducation,
        updateCaseStudy,
        markMessageRead,
        deleteMessage,
        updateSettings
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
