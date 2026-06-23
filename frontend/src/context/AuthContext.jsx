import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const SESSION_DURATION_MS = 5 * 60 * 1000; // 5 minutos

export const AuthProvider = ({ children }) => {
    const isSessionValid = () => {
        const expiry = localStorage.getItem('app_session_expiry');
        return expiry && Date.now() < parseInt(expiry, 10);
    };

    const [user, setUser] = useState(() => {
        if (!isSessionValid()) return null;
        const saved = localStorage.getItem('app_user');
        return saved ? JSON.parse(saved) : null;
    });
    
    const [role, setRole] = useState(() => {
        if (!isSessionValid()) return null;
        return localStorage.getItem('app_role') || null;
    });

    const login = (email, password) => {
        const token = btoa(`${email}:${password}`);
        const expiryTime = Date.now() + SESSION_DURATION_MS;

        if (email === 'admin@test.com' && password === '123') {
            setUser({ email, name: 'Admin Admin' });
            setRole('ADMIN');
            localStorage.setItem('app_token', token);
            localStorage.setItem('app_session_expiry', expiryTime);
            return true;
        } else if (email === 'usuario@test.com' && password === '123') {
            setUser({ email, name: 'Usuario' });
            setRole('USER');
            localStorage.setItem('app_token', token);
            localStorage.setItem('app_session_expiry', expiryTime);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('app_token');
        localStorage.removeItem('app_session_expiry');
    };

    // Efecto para verificar periódicamente si la sesión expiró
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            if (!isSessionValid()) {
                logout();
                alert('Tu sesión ha expirado por inactividad/tiempo.');
            }
        }, 10000); // Verificar cada 10 segundos

        return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('app_user', JSON.stringify(user));
            localStorage.setItem('app_role', role);
        } else {
            localStorage.removeItem('app_user');
            localStorage.removeItem('app_role');
        }
    }, [user, role]);

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
