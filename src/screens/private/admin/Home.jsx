import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { DrawerActions } from '@react-navigation/native';
import { Text, Button } from '@ui-kitten/components';
import { global } from '../../../../assets/styles/globalStyles'
import { FontAwesome5 } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const { current_user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    return (
        <View style={styles.confi}>
            <View style={{ flex: 1, marginHorizontal: 30, marginTop: '15%', marginBottom: '15%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ backgroundColor: '#f3f6ff', width: 40, padding: 5, borderRadius: 10, alignItems: 'center' }} >
                            <FontAwesome5 name="bars" size={24} color="#5257f2" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                        </View>
                        <Text style={[global.font, { fontSize: RFPercentage(3), marginTop: 30, color: '#a2b1c7' }]}>Bienvenido</Text>
                        <Text style={[global.font, { fontSize: RFPercentage(5), }]}>{current_user.first_name}</Text>
                    </View>
                    <View>
                        <Image source={require('../../../../assets/img/colegio.png')} style={styles.logo} />
                    </View>
                </View>
            </View>
            <SafeAreaView style={{ flex: 3, marginHorizontal: 30 }}>
                <ScrollView style={{ marginBottom: '2%' }} fadingEdgeLength={10}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Estudiantes')}>
                            <ImageBackground source={require('../../../../assets/img/bg-green.png')} style={styles.bg} imageStyle={{ borderRadius: 15 }}>
                                <View style={{ backgroundColor: '#ffffff', width: 40, alignItems: 'center', padding: 5, borderRadius: 10 }}>
                                    <FontAwesome5 name="user-graduate" size={25} color="#1ccd9d" />
                                </View>
                                <Text style={[global.font, { fontSize: RFPercentage(2), color: '#9bf4dc', marginTop: 20 }]}>Estado Financiero{"\n"}Detallado Por: </Text>
                                <Text style={[global.font, { fontSize: RFPercentage(3), color: '#ffffff', marginTop: 10 }]}>Estudiante</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Grados')}>
                            <ImageBackground source={require('../../../../assets/img/bg-blue.png')} style={styles.bg} imageStyle={{ borderRadius: 15 }}>
                                <View style={{ backgroundColor: '#ffffff', width: 40, alignItems: 'center', padding: 5, borderRadius: 10 }}>
                                    <FontAwesome5 name="users" size={25} color="#5257f2" />
                                </View>
                                <Text style={[global.font, { fontSize: RFPercentage(2), color: '#859fff', marginTop: 20 }]}>Mira el Estado{"\n"}Financiero por: </Text>
                                <Text style={[global.font, { fontSize: RFPercentage(3), color: '#ffffff', marginTop: 10 }]}>Grados</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        {current_user.type === 1 &&
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Graficos')}>
                                <ImageBackground source={require('../../../../assets/img/bg-red.png')} style={styles.bg} imageStyle={{ borderRadius: 15 }}>
                                    <View style={{ backgroundColor: '#ffffff', width: 40, alignItems: 'center', padding: 5, borderRadius: 10 }}>
                                        <FontAwesome5 name="chart-pie" size={25} color="#ff6951" />
                                    </View>
                                    <Text style={[global.font, { fontSize: RFPercentage(2), color: '#ffa89b', marginTop: 20 }]}>Estado{"\n"}General: </Text>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), color: '#ffffff', marginTop: 10 }]}>Estadísticas</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Compromisos')}>
                            <ImageBackground source={require('../../../../assets/img/bg-yellow.png')} style={styles.bg} imageStyle={{ borderRadius: 15 }}>
                                <View style={{ backgroundColor: '#ffffff', width: 40, alignItems: 'center', padding: 5, borderRadius: 10 }}>
                                    <FontAwesome5 name="calendar-check" size={25} color="#fcaf2a" />
                                </View>
                                <Text style={[global.font, { fontSize: RFPercentage(2), color: '#fed694', marginTop: 20 }]}>Haz seguimiento{"\n"}Continuo: </Text>
                                <Text style={[global.font, { fontSize: RFPercentage(3), color: '#ffffff', marginTop: 10 }]}>Acuerdos</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    card: {
        width: '48%',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bg: {
        padding: 10,
        borderRadius: 25,
    },
    logo: {
        height: 99,
        width: 100
    }
});

export default Home
