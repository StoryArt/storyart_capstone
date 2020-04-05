import axios from 'axios';
import { API_URL } from '../config/api';

const baseUrl = API_URL + '/api/story-service/statistics';

class StatisticService {
    static async getReadStatisticsOfUser(from, to){
        const url = baseUrl + `/get_read_statistics_of_user?from=${from}&to=${to}`;
        return axios.get(url);
    }

    
    static async getScreenTimeData(sid, timeRange){

        let screenUrl =
     "http://localhost:8000/api/story-service/interact/getScreenTime/" +   sid;
       
       return axios.post(screenUrl, timeRange);
   }
   static async getLinkClickData(sid, timeRange){

       let screenUrl =      
       "http://localhost:8000/api/story-service/stories/story/"+sid+"/statistic/link-click"
       return axios.post(screenUrl, timeRange);
   }
}

export default StatisticService;