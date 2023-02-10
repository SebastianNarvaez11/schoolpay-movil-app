import axios from 'axios'
import { host } from '../../helpers/host'
import { getData } from '../../helpers/asyncStorage'

export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'

//PARA PERSISTENCIA
export const TOKEN_KEY = 'TOKEN_KEY'
export const CURRENT_USER = 'CURRENT_USER'

export const setDataUser = () => async (dispatch) => {
    const token = await getData(TOKEN_KEY)
    const user = await getData(CURRENT_USER)

    dispatch({
        type: LOGIN,
        payload: {
            token: token,
            user: JSON.parse(user)
        }
    })
}


export const loginUser = (login) => async (dispatch) => {

    dispatch({ type: START_LOADING })
    let url = `${host}api/v1/auth/login/`
    await axios.post(url, { username: login.username, password: login.password })
        .then(response => {
            dispatch({
                type: LOGIN,
                payload: {
                    token: response.data.key,
                    user: response.data.user
                }
            })
        })
        .catch(error => {
            dispatch({ type: FINISH_LOADING })
            alert(Object.values(error.response.data)[0])
            console.log(error)
        })
}


export const logout = () => async (dispatch) => {

    dispatch({ type: START_LOADING })

    let url = `${host}api/v1/auth/logout/`
    await axios.post(url)
        .then(response => {
            console.log(response.data)
            // setTimeout(() => {
                dispatch({
                    type: LOGOUT
                })
            // }, 5000);

        })
        .catch(error => {
            dispatch({ type: FINISH_LOADING })
            console.log(error)
            alert(Object.values(error.response.data)[0])
        })
}


export const getCurrentUser = () => async (dispatch) => {

    let url = `${host}api/v1/users/current/`
    await axios.get(url)
        .then(response => {
            console.log(response)
            dispatch({
                type: GET_CURRENT_USER,
                payload: {
                    user: response.data
                }
            })
        })
        .catch(error => {
            alert(error)
            console.log(error)
            alert(Object.values(error.response.data)[0])
        })
}