import { START_FETCH_COMPROMISES, FINISH_FETCH_COMPROMISES, FETCH_COMPROMISES} from '../actions/compromiseActions'

const initialState = {
    isFetchCompromises: false,
    compromises: [],
}


const compromiseReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_FETCH_COMPROMISES:
            return {
                ...state,
                isFetchCompromises: true
            }

        case FINISH_FETCH_COMPROMISES:
            return {
                ...state,
                isFetchCompromises: false
            }

        case FETCH_COMPROMISES:
            return {
                ...state,
                compromises: action.payload.compromises,
                isFetchCompromises: false
            }

        default:
            return state
    }
}

export default compromiseReducer