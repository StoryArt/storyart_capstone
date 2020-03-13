import axios from 'axios';
const base_url = 'http://localhost:8004/api/v1/reaction';

class ReactionService {

    static async getReactionHistory(userId, pageNo) {
        const url = base_url.concat('/getReactionHistory?pageSize=5&pageNo=').concat(pageNo).concat('&userId=').concat(userId);
        return axios.get(url);
    }

    static async deleteReaction(deleteReactionRequest) {
        const url = base_url.concat('/delete');
        return axios.post(url, deleteReactionRequest);
    }

    static async react(reactRequest) {
        const url = base_url.concat('/react');
        return axios.post(url, reactRequest);
    }
}


export default ReactionService;