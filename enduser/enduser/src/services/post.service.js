import axios from 'axios';

class PostService{
    static async getPosts(){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.get(url);
    }

    static async addPost(post){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.post(url, post);
    }

    static async updatePost(post){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.put(url, post);
    }

    static async removePost(postId){
        const url = 'https://jsonplaceholder.typicode.com/posts';
        return axios.delete(url);
    }
}

export default PostService;