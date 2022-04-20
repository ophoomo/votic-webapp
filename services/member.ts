import axios from "axios";
import { host } from "../config/dev";

interface createStruct {
    username: string
    password: string
    firstname: string
    lastname: string
    gender: string
}

export class Member {
    create(data : createStruct) {
        return axios.post(`${host}/member/`, {
            username: data.username,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender === '1' ? true : false
        }, {
            headers: {
                'Version-Header' : 1
            }
        });
    }
    update(firstname: string, lastname: string, gender: string) {
        return axios.patch(`${host}/member/`, {
            firstname: firstname,
            lastname: lastname,
            gender: gender === '1' ? true : false
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header' : 1
            }
        });
    }
    password(passwordold: string, passwordnew: string) {
        return axios.put(`${host}/member/password`, {
            passwordold: passwordold,
            passwordnew: passwordnew
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header' : 1
            }
        });
    }
}