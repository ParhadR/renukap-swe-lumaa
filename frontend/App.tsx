import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private route (TaskList) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <TaskList /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
