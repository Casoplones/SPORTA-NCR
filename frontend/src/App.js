import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TeamsPage from './pages/TeamsPage';
import MatchesPage from './pages/MatchesPage';
import TrainingsPage from './pages/TrainingsPage';
import CreateTeamPage from './pages/CreateTeamPage';
import CreateMatchPage from './pages/CreateMatchPage';
import CreateTrainingPage from './pages/CreateTrainingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/trainings" element={<TrainingsPage />} />
      <Route path="/create-team" element={<CreateTeamPage />} />
      <Route path="/create-match" element={<CreateMatchPage />} />
      <Route path="/create-training" element={<CreateTrainingPage />} />
    </Routes>
  );
}

export default App;