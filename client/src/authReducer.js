import * as Actions from './Actions/ActionTypes';
const user = {
    data: { _id:null,token:null,isPaid:false},
    isLogin: false,
    error: {},
}
const AuthReducer = (state = user, action) => {
    switch (action.type) {
        case Actions.SIGNIN:
            return { ...state, data: action.payload, isLogin: true };
        case Actions.SIGNUP:
            return { ...state, data: action.payload, isLogin: true };
        case Actions.LOGOUT:
            localStorage.clear();
            return { ...state, data: {_id:null,token:null,isPaid:false},isLogin: false };
        case Actions.MAKEPREAUTH:
            return { ...state, data: action.payload, isLogin: true ,}
        // case Actions.GETUSERPROFILE:
        //         return { ...state,profileCoins:action.payload.user.coins.display,userProfile: action.payload,}
        default:
            return state;
    }
}
export default AuthReducer;