import axios from "axios";

const host = "http://localhost:5560";

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
    update(firstname: string, lastname: string) {
        return axios.patch(``, {
            firstname: firstname,
            lastname: lastname
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
    password(password: string) {
        return axios.put(``, {
            password: password
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
}