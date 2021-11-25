import axios from 'axios'
import { BASE_URL, TOKEN_CYBERSOFT } from 'settings/apiConfig';

const callApi=(endpoint, method = 'GET', data = null, token = null)=>{
    return axios({
        url:`${BASE_URL}/${endpoint}`,
        method,
        data,
        headers:{ Authorization: `Bearer ${token}`,
        TokenCybersoft: TOKEN_CYBERSOFT}
    })
}
export default callApi;