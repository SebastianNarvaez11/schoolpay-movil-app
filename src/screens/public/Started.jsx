import React from 'react'
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text, Button } from '@ui-kitten/components';
import { global } from '../../../assets/styles/globalStyles'

const Started = ({ navigation }) => {

    return (
        <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.image} >
            <View style={styles.viewLogo}>
                <Image source={require('../../../assets/img/logosp.png')} style={styles.logo} />
                <Text style={[global.font, { marginTop: '20%', textAlign: "center", color: "white", fontSize: RFPercentage(3) }]}>
                    ¡Hola!, bienvenido a SchoolPay, un sistema diseñado para la gestion de pagos mensuales en las instituciones educativas.
                </Text>
            </View>
            <Button style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={[global.font, { fontSize: 20, color: '#5257f2' }]}>
                    Empecemos
                </Text>
            </Button>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    viewLogo: {
        marginHorizontal: 20,
        padding: 20,
        alignItems: "center"
    },
    logo: {
        height: 160,
        width: 160,
        marginTop: '40%',
    },
    button: {
        marginHorizontal: 50,
        marginTop: '10%',
        borderRadius: 10,
        height: 50,
        backgroundColor: "white",
        borderColor: "white"
    }
});

export default Started