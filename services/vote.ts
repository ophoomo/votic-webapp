import axios from "axios";
import { host } from "../config/dev";

export class Vote {
    find(id: string) {
        return axios.get(`${host}/vote/${id}/post/all`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header' : 1
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
    create(idgroup: string, header: string, timeout: string, select: Array<string>) {
        return axios.post(`${host}/vote`, {
            idgroup: idgroup,
            timeout: timeout,
            header: header,
            select: select,
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header' : 1
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