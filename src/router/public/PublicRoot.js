import React from 'react'
import Login from '../../screens/public/Login'
import ResetPass from '../../screens/public/ResetPass'
import Started from '../../screens/public/Started'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();

function PublicRoot() {
    return (
        <Stack.Navigator initialRouteName="Started" >
            <Stack.Screen name="Started" component={Started} options={({ navigation }) => ({
                headerShown: false
            })} />

            <Stack.Screen name="Login" component={Login} options={({ navigation }) => ({
                headerShown: false
            })} />
            <Stack.Screen name="ResetPass" component={ResetPass} />
        </Stack.Navigator>
    )
}

export default PublicRoot