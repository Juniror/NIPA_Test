const addedDefaultUserQuery = `
    INSERT IGNORE INTO employees (mail, username, password)
    VALUES ('em01@gmail.com', 'em01', 'password')
`;

module.exports = addedDefaultUserQuery;
