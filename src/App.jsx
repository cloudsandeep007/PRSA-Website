import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PublicSite from './website/PublicSite';
import Login from './admin/pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import TrialBookingsManager from './admin/pages/TrialBookingsManager';
import ContactEnquiriesManager from './admin/pages/ContactEnquiriesManager';
import ContentManager from './admin/pages/ContentManager';
import MediaLibrary from './admin/pages/MediaLibrary';
import SEOManager from './admin/pages/SEOManager';
import SettingsManager from './admin/pages/SettingsManager';

export default function App() {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('prsa_admin_token') || '');

  const handleLogout = () => {
    localStorage.removeItem('prsa_admin_token');
    localStorage.removeItem('prsa_admin_user');
    setAuthToken('');
  };

  return (
    <Routes>
      {/* Public Facing Website */}
      <Route path="/" element={<PublicSite />} />

      {/* Admin Login */}
      <Route
        path="/admin/login"
        element={
          authToken ? <Navigate to="/admin/dashboard" replace /> : <Login setAuthToken={setAuthToken} />
        }
      />

      {/* Protected Admin SaaS Portal */}
      <Route
        path="/admin/*"
        element={
          !authToken ? (
            <Navigate to="/admin/login" replace />
          ) : (
            <AdminLayout authToken={authToken} onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<Dashboard authToken={authToken} />} />
                <Route path="trial-bookings" element={<TrialBookingsManager authToken={authToken} />} />
                <Route path="contact-enquiries" element={<ContactEnquiriesManager authToken={authToken} />} />
                <Route path="content" element={<ContentManager authToken={authToken} />} />
                <Route path="media" element={<MediaLibrary authToken={authToken} />} />
                <Route path="seo" element={<SEOManager authToken={authToken} />} />
                <Route path="settings" element={<SettingsManager authToken={authToken} />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          )
        }
      />

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
