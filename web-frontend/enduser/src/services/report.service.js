import axios from 'axios';
import { setAuthHeader, getTokenFromLocal } from '../config/auth';
const base_url = 'http://localhost:8000/api/comment-service/api/v1/report';


class ReportService {
    static async reportComment(reportRequest) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/reportComment');
        return axios.post(url, reportRequest);
    }

    static async reportStory(reportRequest) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/reportStory');
        return axios.post(url, reportRequest);
    }

    static async getCommentReports(pageNo, isHandled) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/getCommentReports?pageSize=5&pageNo=').concat(pageNo).concat('&isHandled=').concat(isHandled);
        return axios.get(url);

    }

    static async getReportsForEachComment(pageNo, commentId, isHandled) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/getReportsByCommentId?pageSize=3&pageNo=').concat(pageNo).concat('&commentId=').concat(commentId).concat('&isHandled=').concat(isHandled);
        return axios.get(url);

    }

    static async handleReport(handleRequest) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/handleReport');
        return axios.post(url, handleRequest);
    }

    static async getStoryReports(pageNo, isHandled) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/getStoryReports?pageSize=5&pageNo=').concat(pageNo).concat('&isHandled=').concat(isHandled);
        return axios.get(url);
    }

    static async getReportsForEachStory(pageNo, storyId, isHandled) {
        setAuthHeader(getTokenFromLocal());
        const url = base_url.concat('/getReportsByStoryId?pageSize=3&pageNo=').concat(pageNo).concat('&storyId=').concat(storyId).concat('&isHandled=').concat(isHandled);
        return axios.get(url);

    }


}

export default ReportService;