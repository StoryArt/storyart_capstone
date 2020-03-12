import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/tags';

class TagService {
    static async getTags(){
        const url = storyEndpointAPIUrl + '/all';
        return axios.get(url);
    }

}

export default TagService;