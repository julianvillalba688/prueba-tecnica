import React from 'react';
import { useLoanStore } from './store/useLoanStore';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    const user = useLoanStore((state) => state.user);

    if (!user) {
        return <Login />;
    }

    if (user.role === 'ADMIN') {
        return <AdminDashboard />;
    }

    if (user.role === 'USER') {
        return <UserDashboard />;
    }

    return <Login />;
};

export default App;
