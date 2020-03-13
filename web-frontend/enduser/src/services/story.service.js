import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

const storyEndpointAPIUrl = API_ENDPOINT_PREFIX + '/stories';

class StoryService{
    static async createStory(story){
        const url = storyEndpointAPIUrl;
        return axios.post(url, story);
    }

    static async updateStory(story){
        const url = storyEndpointAPIUrl;
        return axios.put(url, story);
    }

    static async getReadingStory(storyId){
        const url = storyEndpointAPIUrl + '/read/' + storyId;
        return axios.get(url);
    }

    static async searchStories({ tags, keyword, isActive, isPublished, page, itemsPerPage }){
        const url = storyEndpointAPIUrl + `/search?keyword=${keyword}&isActive=${isActive}&isPublished=${isPublished}&page=${page}&itemsPerPage=${itemsPerPage}&tags=${tags}`;
        return axios.get(url);
    }

    static async getTrendStories(quantity){
        if(!quantity) quantity = 12;
        const url = storyEndpointAPIUrl + '/trend?quantity=' + quantity;
        return axios.get(url);
    }

    static async getStoryDetails(storyId){
        const url = storyEndpointAPIUrl + '/' + storyId;
        return axios.get(url);
    }

    static async getSuggestionStories(quantity){
        if(!quantity) quantity = 12;
        const url = 'http://localhost:8003/rating/suggestRated1';
        return axios.get(url);
    }

    
}

export default StoryService;