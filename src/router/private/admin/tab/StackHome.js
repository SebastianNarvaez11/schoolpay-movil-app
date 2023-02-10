import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../../../screens/private/admin/Home'

const Stack = createStackNavigator()

function StackHome() {
    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Home} options={({ navigation }) => ({
                headerShown: false
            })} />
            
        </Stack.Navigator>
    )
}

export default StackHome