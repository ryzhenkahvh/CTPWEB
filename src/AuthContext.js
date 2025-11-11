import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const register = (userData) => {
        //сохраняем в локалсторе
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        login(userData);
    };

    return ( <
        AuthContext.Provider value = {
            { isAuthenticated, user, login, logout, register }
        } > { children } <
        /AuthContext.Provider>
    );
};