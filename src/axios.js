import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
axios.defaults.timeout = 100000


export default axios