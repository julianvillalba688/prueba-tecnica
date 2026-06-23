import { create } from 'zustand';

export const useLoanStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('app_user')) || null,
  loans: [],
  setLoans: (loans) => set({ loans }),
  login: (email, password) => {
    const token = btoa(`${email}:${password}`);
    if (email === 'admin@test.com' && password === '123') {
        const userData = { email, name: 'Admin Admin', role: 'ADMIN' };
        localStorage.setItem('app_user', JSON.stringify(userData));
        localStorage.setItem('app_token', token);
        set({ user: userData });
        return true;
    } else if (email === 'usuario@test.com' && password === '123') {
        const userData = { email, name: 'Usuario', role: 'USER' };
        localStorage.setItem('app_user', JSON.stringify(userData));
        localStorage.setItem('app_token', token);
        set({ user: userData });
        return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem('app_user');
    localStorage.removeItem('app_token');
    set({ user: null, loans: [] });
  }
}));
