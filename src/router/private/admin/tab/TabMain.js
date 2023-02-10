import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons';
import StackHome from './StackHome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WaitingScreen from '../../../../screens/public/WaitingScreen'
import { fetchGrades } from '../../../../redux/actions/gradeActions'
import { fetchStudents } from '../../../../redux/actions/studentActions'
import { fetchCompromises } from '../../../../redux/actions/compromiseActions'

const Tab = createBottomTabNavigator();

function TabMain() {

    const [checking, setChecking] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGrades())
        dispatch(fetchStudents())
        dispatch(fetchCompromises())
        setChecking(false)
    }, [])


    if (checking) {
        return <WaitingScreen />
    }

    return (
        <Tab.Navigator initialRouteName="Inicio"

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Inicio') {
                        iconName = 'home';
                    } else if (route.name === 'Configuracion') {
                        iconName = focused ? 'cog' : 'cog';
                    }
                    else if (route.name === 'Opciones') {
                        iconName = focused ? 'search' : 'search';
                    }

                    // You can return any component that you like here!
                    return <FontAwesome5 name={iconName} size={20} color={color} />
                },
            })}


            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#5257f2',
                inactiveTintColor: '#dad7e0',
                iconStyle: {
                    height: 5
                },
                style: {
                    backgroundColor: '#ffffff',
                    height: '7%',
                    borderTopColor: '#ffffff'
                },
                keyboardHidesTabBar: true
            }}

        >
            <Tab.Screen name="Opciones" component={StackHome} />
            <Tab.Screen name="Inicio" component={StackHome} />
            <Tab.Screen name="Configuracion" component={StackHome} />
        </Tab.Navigator>
    )
}

export default TabMain