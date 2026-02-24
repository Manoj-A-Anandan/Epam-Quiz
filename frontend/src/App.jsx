import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HostDashboard from './pages/HostDashboard';
import TeamDashboard from './pages/TeamDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="/team/:teamId" element={<TeamDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
