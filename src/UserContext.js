// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        profilePic: '',
        friendsList: [],
    });

    const value = {
        userDetails,
        setUserDetails,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;