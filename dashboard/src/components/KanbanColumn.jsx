import KanbanCard from './KanbanCard';
import '../css/KanbanBoard.css';

function KanbanColumn({ status, tickets, onTicketClick, sortBy }) {
    return (
        <div className={`kanban-column column-${status}`}>
            <div className="column-header">
                <h2>{status}</h2>
                <span className="count-badge">{tickets.length}</span>
            </div>
            <div className="card-list">
                {tickets.length === 0 ? (
                    <div className="empty-column-state">
                        <p>No tickets</p>
                    </div>
                ) : (
                    tickets.map(ticket => (
                        <KanbanCard
                            key={ticket.id}
                            ticket={ticket}
                            onClick={onTicketClick}
                            sortBy={sortBy}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default KanbanColumn;
