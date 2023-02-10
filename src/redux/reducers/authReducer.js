import { LOGIN, LOGOUT, GET_CURRENT_USER, START_LOADING, FINISH_LOADING } from '../actions/authActions'


const initialState = {
    isLoading: false,
    token: null,
    current_user: null,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_LOADING:
            return {
                isLoading: true
            }

        case FINISH_LOADING:
            return {
                isLoading: false
            }

        case LOGIN:
            return {
                token: action.payload.token,
                current_user: action.payload.user,
                isLoading: false
            }

        case LOGOUT:
            return {
                token: null,
                current_user: null,
                isLoading: false
            }

        case GET_CURRENT_USER:
            return {
                ...state,
                current_user: action.payload.user,
            }

        default:
            return state
    }
}

export default authReducer