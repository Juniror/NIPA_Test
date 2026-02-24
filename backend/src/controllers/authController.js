import authService from '../services/authService.js';
import handleError from '../utils/handleError.js';

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

export default authController;
