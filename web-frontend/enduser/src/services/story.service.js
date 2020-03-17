import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const baseUrl = API_ENDPOINT_PREFIX + '/stories';

class StoryService{
    static async createStory(story){
        const url = baseUrl;
        return axios.post(url, story);
    }

    static async updateStory(story){
        const url = baseUrl;
        return axios.put(url, story);
    }

    static async getReadingStory(storyId){
        const url = baseUrl + '/read/' + storyId;
        return axios.get(url);
    }

    static async getStoriesByAuthor(userId){
        const url = baseUrl + '/get_by_author/' + userId;
        return axios.get(url);
    }

    
    static async searchStories({ tags, keyword, isActive, isPublished, page, itemsPerPage }){
        const url = baseUrl + `/search?keyword=${keyword}&isActive=${isActive}&isPublished=${isPublished}&page=${page}&itemsPerPage=${itemsPerPage}&tags=${tags}`;
        return axios.get(url);
    }

    static async getTrendStories(quantity){
        if(!quantity) quantity = 12;
        const url = baseUrl + '/trend?quantity=' + quantity;
        return axios.get(url);
    }

    static async getStoryDetails(storyId){
        const url = baseUrl + '/' + storyId;
        return axios.get(url);
    }

}

export default StoryService;