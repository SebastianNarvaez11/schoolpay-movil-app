import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Chase } from 'react-native-animated-spinkit'
import { global } from '../../assets/styles/globalStyles'

const Loading = ({ text }) => {

    return (
        <View style={styles.viewLogo}>
            <Chase size={100} color="#5257f2" style={{ marginTop: 80 }} />
            <Text style={[global.font, { color: '#8f9bb3', marginTop: 20, fontSize: 20 }]}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewLogo: {
        flex: 1,
        backgroundColor:'#ffffff',
        padding: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
});

export default Loading