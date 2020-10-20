import axios from '../utils/request';
import url from './base';
import qs from 'qs';


const cent = {
    login (params){
        return axios.post(`${url}/login`,qs.stringify(params))
    },

    fetchData(query){
        return axios.get('./table.json',{params:query})
    }
}



export default { cent };
