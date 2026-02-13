import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProblemList from './pages/ProblemList';
import Editor from './pages/Editor';
import AIReport from './pages/AIReport';
import LandingPage from './pages/LandingPage';
import CodeAnalyzer from './pages/CodeAnalyzer';
import CPJourney from './pages/CPJourney';


// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<div className="min-h-screen bg-dark text-white"><Navbar /><Login /></div>} />
      <Route path="/register" element={<div className="min-h-screen bg-dark text-white"><Navbar /><Register /></div>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <Dashboard />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <ProblemList />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor/:id"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <Editor />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-report/:id"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <AIReport />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analyzer"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <CodeAnalyzer />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/journey"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-dark text-white">
              <Navbar />
              <CPJourney />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
