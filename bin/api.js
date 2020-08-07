const axios = require('axios');
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})
module.exports = {
    api: axios,
    post (url, params) {
        return axios({
            method: 'post',
            url,
            data: params,
            dataType: JSON,
            headers: {
                // 'Content-Type': 'application/json',
                'PRIVATE-TOKEN': '9HsqNAjLkkzs4keUZiEe'
            }
        })
    },
    get (url) {
        return axios({
            url,
            headers: {
                'PRIVATE-TOKEN': '9HsqNAjLkkzs4keUZiEe'
            }
        })
    }
}