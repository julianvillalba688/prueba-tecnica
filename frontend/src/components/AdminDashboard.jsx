import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../api';

const StatusIndicator = ({ status }) => {
    let color = '#f5a623';
    if (status === 'APROBADO') color = '#10b981';
    if (status === 'RECHAZADO') color = '#ef4444';

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', color: '#666666', textTransform: 'capitalize' }}>{status.toLowerCase()}</span>
        </div>
    );
};

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [loans, setLoans] = useState([]);

    const loadLoans = async () => {
        try {
            const data = await api.getAllLoans();
            setLoans(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadLoans();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await api.updateStatus(id, action);
            loadLoans();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#111111' }}>
            <div style={{ borderBottom: '1px solid #e5e5e5', backgroundColor: '#ffffff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0' }}>Consola de Administración</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#666666' }}>{user?.email}</span>
                    <button 
                        style={{ background: 'transparent', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', fontWeight: '500', color: '#111111', cursor: 'pointer', transition: 'background-color 0.2s' }}
                        onClick={logout}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#fafafa'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Salir
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
                <div style={{ border: '1px solid #e5e5e5', backgroundColor: '#ffffff', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e5e5', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Usuario</span>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monto</span>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</span>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Acción</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {loans.length === 0 ? (
                            <div style={{ padding: '32px 24px', color: '#666666', fontSize: '14px', textAlign: 'center' }}>No hay solicitudes pendientes en el sistema.</div>
                        ) : (
                            loans.map((loan, idx) => (
                                <div key={loan.id} style={{ padding: '12px 24px', borderBottom: idx === loans.length - 1 ? 'none' : '1px solid #eeeeee', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '16px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '13px', color: '#111111' }}>{loan.userEmail}</span>
                                    <span style={{ fontSize: '13px', fontWeight: '500' }}>${parseFloat(loan.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                    <StatusIndicator status={loan.status} />
                                    
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        {loan.status === 'PENDIENTE' ? (
                                            <>
                                                <button 
                                                    style={{ background: 'transparent', border: '1px solid #111111', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', fontWeight: '500', color: '#111111', cursor: 'pointer', transition: 'all 0.2s' }}
                                                    onClick={() => handleAction(loan.id, 'APROBAR')}
                                                    onMouseOver={(e) => { e.target.style.backgroundColor = '#111111'; e.target.style.color = '#ffffff'; }}
                                                    onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#111111'; }}
                                                >
                                                    Aprobar
                                                </button>
                                                <button 
                                                    style={{ background: 'transparent', border: '1px solid transparent', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', fontWeight: '500', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s' }}
                                                    onClick={() => handleAction(loan.id, 'RECHAZAR')}
                                                    onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    Rechazar
                                                </button>
                                            </>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#a3a3a3', fontStyle: 'italic' }}>Resuelto</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
