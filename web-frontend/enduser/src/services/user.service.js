


import axios from "axios";
import { clearTokenFromLocal, getAuthUserInfo, setAuthHeader } from '../config/auth';
import { ROLE_NAMES } from "../common/constants";

const baseUrl = 'http://localhost:8002/api/v1';


class UserService {
  static async login(user) {
    const url = baseUrl + "/auth/signin";
    return axios.post(url, user);
  }

  static async register(user) {
    const url = baseUrl + "/auth/signup";
    return axios.post(url, user);

  }
  static async addUser(user) {
    const url = baseUrl + "/admin/users/add";
    return axios.post(url, user);
  }

  static async getUsersList(page, size, search) {
    const url = baseUrl + "/admin/users/userOnly?page="+page+"&size="+size+"&s="+search;
    return axios.get(url);
  }
  
  static async getAdminsList(page, size, search) {
    const url = baseUrl + "/systemad/admins?page="+page+"&size="+size+"&s="+search;
    return  axios.get(url);
  }
  
  static async setStatusUser(url) {
    return axios.delete(url);
  }

  static async setStatusAdmin(url) {
    return axios.delete(url);
  }

  static async logout(){
    const user = getAuthUserInfo();
    clearTokenFromLocal();
    setAuthHeader(null);
    if(user.role === ROLE_NAMES.ROLE_SYSTEM_ADMIN || user.role === ROLE_NAMES.ROLE_ADMIN){
      window.location.href = "/login";
    } else {
      window.location.href = "/home";
    }
  }

  static async addAdmin(user) {
    const url=baseUrl + "/systemad"
    return axios.post(url, user);
  }

  static async getMyProfile() {
    let url = baseUrl + "/user/me";
    return axios.get(url);
  }
  static async getProById(userId) {
    let url = baseUrl + "/user/"+userId;
    return axios.get(url);
  }

  static async updateProfile(user, uid){
    let url1 = baseUrl + "/user/" + uid;
    return axios.put(url1, user);
  }

}

export default UserService;
