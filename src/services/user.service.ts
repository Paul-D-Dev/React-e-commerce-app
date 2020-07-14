import axios from 'axios';
import { User } from '../models/user'


export default class UserService {
    static async signin(email: string, password: string): Promise<User> {
        const { data } = await axios.post('/api/users/signin', {email, password})        
        return data;
    } 
}