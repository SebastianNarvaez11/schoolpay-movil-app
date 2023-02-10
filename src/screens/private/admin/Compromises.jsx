import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, ImageBackground, SafeAreaView, View, FlatList } from 'react-native'
import { global } from '../../../../assets/styles/globalStyles'
import CardCompromise from '../../../components/CardCompromise'
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome5 } from '@expo/vector-icons';

const Compromises = ({ navigation }) => {

    const { compromises } = useSelector(state => state.compromiseReducer)



    const renderCompromise = ({ item }) => (
        <CardCompromise compromise={item} navigation={navigation} />
    );

    return (
        <ImageBackground source={require('../../../../assets/img/bg2.png')} style={styles.confi}>
            <View style={{ justifyContent: 'center', marginTop: '25%', flex: 6 }}>
                {compromises.length === 0
                    ?
                    <Text style={[global.font, styles.text]}>
                        No hay compromisos para mostrar
                    </Text>
                    :
                    <SafeAreaView style={[styles.container]}>
                        <FlatList
                            data={compromises}
                            renderItem={renderCompromise}
                            keyExtractor={item => item.id}
                            fadingEdgeLength={10}
                            showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView >
                }
            </View>

            <View style={styles.panel}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[global.font, { fontSize: RFPercentage(2), color: '#a8a9ae' }]}>
                            Pendientes:
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name="clock" size={20} color="#faad14" />
                            <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                {compromises.filter(compromise => compromise.state === 1).length}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[global.font, { fontSize: RFPercentage(2), color: '#a8a9ae' }]}>
                            Cumplidos:
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name="check" size={20} color="#2dce89" />
                            <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                {compromises.filter(compromise => compromise.state === 3).length}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[global.font, { fontSize: RFPercentage(2), color: '#a8a9ae' }]}>
                            Incumplidos:
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name="exclamation-circle" size={20} color="#f5232e" />
                            <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                {compromises.filter(compromise => compromise.state === 2).length}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
    },
    container: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 25,
        marginTop: '40%',
        marginBottom: 10,
        marginHorizontal: 40,
        alignSelf: 'center',
        color: '#ffffff',
        textAlign: 'center'
    },
    panel: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
});


export default Compromises
