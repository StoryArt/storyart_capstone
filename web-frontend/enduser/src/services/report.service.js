import axios from 'axios';
const base_url = 'http://localhost:8004/api/v1/report';

class ReportService {
    static async reportComment(reportRequest) {
        const url = base_url.concat('/reportComment');
        return axios.post(url, reportRequest);
    }
}

export default ReportService;