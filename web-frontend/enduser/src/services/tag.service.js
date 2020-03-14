import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/tags';

class TagService {
    static async getTags(){
        const url = storyEndpointAPIUrl + '/all';
        return axios.get(url);
    }

    
    static async updateTag(tag){
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          console.log(tag);
          const url = "http://localhost:8003/tags";
         return axios.put(url, tag, config);
    }

    static async insertTag(tag){
        const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          console.log(tag);
          const url = "http://localhost:8003/tags";
         return axios.post(url, tag, config);
    }

    static async getAllTag(){
        const url = "http://localhost:8003/tags/getAll";
        return axios.get(url);
    }

}

export default TagService;