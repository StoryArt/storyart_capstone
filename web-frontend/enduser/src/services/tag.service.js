import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/tags';


const baseUrl2 = 'http://localhost:8000/api/story-service';

class TagService {
    static async getTags(){
        const url = storyEndpointAPIUrl + '/public/all';
        return axios.get(url);
    }
    static async getAllTag(){
        const url = storyEndpointAPIUrl + "/public/getAll";
    return axios.get(url);
    }

    static async addTag(tag){
        const url = storyEndpointAPIUrl;
    return axios.post(url, tag);
    }

    static async updateTag(tag){
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          const url = storyEndpointAPIUrl;
        return  axios.put(url, tag, config);
    }
}

export default TagService;