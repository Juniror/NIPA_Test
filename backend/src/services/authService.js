const AppError = require('../utils/AppError');
const employeeRepository = require('../repository/employeeRepository');

const authService = {

    async login(username, password) {
        if (!username || !password) {
            throw new AppError('Username and password are required.', 400);
        }

        const employee = await employeeRepository.findByUsername(username);

        if (!employee || employee.password !== password) {
            throw new AppError('Invalid username or password.', 401);
        }

        return {
            message: 'Login successful',
            user: {
                id: employee.id,
                mail: employee.mail,
                username: employee.username
            }
        };
    }
};

module.exports = authService;
