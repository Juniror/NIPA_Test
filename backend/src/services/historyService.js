const historyRepository = require('../repository/historyRepository');

const historyService = {

    async getHistory() {
        return await historyRepository.findAll();
    }
};

module.exports = historyService;
