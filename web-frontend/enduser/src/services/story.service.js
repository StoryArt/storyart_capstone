import axios from 'axios';
import { API_ENDPOINT_PREFIX } from '../config/api';
import {getAuthUserInfo} from '../config/auth'

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


    static async getSuggestion(pageNo){
        let pagesize = 4;
        const userinfo = getAuthUserInfo();

        if(userinfo === null){
            const url1 = "http://localhost:8003/suggestion/suggeststory".concat('?pageNo=').concat(pageNo).concat('&pageSize=').concat(pagesize);
            return axios.get(url1);
        }else{
            const url = "http://localhost:8003/suggestion/suggest".concat(userinfo.id).concat('?pageNo=').concat(pageNo).concat('&pageSize=').concat(pagesize);
            return axios.get(url);
        }
    }

    static async updateStoryByAdmin(storyId, enable){
        const url = baseUrl + '/update_by_admin/' + storyId + '/' + enable;
        return axios.put(url);
    }

    static getStoriesForAdmin({ page, itemsPerPage, asc, orderBy, keyword }){
        const url = baseUrl + `/get_for_admin?page=${page}&itemsPerPage=${itemsPerPage}&asc=${asc}&orderBy=${orderBy}&keyword=${keyword}`;
        return axios.get(url);
    }
}

export default StoryService;