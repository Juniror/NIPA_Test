import historyRepository from '../repository/historyRepository.js';

const historyService = {

    async getHistory() {
        return await historyRepository.findAll();
    }
};

export default historyService;
