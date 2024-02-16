import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Authorization/AuthContext'
const LogoutButton = () => {
    
    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook to get navigate function

    const handleLogout = () => {
        // Add your logout logic here (e.g., clearing authentication tokens)
        logout();
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="mt-1 p-1">
            <button className="btn btn-primary btn-sm"
            type="button" onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default LogoutButton;
