import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'
import { LOGIN, LOGOUT, TOKEN_KEY, CURRENT_USER } from './actions/authActions'
import { setData, delData } from '../helpers/asyncStorage'
import { composeWithDevTools } from 'redux-devtools-extension'


const customMiddleware = store => next => async (action) => {
    switch (action.type) {
        case LOGIN:
            // PERSISTENCIA DEL TOKEN Y EL USUARIO
            await setData(TOKEN_KEY, action.payload.token)
            await setData(CURRENT_USER, JSON.stringify(action.payload.user))
            return next(action);

        case LOGOUT:
            // SE REMUEVE LA PERSITENCIA
            await delData(TOKEN_KEY)
            await delData(CURRENT_USER)
            return next(action);


        default:
            next(action);
    }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, customMiddleware)))

export default store