import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/tags';


const baseUrl = 'http://localhost:8000/api/story-service/statistics';

class StatisticService {
    static async getReadStatisticsOfUser(from, to){
        const url = baseUrl + `/get_read_statistics_of_user?from=${from}&to=${to}`;
        return axios.get(url);
    }
}

export default StatisticService;