import { getData, setData } from './asyncStorage'
import { TOKEN_KEY, CURRENT_USER } from '../redux/actions/authActions'


export const existsTokenStorage = async (setIsAuthenticated, setChecking, setCurrentUser) => {
    const token = await getData(TOKEN_KEY)
    const user = await getData(CURRENT_USER)
    if (token) {
        setCurrentUser(JSON.parse(user))
        setIsAuthenticated(true)
        setChecking(false)
    } else {
        console.log('no hay token en asyncStorage')
        setIsAuthenticated(false)
        setChecking(false)
    }
}


