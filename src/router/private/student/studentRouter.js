import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import WaitingScreen from '../../../screens/public/WaitingScreen'
import Home from '../../../screens/private/student/Home'

const Stack = createStackNavigator();

function studentRouter() {

    const { current_user, isLoading } = useSelector(state => state.authReducer)
    const [checking, setChecking] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        // si biene del loguin y ya hay un usuario en el store, no hay necesidad de setear los datos nuevamente, pero si inicia la aplicaion con la sesion ya iniciada
        // si es necesario que haga el seteo de los valores que estan en el asyncStorage
        if (current_user) {
            setChecking(false)
        } else {
            dispatch(setDataUser())
        }

    }, []);


    // este efecto escucha lo cambios del usuario almacenado en el store de redux
    useEffect(() => {
        setChecking(true)

        if (current_user) {
            console.log('estoy esperando')
            console.log(current_user.username)
            setTimeout(() => {
                setChecking(false)
            }, 2000);
        }
    }, [current_user]);



    if (checking || isLoading) {
        return <WaitingScreen />
    }

    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Home} options={({ navigation }) => ({
                headerShown: false
            })} />
        </Stack.Navigator>
    )
}

export default studentRouter
