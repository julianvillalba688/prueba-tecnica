const API_URL = 'http://localhost:8085/api/loans';

const getAuthHeaders = () => {
    const token = localStorage.getItem('app_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
    };
};

export const api = {
    requestLoan: async (amount, termMonths = 12) => {
        const response = await fetch(`${API_URL}/request`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ amount, termMonths })
        });
        if (!response.ok) throw new Error('Error al solicitar préstamo');
        return response.json();
    },
    
    getMyLoans: async () => {
        const response = await fetch(`${API_URL}/my-loans`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener mis préstamos');
        return response.json();
    },
    
    getAllLoans: async () => {
        const response = await fetch(`${API_URL}/all`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener todos los préstamos');
        return response.json();
    },
    
    updateStatus: async (id, action) => {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action })
        });
        if (!response.ok) throw new Error('Error al actualizar estado');
        return response.json();
    }
};
