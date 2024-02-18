import React from 'react';
import Navbar from './NavBar/NavBar';
import LogoutButton from './LogoutButton';
import FloatingActionButton from './FloatingActionButton';
import MainContent from './MainContent/MainContent';
import { useState,  useEffect } from 'react';

const Feed = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
         <div className={`position relative ${theme === 'dark' ? 'bg-black' : 'bg-gray'}`}>
            <Navbar theme={theme} />
            <MainContent  theme={theme} />
            <div className="fixed-bottom p-3" style={{ zIndex: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <LogoutButton />
                <FloatingActionButton onClick={toggleTheme}/>
            </div>
        </div>
    );
};

export default Feed;
