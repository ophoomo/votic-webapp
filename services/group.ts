import axios from "axios";
import { host } from "../config/dev";


export class Group {
    find(id: string) {
        return axios.get(`${host}/group/${id}`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    findMember(id: string) {
        return axios.get(`${host}/group/${id}/member`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    create(nameGroup: string) {
        return axios.post(`${host}/group`, {
            name: nameGroup
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    update(name: string, id: string) {
        return axios.patch(`${host}/group/${id}/`, {
            name: name,
        }, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    join(code: string) {
        return axios.post(`${host}/group/${code}/join`, {}, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    remove(id : string) {
        return axios.delete(`${host}/group/${id}`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    removeMember(id : string, idMember: string) {
        return axios.delete(`${host}/group/${id}/kick/${idMember}`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    changeOwner(id : string, idMember: string) {
        return axios.put(`${host}/group/${id}/owner/${idMember}`,{}, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
    leave(id : string) {
        return axios.delete(`${host}/group/${id}/leave`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Version-Header': 1,
            }
        });
    }
}