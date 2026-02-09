const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const getDbConfig = () => {
    let host = process.env.DB_HOST;
    // Fallback logic similar to initDatabase.js
    if (host === 'db') {
        // If running locally against docker mapped port
        host = '127.0.0.1';
    }
    return {
        host: host,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    };
};

async function seedData() {
    const config = getDbConfig();
    console.log(`Connecting to ${config.host}...`);

    try {
        const connection = await mysql.createConnection(config);
        console.log('Connected!');

        const tickets = [
            { subject: 'Login issue', status: 'pending', offset: 0 }, // Today
            { subject: 'Payment failed', status: 'pending', offset: -1 }, // Yesterday
            { subject: 'Feature request', status: 'accepted', offset: -2 },
            { subject: 'Bug in dashboard', status: 'resolved', offset: -3 },
            { subject: 'Account locked', status: 'rejected', offset: -5 },
            { subject: 'Email update', status: 'pending', offset: -10 },
            { subject: 'Slow loading', status: 'accepted', offset: -15 },
            { subject: 'Mobile app crash', status: 'resolved', offset: -20 },
            { subject: 'Data export', status: 'pending', offset: -25 },
            { subject: 'Security alert', status: 'rejected', offset: -30 },
        ];

        console.log('Inserting 10 test tickets...');

        for (const t of tickets) {
            const date = new Date();
            date.setDate(date.getDate() + t.offset);
            // Randomize time
            date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

            const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');

            await connection.execute(`
                INSERT INTO tickets (name, email, subject, question, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                'Test User',
                `test${t.offset}@example.com`,
                `${t.subject} (Day ${t.offset})`,
                'Generated test data',
                t.status,
                timestamp,
                timestamp
            ]);
        }

        console.log('Seeding complete!');
        await connection.end();

    } catch (error) {
        console.error('Seeding failed:', error);
    }
}

seedData();
