import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from './../constants/userConstants';
import { User } from '../models/user';

type Request = {
    email : string,
    password: string
}

type ActionUser = | {type: 'USER_SIGNIN_REQUEST', payload: Request}
                  | {type: 'USER_SIGNIN_SUCCESS', payload: User}
                  | {type: 'USER_SIGNIN_FAIL', payload: string}

const userSignInReducer = (state = {}, action: ActionUser) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading : true};
        case USER_SIGNIN_SUCCESS:
            // the name of userInfos = store intial state of user.userInfos
            return {loading: false, userInfos: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: true, error: action.payload};
        default: 
            return state
    }
}

export { userSignInReducer };