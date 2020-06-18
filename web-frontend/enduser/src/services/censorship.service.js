import axios from "axios";
import { API_URL } from '../config/api';

const baseUrl = API_URL + "/api/story-service/censorship";

class CensorshipService {

  static async handleCensorshipByAdmin(censorship) {
    const url = baseUrl;
    return axios.put(url, censorship);
  }

  static async requestCensorshipByUSser(censorship) {
    const url = baseUrl;
    return axios.post(url, censorship);
  }

  static async cancelRequestCensorship({ storyId }) {
    const url = baseUrl + '/cancel-request/' + storyId;
    return axios.put(url);
  }
  
  
}

export default CensorshipService;
