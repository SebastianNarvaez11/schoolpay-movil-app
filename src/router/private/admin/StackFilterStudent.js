import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import FilterStudent from '../../../screens/private/admin/FilterStudent'
import Loading from '../../../components/Loading'

const Stack = createStackNavigator()

function StackFilterStudent() {

    const { students, isFetching } = useSelector(state => state.studentReducer)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        setChecking(false)
    }, [students])


    if (checking || isFetching) {
        return <Loading text='Cargando Estudiantes...' />
    }

    return (
        <Stack.Navigator initialRouteName="Filtro_Estudiantes">
            <Stack.Screen name="Filtro_Estudiantes" component={FilterStudent} options={({ navigation }) => ({
                headerShown: false
            })} />
        </Stack.Navigator>
    )
}

export default StackFilterStudent