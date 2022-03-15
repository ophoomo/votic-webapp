import axios from "axios";

export class Vote {
    find() {
        return axios.get(``, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    vote() {
        return axios.post(``, {

        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    create() {
        return axios.post(``, {

        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    update() {
        return axios.patch(``, {

        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    remove() {
        return axios.delete(``, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
}