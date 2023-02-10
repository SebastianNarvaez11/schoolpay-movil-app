import {
    START_FETCH_STUDENTS, FINISH_FETCH_STUDENTS,
    START_FETCH_STUDENTSFULL,
    FINISH_FETCH_STUDENTSFULL,
    START_FETCH_STUDENT_FOR_GRADE,
    FINISH_FETCH_STUDENT_FOR_GRADE,
    FETCH_STUDENTS,
    CREATE_STUDENT, UPDATE_STUDENT,
    DELETE_STUDENT, FILTER_STUDENT,
    RESET_STUDENT_SELECT, UPDATE_STUDENT_SELECT,
    UPDATE_STUDENTS_FULL, FILTER_STUDENT_GRADE,
    FETCH_DATA_GRAPHICS, START_FETCH_DATA_GRAPHICS,
    FINISH_FETCH_DATA_GRAPHICS
} from '../actions/studentActions'

const initialState = {
    students: [],//usuarios de tipo student con datos minimos para poder filtrar
    students_full: [],//4 students completos de donde se leen los datos
    isFetching: false,
    isFetchStudentsFull: false,
    isFetchingStudentForGrade: false,
    students_select: [],//students que activa el cambio para que no haya ciclo
    students_filter: [],//lista de estudiantes que se van filtrando a medida que se va escribiendo en el input
    students_filter_grade: [],//lista de estudiantes sefiltra por grado
    schedule_select: '',
    data_graphics: [],//datos que se cargan para realizar los graficos, los filtros totales y reportes
    isFetchingData: false,
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_FETCH_STUDENTS:
            return {
                ...state,
                isFetching: true
            }

        case FINISH_FETCH_STUDENTS:
            return {
                ...state,
                isFetching: false
            }

        case START_FETCH_STUDENTSFULL:
            return {
                ...state,
                isFetchStudentsFull: true,
            }

        case FINISH_FETCH_STUDENTSFULL:
            return {
                ...state,
                isFetchStudentsFull: false,
            }

        case START_FETCH_STUDENT_FOR_GRADE:
            return {
                ...state,
                isFetchingStudentForGrade: true
            }

        case FINISH_FETCH_STUDENT_FOR_GRADE:
            return {
                ...state,
                isFetchingStudentForGrade: false
            }

        case START_FETCH_DATA_GRAPHICS: {
            return {
                ...state,
                isFetchingData: true
            }
        }

        case FINISH_FETCH_DATA_GRAPHICS: {
            return {
                ...state,
                isFetchingData: false
            }
        }

        case FETCH_STUDENTS:
            return {
                ...state,
                students: action.payload.students,
                isFetching: false
            }

        case CREATE_STUDENT:
            return {
                ...state,
                students: [action.payload.user, ...state.students]
            }

        case UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.payload.user.id ? (student = action.payload.user) : student),

                //para actualizar los porcentajes cuando se registren los pagos manuales
                data_graphics: state.data_graphics.map(student =>
                    student.id === action.payload.user.id ? (student = action.payload.user) : student),
            }

        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload.user.id),
                student_full: {}
            }

        case FILTER_STUDENT:
            var text = action.payload.text
            const data = state.students
            const newData = data.filter(function (item) {
                const code = item.student.code.toUpperCase()
                const first_name = item.first_name.toUpperCase()
                const last_name = item.last_name.toUpperCase()
                const campo = code + " " + last_name + " " + first_name
                const textData = text.toUpperCase()
                return campo.indexOf(textData) > -1
            })


            return {
                ...state,
                isFetchStudentsFull: true,
                students_filter: newData,
                students_select: newData.slice(0, 3)
            }

        case FILTER_STUDENT_GRADE:
            return {
                ...state,
                schedule_select: action.payload.schedule,
                students_filter_grade: action.payload.students,
                isFetchingStudentForGrade: false
            }

        case RESET_STUDENT_SELECT:
            return {
                ...state,
                students_select: {},
                students_filter: []
            }

        case UPDATE_STUDENT_SELECT:
            return {
                ...state,
                student_select: action.payload.user
            }

        case UPDATE_STUDENTS_FULL:
            return {
                ...state,
                isFetchStudentsFull: false,
                students_full: action.payload.students_full
            }

        case FETCH_DATA_GRAPHICS:
            return {
                ...state,
                data_graphics: action.payload.students,
                isFetchingData: false
            }

        default:
            return state
    }
}

export default studentReducer