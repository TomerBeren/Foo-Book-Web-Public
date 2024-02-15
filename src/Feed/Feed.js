import React from 'react';
import Navbar from './NavBar/NavBar';
import FloatingActionButton from './FloatingActionButton';
import MainContent from './MainContent';
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
            <FloatingActionButton onClick={toggleTheme}/>
        </div>
    );
};

export default Feed;
