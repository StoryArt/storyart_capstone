import axios from 'axios';
const base_url = 'http://localhost:8004/api/v1/comment';


class CommentService {
    static async addComment(comment) {
        const url = base_url;
        return axios.post(url, comment);
    }

    static async getComments(pageNo, sortBy, getCommentRequestBody) {
        const url = base_url.concat('/getAll?pageSize=10&pageNo=').concat(pageNo).concat('&sortBy=').concat(sortBy);
        return axios.post(url, getCommentRequestBody);

    }

    static async getCommentHistory(userId, pageNo) {
        const url = base_url.concat('/getCommentHistory?pageSize=5&pageNo=').concat(pageNo).concat('&userId=').concat(userId);
        return axios.get(url);

    }

    static async deleteComment(deleteCommentRequest) {
        const url = base_url.concat('/delete');
        return axios.post(url, deleteCommentRequest);
    }

    static async updateComment(updateCommentRequest) {
        const url = base_url.concat('/update');
        return axios.put(url, updateCommentRequest);
    }
}

export default CommentService;