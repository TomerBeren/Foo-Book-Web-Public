import React from 'react';
import Navbar from './NavBar/NavBar';
import LogoutButton from './LogoutButton';
import FloatingActionButton from './FloatingActionButton';
import MainContent from './MainContent/MainContent';
import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
const Feed = () => {
    const [theme, setTheme] = useState('light');
    const { setUserDetails } = useUser();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            // Function to fetch user details
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }

                    const userDetailsJson = await response.json();
                    console.log("Fetched User Details:", userDetailsJson);

                    setUserDetails({
                        displayName: userDetailsJson.displayname,
                        profilePic: userDetailsJson.profilepic,
                        friendsList: userDetailsJson.friendsList,
                    });

                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserDetails();
        }
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`position relative ${theme === 'dark' ? 'bg-black' : 'bg-gray'}`}>
            <Navbar theme={theme} />
            <MainContent theme={theme} />
            <div className="fixed-bottom p-3" style={{ zIndex: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <LogoutButton />
                <FloatingActionButton onClick={toggleTheme} />
            </div>
        </div>
    );
};

export default Feed;
