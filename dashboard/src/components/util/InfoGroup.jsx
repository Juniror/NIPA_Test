import React from 'react';
import '../../css/DashboardLayout.css';

function InfoGroup({ label, children, className = '', fullWidth = false }) {
    return (
        <div className={`info-group ${fullWidth ? 'full-width' : ''} ${className}`}>
            <label>{label}</label>
            {children}
        </div>
    );
}

export default InfoGroup;
