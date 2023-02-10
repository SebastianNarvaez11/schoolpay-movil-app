import React from 'react'
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Chase } from 'react-native-animated-spinkit'

const WaitingScreen = () => {

    return (
        <ImageBackground source={require('../../../assets/img/bg.png')} style={styles.image} >
            <View style={styles.viewLogo}>
                <Image source={require('../../../assets/img/logosp.png')} style={styles.logo} />
                <Chase size={100} color="white" style={{ marginTop: 80 }} />
            </View>
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
        marginTop: '30%',
    },
});

export default WaitingScreen