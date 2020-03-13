import axios from 'axios';

class TagService{
    static async getTags(){
        const url = 'http://localhost:8003/api/v1/tag/getAll';
        return axios.get(url);
    }

    static async addTag(post){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.post(url, post);
    }

    static async updateTag(post){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.put(url, post);
    }

    static async removeTag(postId){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.delete(url);
    }
}

export default TagService;