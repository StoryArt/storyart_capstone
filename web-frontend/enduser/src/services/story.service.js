import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/stories';

class StoryService{
    static async createStory(story){
        const url = storyEndpointAPIUrl;
        return axios.post(url, story);
    }

    static async getReadingStory(storyId){
        const url = storyEndpointAPIUrl + '/read/' + storyId;
        return axios.get(url);
    }
}

export default StoryService;