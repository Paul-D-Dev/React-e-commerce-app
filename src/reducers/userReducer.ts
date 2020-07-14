import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST } from './../constants/userConstants';
import { User } from '../models/user';

type RequestSignin = {
    email : string,
    password: string
}

type RequestRegister = {
    name: string,
    email : string,
    password: string
}

type ActionSignin = | {type: 'USER_SIGNIN_REQUEST', payload: RequestSignin}
                  | {type: 'USER_SIGNIN_SUCCESS', payload: User}
                  | {type: 'USER_SIGNIN_FAIL', payload: string}

type ActionRegister = | {type: 'USER_REGISTER_REQUEST', payload: RequestRegister}
                      | {type: 'USER_REGISTER_SUCCESS', payload: User}
                      | {type: 'USER_REGISTER_FAIL', payload: string}          

const userSignInReducer = (state = {}, action: ActionSignin) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading : true};
        case USER_SIGNIN_SUCCESS:
            // the name of userInfos = store intial state of user.userInfos
            return {loading: false, userInfos: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state
    }
}


const userRegisterReducer = (state = {}, action: ActionRegister) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading : true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfos: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state
    }
}

export { userSignInReducer, userRegisterReducer };