import axios from 'axios';
const base_url = 'http://localhost:8004/api/v1/report';

class ReportService {
    static async reportComment(reportRequest) {
        const url = base_url.concat('/reportComment');
        return axios.post(url, reportRequest);
    }

    static async getCommentReports(pageNo) {
        const url = base_url.concat('/getCommentReports?pageSize=10&pageNo=').concat(pageNo);
        return axios.get(url);

    }
}

export default ReportService;