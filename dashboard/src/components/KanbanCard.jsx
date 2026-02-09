import { FaPen, FaUser, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import '../css/KanbanCard.css';
import { formatDate } from '../utils/dateUtils';

function KanbanCard({ ticket, onClick, sortBy }) {
    const isUpdatedSort = sortBy === 'latest_update';
    const displayDate = isUpdatedSort ? ticket.updated_at : ticket.created_at;
    const dateLabel = isUpdatedSort ? 'Updated' : 'Created';

    return (
        <div className="kanban-card" onClick={() => onClick(ticket)}>
            <div className="card-top">
                <h3>{ticket.subject}</h3>
                <FaPen className="edit-icon" />
            </div>
            <div className="card-details">
                <p><FaUser className="icon" /> {ticket.name}</p>
                <p><FaPhone className="icon" /> {ticket.phone || '-'}</p>
                <p title={`${dateLabel}: ${formatDate(displayDate)}`}>
                    <FaCalendarAlt className="icon" /> {formatDate(displayDate)}
                </p>
            </div>
            <div className="ticket-id">{ticket.id}</div>
        </div>
    );
}

export default KanbanCard;
