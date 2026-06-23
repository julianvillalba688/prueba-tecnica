import React, { useState } from 'react';
import { useLoanStore } from '../store/useLoanStore';

const Login = () => {
    const login = useLoanStore((state) => state.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login(email, password)) {
            setError('Credenciales inválidas. Usa admin@test.com o usuario@test.com con clave 123');
        }
    };

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111111', margin: '0 0 4px 0' }}>Iniciar Sesión</h2>
                    <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>Sistema de gestión de préstamos</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', color: '#d32f2f', padding: '10px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666666', marginBottom: '6px' }}>Email</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #e5e5e5', borderRadius: '4px', outline: 'none', transition: 'border-color 0.2s' }}
                            placeholder="nombre@empresa.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            onFocus={(e) => e.target.style.borderColor = '#111111'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666666', marginBottom: '6px' }}>Contraseña</label>
                        <input 
                            type="password" 
                            style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #e5e5e5', borderRadius: '4px', outline: 'none', transition: 'border-color 0.2s' }}
                            placeholder="••••••••"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            onFocus={(e) => e.target.style.borderColor = '#111111'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ marginTop: '8px', width: '100%', padding: '10px', backgroundColor: '#111111', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'opacity 0.2s' }}
                        onMouseOver={(e) => e.target.style.opacity = '0.85'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
