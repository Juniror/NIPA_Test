import { useState } from 'react';
import '../css/DashboardLayout.css';
import '../css/KanbanBoard.css';
import TicketModal from '../components/TicketModal';
import HistoryModal from '../components/HistoryModal';
import KanbanColumn from '../components/KanbanColumn';
import TicketHeader from '../components/TicketHeader';
import { useTickets } from '../hooks/useTickets';

function TicketPage({ user }) {
    const { tickets, loading, sortBy, setSortBy, fetchTickets, updateTicket } = useTickets(user);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    const columns = ['pending', 'accepted', 'resolved', 'rejected'];

    const getColumnTickets = (status) => {
        return tickets.filter(t => t.status === status);
    };

    const handleManualRefresh = () => {
        fetchTickets();
    };

    const handleUpdateTicket = async (id, updates) => {
        const success = await updateTicket(id, updates);
        if (success && selectedTicket && selectedTicket.id === id) {
            setSelectedTicket(prev => ({ ...prev, ...updates }));
        }
    };

    return (
        <div className="dashboard-container">
            <TicketHeader
                user={user}
                onShowHistory={() => setShowHistory(true)}
                onRefresh={handleManualRefresh}
                loading={loading}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

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

export default TicketPage;
