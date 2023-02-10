import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import FilterGrade from '../../../screens/private/admin/FilterGrade'
import Loading from '../../../components/Loading'

const Stack = createStackNavigator()

function StackFilterGrades() {

    const { grades, isFetchGrades } = useSelector(state => state.gradeReducer)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        setChecking(false)
    }, [grades])


    if (checking || isFetchGrades) {
        return <Loading text='Cargando Grados...' />
    }

    return (
        <Stack.Navigator initialRouteName="Filtro_Grados">
            <Stack.Screen name="Filtro_Grados" component={FilterGrade} options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitleStyle : {
                    fontFamily: 'VarelaRound_400Regular',
                },
                title: 'Grados'
            })} />
        </Stack.Navigator>
    )
}

export default StackFilterGrades