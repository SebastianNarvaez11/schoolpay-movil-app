import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import DetailStudent from '../../../screens/private/admin/DetailStudent'
import WaitingScreen from '../../../screens/public/WaitingScreen'
import TabMain from './tab/TabMain'
import { setDataUser } from '../../../redux/actions/authActions'
import StackFilterStudent from './StackFilterStudent'
import StackFilterGrades from './StackFilterGrades'
import StackGraphics from './StackGraphics'
import StackCompromises from './StackCompromises'

const Stack = createStackNavigator();

function adminRouter() {

    const { current_user, isLoading } = useSelector(state => state.authReducer)
    const [checking, setChecking] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        // si viene del loguin y ya hay un usuario en el store, no hay necesidad de setear los datos nuevamente, pero si inicia la aplicaion con la sesion ya iniciada
        // el store de redux va estar vacio  entonces 
        // si es necesario que haga el seteo de los valores que estan en el asyncStorage
        if (current_user) {
            setChecking(false)
        } else {
            dispatch(setDataUser())
        }
    }, []);


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
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={TabMain} options={({ navigation }) => ({
                headerShown: false
            })} />

            <Stack.Screen name="Estudiantes" component={StackFilterStudent} options={({ navigation }) => ({
                headerShown: false,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitle: false,
            })} />

            <Stack.Screen name="DetalleEstudiante" component={DetailStudent} options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTitle: false,
                headerTintColor: '#5257f2',
            })} />

            <Stack.Screen name="Grados" component={StackFilterGrades} options={({ navigation }) => ({
                headerShown: false,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitle: false,
            })} />

            <Stack.Screen name="Compromisos" component={StackCompromises} options={({ navigation }) => ({
                headerShown: false,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitle: false,
            })} />

            <Stack.Screen name="Graficos" component={StackGraphics} options={({ navigation }) => ({
                headerShown: false,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitle: false,
            })} />

        </Stack.Navigator>
    )
}

export default adminRouter
