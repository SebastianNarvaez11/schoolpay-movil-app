import { START_FETCH_GRADES, FINISH_FETCH_GRADES, FETCH_GRADES, SELECT_GRADE, RESET_GRADE } from '../actions/gradeActions'

const initialState = {
    isFetchGrades: false,
    grades: [],
    grade_select: {},
}


const gradeReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_FETCH_GRADES:
            return {
                ...state,
                isFetchGrades: true
            }

        case FINISH_FETCH_GRADES:
            return {
                ...state,
                isFetchGrades: false
            }

        case FETCH_GRADES:
            return {
                ...state,
                grades: action.payload.grades,
                isFetchGrades: false
            }

        case SELECT_GRADE:
            return {
                ...state,
                grade_select: action.payload.grade
            }

        case RESET_GRADE:
            return {
                ...state,
                grade_select: {}
            }

        default:
            return state
    }
}

export default gradeReducer