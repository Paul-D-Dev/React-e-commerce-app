export interface User {
    _id? : number,
    name: string,
    email: string,
    password?: string,
    isAdmin: boolean,
    token?: string
}