import { useState, useEffect, useCallback } from 'react';

export function useTickets(user) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('none');

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_API_URL}/tickets?sort=${sortBy}`;
            const response = await fetch(url);
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    }, [sortBy]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const updateTicket = async (id, updates) => {
        try {
            const payload = { ...updates, signature: user?.username || 'Unknown' };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t));
                return true;
            } else {
                alert('Failed to update ticket');
                return false;
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Error updating ticket');
            return false;
        }
    };

    return {
        tickets,
        loading,
        sortBy,
        setSortBy,
        fetchTickets,
        updateTicket
    };
}
