import axios from 'axios';
import { API_URL } from '../config/api';

const baseUrl = API_URL + '/api/story-service/statistics';

class StatisticService {
    static async getReadStatisticsOfUser(from, to){
        const url = baseUrl + `/get_read_statistics_of_user?from=${from}&to=${to}`;
        return axios.get(url);
    }
}

export default StatisticService;