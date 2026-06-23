import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const AppContent = () => {
    const { user, role } = useContext(AuthContext);

    if (!user) {
        return <Login />;
    }

    if (role === 'ADMIN') {
        return <AdminDashboard />;
    }

    if (role === 'USER') {
        return <UserDashboard />;
    }

    return <Login />;
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
