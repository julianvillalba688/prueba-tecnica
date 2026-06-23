import React, { useContext, useState, useEffect } from 'react';
import { useLoanStore } from '../store/useLoanStore';
import { api } from '../api';

const StatusIndicator = ({ status }) => {
    let color = '#f5a623'; // PENDIENTE
    if (status === 'APROBADO') color = '#10b981';
    if (status === 'RECHAZADO') color = '#ef4444';

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', color: '#666666', textTransform: 'capitalize' }}>{status.toLowerCase()}</span>
        </div>
    );
};

const UserDashboard = () => {
    const user = useLoanStore((state) => state.user);
    const logout = useLoanStore((state) => state.logout);
    const [amount, setAmount] = useState('');
    const [loans, setLoans] = useState([]);

    const loadLoans = async () => {
        try {
            const data = await api.getMyLoans();
            setLoans(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadLoans();
    }, []);

    const handleRequest = async (e) => {
        e.preventDefault();
        if (!amount) return;
        try {
            await api.requestLoan(parseFloat(amount));
            setAmount('');
            loadLoans();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#111111' }}>
            <div style={{ borderBottom: '1px solid #e5e5e5', backgroundColor: '#ffffff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0' }}>Panel de Usuario <span style={{ color: '#666666', fontWeight: '400', marginLeft: '8px' }}>/ {user?.email}</span></h3>
                <button 
                    style={{ background: 'transparent', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', fontWeight: '500', color: '#111111', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onClick={logout}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#fafafa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    Salir
                </button>
            </div>

            <div style={{ maxWidth: '1000px', margin: '40px auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '0', border: '1px solid #e5e5e5', backgroundColor: '#ffffff', borderRadius: '6px', overflow: 'hidden' }}>
                
                {/* Panel de Acción */}
                <div style={{ padding: '24px', borderRight: '1px solid #e5e5e5', backgroundColor: '#fafafa' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 20px 0' }}>Nueva Solicitud</h4>
                    <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666666', marginBottom: '6px' }}>Monto a solicitar (USD)</label>
                            <input 
                                type="number" 
                                style={{ width: '100%', padding: '8px 10px', fontSize: '14px', border: '1px solid #e5e5e5', borderRadius: '4px', outline: 'none', transition: 'border-color 0.2s' }}
                                placeholder="0.00"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                                min="100"
                                required 
                                onFocus={(e) => e.target.style.borderColor = '#111111'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                            />
                        </div>
                        <button 
                            type="submit" 
                            style={{ padding: '8px', backgroundColor: '#111111', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'opacity 0.2s' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.85'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            Enviar Solicitud
                        </button>
                    </form>
                </div>

                {/* Panel de Historial */}
                <div style={{ padding: '0' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e5e5' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>Historial de Préstamos</h4>
                    </div>
                    
                    {loans.length === 0 ? (
                        <div style={{ padding: '32px 24px', color: '#666666', fontSize: '14px' }}>No hay transacciones registradas.</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {loans.map((loan, idx) => (
                                <div key={loan.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: idx === loans.length - 1 ? 'none' : '1px solid #eeeeee' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '500' }}>${parseFloat(loan.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                        <span style={{ fontSize: '12px', color: '#666666', fontFamily: 'monospace' }}>ID: {loan.id.substring(0,8)}</span>
                                    </div>
                                    <StatusIndicator status={loan.status} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
