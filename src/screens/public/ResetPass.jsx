import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

const ResetPass = () => {
    return (
        <View style={styles.confi}>
            <Text>
                Cambiar contraseña
            </Text>
            <Button>Ingresar</Button>
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


export default ResetPass
