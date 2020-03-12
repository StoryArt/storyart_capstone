import axios from "axios";

class UserService {
  static async login(user) {
    const url = "http://localhost:8002/api/v1/auth/signin";
    console.log("user posted:");
    console.log(user);
    return axios.post(url, user);
  }

  static async register(user) {
    const url = "http://localhost:8002/api/v1/auth/signup";
    return axios.post(url, user);

  }
  static async addUser(user) {
    const url = "http://localhost:8002/api/v1/admin/users/add";
    return axios.post(url, user);

  }

  static async getUsersList(page, size, search) {
    const url = "http://localhost:8002/api/v1/admin/user/userOnly?page=0&size=10&s=";
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };
   return  axios.get(url, { headers: headers });
  }


  
  static async getAdminsList(page, size, search) {
    const url = "http://localhost:8002/api/v1/systemad/admins?page=0&size=10&s=";
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };
   return  axios.get(url, { headers: headers });
  }
  
  static async setStatusUser(url) {
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };

    return axios.delete(url, { headers: headers });

    
  }

  static async setStatusAdmin(url) {
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };

    return axios.delete(url, { headers: headers });

    
  }


static async logout(){
  localStorage.removeItem("tokenKey");
  window.location="http://localhost:3001/home";
}


  static async addAdmin(user) {

    const url="http://localhost:8002/api/v1/systemad"
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };

    return axios.post(url, user, { headers: headers });

    
  }

  static async getMyProfile() {
    let url1 = "http://localhost:8002/api/v1/user/me";
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };

    return axios.get(url1,{headers: headers});
  }



  static async updateProfile(user, uid){
    let url1 = "http://localhost:8002/api/v1/user/" + uid;
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };
    return axios.put(url1, user, {headers: headers});
  }


  static async logout(user, uid){
    let url1 = "http://localhost:8002/api/v1/user/" + uid;
    const headers = {
      "Authorization": localStorage.getItem("tokenKey")
    };
    return axios.put(url1, user, {headers: headers});
  }



}

export default UserService;
