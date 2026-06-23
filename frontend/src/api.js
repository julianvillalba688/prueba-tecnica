const API_URL = 'http://localhost:8085/api/loans';

// --- MOCK DATABASE FALLBACK ---
const getMockDb = () => {
    const db = localStorage.getItem('mock_db');
    if (db) return JSON.parse(db);
    const initialDb = [
        { id: '1a2b3c4d', userEmail: 'usuario@test.com', amount: 5000, termMonths: 12, status: 'PENDIENTE' },
        { id: '5e6f7g8h', userEmail: 'usuario@test.com', amount: 12500, termMonths: 24, status: 'APROBADO' },
        { id: '9i0j1k2l', userEmail: 'usuario@test.com', amount: 300, termMonths: 6, status: 'RECHAZADO' },
        { id: '3m4n5o6p', userEmail: 'otro@cliente.com', amount: 8000, termMonths: 12, status: 'PENDIENTE' }
    ];
    localStorage.setItem('mock_db', JSON.stringify(initialDb));
    return initialDb;
};

const saveMockDb = (db) => localStorage.setItem('mock_db', JSON.stringify(db));

// Helper para simular latencia de red
const delay = (ms) => new Promise(res => setTimeout(res, ms));
// ------------------------------

const getAuthHeaders = () => {
    const token = localStorage.getItem('app_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
    };
};

const getEmailFromToken = () => {
    try {
        const token = localStorage.getItem('app_token');
        if (!token) return 'usuario@test.com';
        return atob(token).split(':')[0];
    } catch {
        return 'usuario@test.com';
    }
}

export const api = {
    requestLoan: async (amount, termMonths = 12) => {
        try {
            const response = await fetch(`${API_URL}/request`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ amount, termMonths })
            });
            if (!response.ok) throw new Error('Error backend');
            return await response.json();
        } catch (e) {
            console.warn("Usando Mock DB: Backend desconectado");
            await delay(400);
            const db = getMockDb();
            const newLoan = {
                id: Math.random().toString(36).substring(2, 10),
                userEmail: getEmailFromToken(),
                amount: parseFloat(amount),
                termMonths,
                status: 'PENDIENTE'
            };
            db.unshift(newLoan); // Agrega al inicio
            saveMockDb(db);
            return newLoan;
        }
    },
    
    getMyLoans: async () => {
        try {
            const response = await fetch(`${API_URL}/my-loans`, {
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error('Error backend');
            return await response.json();
        } catch (e) {
            console.warn("Usando Mock DB: Backend desconectado");
            await delay(400);
            const email = getEmailFromToken();
            return getMockDb().filter(l => l.userEmail === email);
        }
    },
    
    getAllLoans: async () => {
        try {
            const response = await fetch(`${API_URL}/all`, {
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error('Error backend');
            return await response.json();
        } catch (e) {
            console.warn("Usando Mock DB: Backend desconectado");
            await delay(400);
            return getMockDb();
        }
    },
    
    updateStatus: async (id, action) => {
        try {
            const response = await fetch(`${API_URL}/${id}/status`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ action })
            });
            if (!response.ok) throw new Error('Error backend');
            return await response.json();
        } catch (e) {
            console.warn("Usando Mock DB: Backend desconectado");
            await delay(400);
            const db = getMockDb();
            const loanIndex = db.findIndex(l => l.id === id);
            if (loanIndex !== -1) {
                db[loanIndex].status = action === 'APROBAR' ? 'APROBADO' : 'RECHAZAR' ? 'RECHAZADO' : db[loanIndex].status;
                saveMockDb(db);
            }
            return db[loanIndex];
        }
    }
};
