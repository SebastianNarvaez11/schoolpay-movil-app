import axios from 'axios'
import { host } from '../../helpers/host.js'

export const START_FETCH_COMPROMISES = 'START_FETCH_COMPROMISES'
export const FINISH_FETCH_COMPROMISES = 'FINISH_FETCH_COMPROMISES'
export const FETCH_COMPROMISES = 'FETCH_COMPROMISES'



export const fetchCompromises = () => async (dispatch) => {

    dispatch({ type: START_FETCH_COMPROMISES })

    let url = `${host}api/v1/payments/compromise/list/`

    await axios.get(url)
        .then(response => {
            dispatch({
                type: FETCH_COMPROMISES,
                payload: {
                    compromises: response.data
                }
            })
        })
        .catch(error => {
            dispatch({ type: FINISH_FETCH_COMPROMISES })
            console.log(error)
            alert(error)
        })
}