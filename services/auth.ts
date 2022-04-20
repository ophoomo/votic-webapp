import axios from "axios";
import { host } from "../config/dev";


export class Auth {
    verify() {
        return axios.post(`${host}/auth/verify`, {}, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header' : 1
            }
        });
    }
    login(username : string, password : string) {
        return axios.post(`${host}/auth/login`, {
            username: username,
            password: password
        }, {
            headers: {
                'Version-Header' : 1
            }
        });
    }
    refresh() {
        return axios.post(``, {}, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
}