import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import Graphics from '../../../screens/private/admin/Graphics'
import Loading from '../../../components/Loading'
import { fetchDataGraphics } from '../../../redux/actions/studentActions'

const Stack = createStackNavigator()

function StackGraphics() {

    const { data_graphics, isFetchingData } = useSelector(state => state.studentReducer)
    const [checking, setChecking] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (data_graphics.length === 0) {
            dispatch(fetchDataGraphics())
        }
    }, []);

    useEffect(() => {
        setChecking(false)
    }, [data_graphics])


    if (checking || isFetchingData) {
        return <Loading text='Cargando Estadisticas...' />
    }

    return (
        <Stack.Navigator initialRouteName="Graficos">
            <Stack.Screen name="Graficos" component={Graphics} options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTintColor: '#5e72e4',
                headerTitleStyle: {
                    fontFamily: 'VarelaRound_400Regular',
                },
                title: 'Estadísticas'
            })} />
        </Stack.Navigator>
    )
}

export default StackGraphics