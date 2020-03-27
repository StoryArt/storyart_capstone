import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';

// const baseUrl = API_ENDPOINT_PREFIX + '/stories';
const baseUrl = 'http://localhost:8000/api/story-service/stories';

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
        const url = baseUrl + '/public/read/' + storyId;
        return axios.get(url);
    }

    static async getStoriesByAuthor(userId, { orderBy, asc, keyword, page, itemsPerPage }){
        const url = baseUrl + '/get_by_author' + `?orderBy=${orderBy}&asc=${asc}&keyword=${keyword}&page=${page}&itemsPerPage=${itemsPerPage}`;
        return axios.get(url);
    }

    
    static async searchStories({ tags, keyword, isActive, isPublished, page, itemsPerPage }){
        const url = baseUrl + `/public/search?keyword=${keyword}&isActive=${isActive}&isPublished=${isPublished}&page=${page}&itemsPerPage=${itemsPerPage}&tags=${tags}`;
        return axios.get(url);
    }

    static async getTrendStories(quantity){
        if(!quantity) quantity = 12;
        const url = baseUrl + '/public/trend?quantity=' + quantity;
        return axios.get(url);
    }

    static async getStoryDetails(storyId){
        const url = baseUrl + '/public/' + storyId;
        return axios.get(url);
    }

    static async updateStoryByAdmin(storyId, enable){
        const url = baseUrl + '/update_by_admin/' + storyId + '/' + enable;
        return axios.put(url);
    }

    static async deleteStory(storyId){
        const url = baseUrl + '/' + storyId ;
        return axios.delete(url);
    }

    static async changePublishedStatus(storyId, turnOnPublished){
        const url = baseUrl + '/change_published?storyId=' + storyId + '&turnOnPublished=' + turnOnPublished;
        return axios.put(url);
    }

    static getStoriesForAdmin({ page, itemsPerPage, asc, orderBy, keyword }){
        const url = baseUrl + `/get_for_admin?page=${page}&itemsPerPage=${itemsPerPage}&asc=${asc}&orderBy=${orderBy}&keyword=${keyword}`;
        return axios.get(url);
    }
}

export default StoryService;