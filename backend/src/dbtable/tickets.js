const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        status ENUM('pending', 'accepted', 'resolved', 'rejected') DEFAULT 'pending',
        memo TEXT,
        signature VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

module.exports = createTableQuery;
