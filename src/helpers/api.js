import axios from "axios";
import {API_BASE_URL} from "../data/Vars";

function getUserToken() {
    return  localStorage.getItem("userToken");
}

function getUserRefreshToken() {
    return localStorage.getItem("userRefreshToken");
}

function getUserTokenExpireTime() {
    return localStorage.getItem("userTokenExpiresAt");
}

function isUserTokenExpired() {
    const token_expires_at = getUserTokenExpireTime();
    return new Date(token_expires_at).getTime() < Date.now();
}

function request(requestConfigs, needsAuth= true) {
    requestConfigs.url = API_BASE_URL + requestConfigs.url;
    if(needsAuth) {
        if (isUserTokenExpired()) {
            return refreshToken(requestConfigs)
        }
        else {
            return axios.request({...requestConfigs, headers: {'Authorization': 'Bearer '+ getUserToken()}})
        }
    }
    else {
        return axios.request({...requestConfigs})
    }
}

function refreshToken(callbackRequestConfigs) {
    return axios.post(API_BASE_URL + 'auth/token-refresh/', {}, {headers: {'Authorization': 'Bearer '+getUserRefreshToken()}})
        .then(({data}) => {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userRefreshToken", data.refresh);
            localStorage.setItem("userTokenExpiresAt", data.token_expires_at);
            return axios.request({...callbackRequestConfigs, headers: {'Authorization': 'Bearer '+data.token}})
        })
        .catch(err => {
            if (err.response.status === 401) {
                return window.location = 'https://'+window.location.host+'/login';
            }
            throw(err);
        });
}

const api = {

    getImages() {
        let result = request({method: 'get', url: 'image/'}, false);
        console.log("Result", result);
        return result
    },

    uploadFiles(formData) {
        return request(
            {method: 'post', url: 'upload/', data: formData, headers: {'Content-Type': 'multipart/form-data'}},
            false
        );
    },

    getUploads() {
        return request({method: 'get', url: 'upload/'});
    },

    updateUpload(id, data) {
        return request({method: 'patch', url: 'upload/'+id+'/', data: data});
    },

    getUser(id) {
        return request({method: 'get', url: 'account/'+id+'/'});
    },

    authenticateUser(data) {
        return request({method: 'post', url: 'auth/token/', data: data}, false);
    },

    rejectUpload(id, data) {
        return request({method: 'post', url: 'upload/'+id+'/reject/', data: data});
    },

    logout() {
        localStorage.clear();
        return window.location = 'https://'+window.location.host+'/login';
    },
};

export default api;
