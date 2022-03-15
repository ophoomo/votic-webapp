
export interface Payload {
    id: string
    iat: number
    exp: number
};

export class JWT {
    jwt = ''
    constructor(jwt: string) {
        this.jwt = jwt;
    }
    getPayload() : Payload {
        const token = this.jwt.split('.')[1];
        const payload = atob(token);
        return JSON.parse(payload);
    }
}