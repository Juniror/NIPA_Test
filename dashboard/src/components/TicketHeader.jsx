import { FaUser, FaHistory, FaSync } from 'react-icons/fa';

function TicketHeader({ user, onShowHistory, onRefresh, loading, sortBy, onSortChange }) {
    return (
        <header className="dashboard-header">
            <div className="user-welcome">
                <FaUser className="user-icon-small" />
                <span>{user?.username || 'Admin'}</span>
            </div>
            <h1>Admin Dashboard - Support Tickets</h1>
            <div className="cleanup-controls">
                <button className="history-btn" onClick={onShowHistory} title="View History">
                    <FaHistory /> History
                </button>
                <button className="refresh-btn" onClick={onRefresh} title="Refresh Tickets">
                    <FaSync className={loading ? 'spin' : ''} /> Refresh
                </button>
                <label>Sort by: </label>
                <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                    <option value="none">None</option>
                    <option value="latest_update">Latest Update</option>
                    <option value="created_at">Created Date</option>
                </select>
            </div>
        </header>
    );
}

export default TicketHeader;
