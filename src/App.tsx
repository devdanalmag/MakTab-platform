import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import RoleSelection from './pages/RoleSelection';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Quran from './pages/Quran';
import Classes from './pages/Classes';
import Profile from './pages/Profile';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
