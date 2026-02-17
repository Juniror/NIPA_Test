import { FaUser, FaHistory, FaSync, FaSignOutAlt } from 'react-icons/fa';

function TicketHeader({ user, onShowHistory, onRefresh, onLogout, loading, sortBy, onSortChange }) {
    return (
        <header className="dashboard-header">
            <button className="user-welcome" onClick={onLogout} title="Click to logout">
                <FaUser className="user-icon-small" />
                <span>{user?.username || 'อันนี้ทะลุ ช่องว่าง (Unknown)'}</span>
                <FaSignOutAlt className="logout-icon" />
            </button>
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
