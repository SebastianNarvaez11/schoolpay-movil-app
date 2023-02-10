import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/actions/authActions'
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

const Home = () => {
    const { current_user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    return (
        <View style={styles.confi}>
            <Text>
                Bienvenido {current_user.username}
            </Text>
            <Button onPress={() => dispatch(logout())}>Salir</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
});

export default Home
