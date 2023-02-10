import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import WaitingScreen from '../screens/public/WaitingScreen'
import PublicRoot from './public/PublicRoot'
import studentRouter from './private/student/studentRouter'
import adminRouter from './private/admin/adminRouter'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { existsTokenStorage } from '../helpers/actions'
import CustomDrawer from '../components/CustomDrawer'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Router() {

    const { current_user } = useSelector(state => state.authReducer) //escucha el cambio en el store para ejecutar nuevamente el useEffect
    const [checking, setChecking] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
        console.log('estoy en router')
        existsTokenStorage(setIsAuthenticated, setChecking, setCurrentUser)
    }, [current_user])

    if (checking) {
        return <WaitingScreen />
    }

    return (
        <NavigationContainer>
            {isAuthenticated ?
                <Drawer.Navigator
                    drawerContent={(props) => <CustomDrawer {...props} />}>

                    {currentUser.type === 1 || 2 ?
                        <Drawer.Screen name='Inicio' component={adminRouter} options={({ navigation }) => ({
                            headerShown: false
                        })} />
                        :
                        <Drawer.Screen name='Inicio' component={studentRouter} options={({ navigation }) => ({
                            headerShown: false
                        })} />
                    }
                </Drawer.Navigator>

                :

                <Stack.Navigator>
                    <Stack.Screen name='Login' component={PublicRoot} options={({ navigation }) => ({
                        headerShown: false
                    })} />
                </Stack.Navigator>

            }
        </NavigationContainer>
    );
}

