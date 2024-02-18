import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authorization/AuthContext'
const LogoutButton = () => {
    
    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook to get navigate function

    const handleLogout = () => {
        // Add your logout logic here (e.g., clearing authentication tokens)
        logout();
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            <button className="btn btn-primary btn-sm me-2" type="button" onClick={handleLogout}>Log Out</button>
        </>
    );
};

export default LogoutButton;
