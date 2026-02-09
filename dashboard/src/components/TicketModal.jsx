import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../css/TicketModal.css';
import InfoGroup from './InfoGroup';

function TicketModal({ ticket, onClose, onUpdateTicket, columns }) {
    const [memo, setMemo] = useState('');

    useEffect(() => {
        if (ticket) {
            setMemo(ticket.memo || '');
        }
    }, [ticket]);

    const handleSaveMemo = () => {
        onUpdateTicket(ticket.id, { memo });
    };

    if (!ticket) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <h2>Ticket Details</h2>
                    <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>
                </div>

                <div className="modal-body">
                    <InfoGroup label="Subject:">
                        <p className="subject-text">{ticket.subject}</p>
                    </InfoGroup>

                    <div className="info-grid">
                        <InfoGroup label="Contact Name:">
                            <p>{ticket.name}</p>
                        </InfoGroup>
                        <InfoGroup label="Email:">
                            <p>{ticket.email}</p>
                        </InfoGroup>
                        <InfoGroup label="Phone:">
                            <p>{ticket.phone || 'N/A'}</p>
                        </InfoGroup>
                        <InfoGroup label="Company:">
                            <p>{ticket.company || 'N/A'}</p>
                        </InfoGroup>
                    </div>

                    <InfoGroup label="Question / Issue:" fullWidth>
                        <div className="question-box">
                            {ticket.question}
                        </div>
                    </InfoGroup>

                    <InfoGroup label="Memo:" fullWidth>
                        <textarea
                            className="memo-textarea"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="Add notes here..."
                        />
                        <button className="save-memo-btn" onClick={handleSaveMemo}>
                            Save Memo
                        </button>
                    </InfoGroup>

                    <InfoGroup label="Update Status:" fullWidth>
                        <div className="status-actions">
                            {columns.map(status => (
                                <button
                                    key={status}
                                    className={`status-btn ${status} ${ticket.status === status ? 'active' : ''}`}
                                    onClick={() => onUpdateTicket(ticket.id, { status })}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </InfoGroup>
                </div>
            </div>
        </div>
    );
}

export default TicketModal;
