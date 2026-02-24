const authService = require('../services/authService');
const handleError = require('../utils/handleError');

const authController = {

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.json(result);
        } catch (error) {
            handleError(res, error, 'during login');
        }
    }
};

module.exports = authController;
