import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import Header from './Header';
import LogoText from './Login/LogoText';
import Feed from './Feed/Feed';
import { AuthProvider } from './Authorization/AuthContext';
import ProtectedRoute from './Authorization/ProtectedRoute';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider> {/* Move UserProvider here to wrap all routes */}
          <Routes>
            <Route path="/login" element={
              <Header>
                <LogoText />
                <LoginForm />
              </Header>
            } />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
