import { useState, useEffect } from 'react';
import { FaTimes, FaHistory } from 'react-icons/fa';
import '../css/HistoryModal.css';
import { formatDate } from '../utils/dateUtils';

function HistoryModal({ onClose }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/history`);
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content history-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <h2><FaHistory /> Activity History</h2>
                </div>

                <div className="modal-body">
                    {loading ? (
                        <div className="loading">Loading History...</div>
                    ) : (
                        <div className="history-table-container">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>User</th>
                                        <th>Action / Details</th>
                                        <th>Ticket ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center' }}>No history found</td>
                                        </tr>
                                    ) : (
                                        history.map((item) => (
                                            <tr key={item.id}>
                                                <td className="time-col">{formatDate(item.timestamp)}</td>
                                                <td className="user-col">
                                                    <span className="user-badge">{item.signature || 'System'}</span>
                                                </td>
                                                <td className="details-col">{item.details}</td>
                                                <td className="subject-col">{item.ticket_id}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryModal;
