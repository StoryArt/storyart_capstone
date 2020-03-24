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

<<<<<<< HEAD
    static async getSuggestStoryByRating(pageNo){
        let pagesize = 4;
        const url = "http://localhost:8003/rating/suggestRated1?pageNo=".concat(pageNo).concat('&pageSize=').concat(pagesize);
        return axios.get(url);
    }

    static async getSuggestStoryByHistory(pageNo){
        let pagesize = 4;
        const url = "http://localhost:8003/history/suggestRated1?pageNo=".concat(pageNo).concat('&pageSize=').concat(pagesize);
        return axios.get(url);
    }

=======
    static async updateStoryByAdmin(storyId, enable){
        const url = baseUrl + '/update_by_admin/' + storyId + '/' + enable;
        return axios.put(url);
    }

    static getStoriesForAdmin({ page, itemsPerPage, asc, orderBy, keyword }){
        const url = baseUrl + `/get_for_admin?page=${page}&itemsPerPage=${itemsPerPage}&asc=${asc}&orderBy=${orderBy}&keyword=${keyword}`;
        return axios.get(url);
    }
>>>>>>> 8cda2314fa393dc565ba97d5a524415d82d33900
}

export default StoryService;