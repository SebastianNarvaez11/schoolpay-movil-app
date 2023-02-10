import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import Loading from '../../../components/Loading'
import Compromises from '../../../screens/private/admin/Compromises'
import { global } from '../../../../assets/styles/globalStyles'


const Stack = createStackNavigator()

function StackCompromises() {

    const { compromises, isFetchingCompromises } = useSelector(state => state.compromiseReducer)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setChecking(false)
        }, 2000);
    }, [compromises])


    if (checking || isFetchingCompromises) {
        return <Loading text='Cargando Compromisos...' />
    }

    return (
        <Stack.Navigator initialRouteName="Compromisos">
            <Stack.Screen name="Compromisos" component={Compromises} options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'VarelaRound_400Regular',
                }
            })} />
        </Stack.Navigator>
    )
}

export default StackCompromises