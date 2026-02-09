export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    // Manual formatting to ensure consistency
    const day = date.getDate();
    const month = date.toLocaleDateString('th-TH', { month: 'short' });
    const year = date.getFullYear() + 543; 
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
};
