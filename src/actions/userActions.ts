import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from './../constants/userConstants';
import UserService from "../services/user.service";
import Cookie from 'js-cookie';


const signin = (email: string, password: string) => async (dispatch: any) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload : {email, password}})
    try {
        const user = await UserService.signin(email, password);
        console.log(user);
        
        dispatch({ type : USER_SIGNIN_SUCCESS, payload: user})
        Cookie.set('userInfos', JSON.stringify(user))
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message})
    }
}

const register = (name: string, email: string, password: string) => async (dispatch: any) => {
    dispatch({type: USER_REGISTER_REQUEST, payload : {name, email, password}})
    try {
        const user = await UserService.register(name, email, password);
        console.log(user);
        
        dispatch({ type : USER_REGISTER_SUCCESS, payload: user})
        Cookie.set('userInfos', JSON.stringify(user))
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
    }
}

export { signin, register};