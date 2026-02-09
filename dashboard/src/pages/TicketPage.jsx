import { useState, useEffect } from 'react';
import { FaSync, FaHistory, FaUser } from 'react-icons/fa';
import '../css/DashboardLayout.css';
import '../css/KanbanBoard.css';
import TicketModal from '../components/TicketModal';
import HistoryModal from '../components/HistoryModal';
import KanbanColumn from '../components/KanbanColumn';



function TicketList({ user }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [sortBy, setSortBy] = useState('none');

    useEffect(() => {
        fetchTickets();
    }, [sortBy]);

    const fetchTickets = async () => {
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
            // Optional: You could add a toast here, but for "testing", logging is good
        }
    };

    const handleManualRefresh = () => {
        fetchTickets().then(() => {
            // alert('Dashboard Refreshed!'); // Uncomment if user wants popup
        });
    }

    const handleUpdateTicket = async (id, updates) => {
        try {

            const payload = { ...updates, signature: user?.username || 'Unknown' };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {

                setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t));
                if (selectedTicket && selectedTicket.id === id) {
                    setSelectedTicket(prev => ({ ...prev, ...updates }));
                }
            } else {
                alert('Failed to update ticket');
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Error updating ticket');
        }
    };

    const columns = ['pending', 'accepted', 'resolved', 'rejected'];

    const getColumnTickets = (status) => {
        return tickets.filter(t => t.status === status);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="user-welcome">
                    <FaUser className="user-icon-small" />
                    <span>{user?.username || 'Admin'}</span>
                </div>
                <h1>Admin Dashboard - Support Tickets</h1>
                <div className="cleanup-controls">
                    <button className="history-btn" onClick={() => setShowHistory(true)} title="View History">
                        <FaHistory /> History
                    </button>
                    <button className="refresh-btn" onClick={handleManualRefresh} title="Refresh Tickets">
                        <FaSync className={loading ? 'spin' : ''} /> Refresh
                    </button>
                    <label>Sort by: </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="none">None</option>
                        <option value="latest_update">Latest Update</option>
                        <option value="created_at">Created Date</option>
                    </select>
                </div>
            </header>

            {loading ? (
                <div className="loading">Loading Tickets...</div>
            ) : (
                <div className="kanban-board">
                    {columns.map(status => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            tickets={getColumnTickets(status)}
                            onTicketClick={setSelectedTicket}
                            sortBy={sortBy}
                        />
                    ))}
                </div>
            )}


            {showHistory && (
                <HistoryModal onClose={() => setShowHistory(false)} />
            )}


            {selectedTicket && (
                <TicketModal
                    ticket={selectedTicket}
                    user={user}
                    onClose={() => setSelectedTicket(null)}
                    onUpdateTicket={handleUpdateTicket}
                    columns={columns}
                />
            )}
        </div>
    );
}

export default TicketList;
