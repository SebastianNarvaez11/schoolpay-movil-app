import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Keyboard, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text, Button } from '@ui-kitten/components';
import { FontAwesome5 } from '@expo/vector-icons';
import { initialCharge } from '../../../helpers/functions'
import NumberFormat from 'react-number-format';
import CircleProgressGiant from '../../../components/CircleProgressGiant'
import Pay from '../../../components/Pay'
import { global } from '../../../../assets/styles/globalStyles'



const DetailStudent = ({ route }) => {
    const { student_full } = route.params
    const dispatch = useDispatch()

    useEffect(() => {
        Keyboard.dismiss()
    }, [])

    const renderIcons = () => {
        const n = student_full.student.monthOwed
        const e = student_full.student.amountOwed

        if (n >= 3) {
            return <FontAwesome5 name="exclamation-circle" size={24} color="#f5365c" />
        }
        else if (n >= 1 || e !== 0) {
            return <FontAwesome5 name="exclamation-triangle" size={22} color="#faad14" />
        }
        else if (n === 0) {
            return <FontAwesome5 name="check" size={24} color="#2dce89" />
        }
    }


    const renderPay = ({ item }) => (
        <Pay value={item.value} description={item.description} create={item.create} />
    );

    return (
        <ImageBackground source={require('../../../../assets/img/bg2.png')} style={styles.confi}>
            <View style={styles.card_top}>
                <View style={{ padding: 10, marginBottom: 20 }}>
                    <Text style={[global.font, { fontSize: RFPercentage(3), textAlign: 'center' }]}>{student_full.last_name + `${'\n'}` + student_full.first_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CircleProgressGiant student={student_full.student} />
                    <View style={{marginLeft: 10}}>
                        <Text style={[global.font, { fontSize: RFPercentage(2.5), color: '#a8a9ae' }]}>Meses en Mora:</Text>
                        <Text style={[global.font, { fontSize: RFPercentage(4) }]}>
                            {renderIcons()} {student_full.student.monthOwed}{' '}
                            <Text style={[global.font, { fontSize: RFPercentage(2.5), marginTop: 10, color: '#a8a9ae' }]}>
                                Mes(es)
                        </Text>
                        </Text>

                        <Text style={[global.font, { fontSize: RFPercentage(2.5), marginTop: 20, color: '#a8a9ae' }]}>Valor en Mora:</Text>
                        <NumberFormat
                            renderText={text => <Text style={[global.font, { fontSize: RFPercentage(4) }]}><FontAwesome5 name="dollar-sign" size={24} color="#6eb561" /> {text} </Text>}
                            value={student_full.student.amountOwed}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''} />

                        <Text style={[global.font, { fontSize: RFPercentage(2.5), marginTop: 20, color: '#a8a9ae' }]}>Periodo de Cobro:</Text>
                        <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                            <FontAwesome5 name="calendar-check" size={24} color="#5257f2" /> {initialCharge(student_full.student.initial_charge)}
                        </Text>
                    </View>
                </View>
                <View style={styles.card_info}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={[global.font, { fontSize: RFPercentage(2.5), color: '#a8a9ae' }]}>Descuento:</Text>
                            <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                                <FontAwesome5 name="tag" size={20} color="#ffe289" /> {student_full.student.discount}%
                            </Text>
                        </View>

                        <View>
                            <Text style={[global.font, { fontSize: RFPercentage(2.5), color: '#a8a9ae' }]}>Valor mensual:</Text>
                            <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                                <FontAwesome5 name="dollar-sign" size={20} color="#6eb561" />
                                <NumberFormat
                                    renderText={text => <Text style={[global.font, { fontSize: RFPercentage(3) }]}> {text} </Text>}
                                    value={student_full.student.monthly_payment}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
            <Text style={[global.font, { marginHorizontal: 30, marginTop: '5%', color: '#ffffff', fontSize: RFPercentage(2.5) }]}>Pagos realizados:</Text>
            {student_full.student.payments.length > 0 ?

                <SafeAreaView style={[styles.container]}>
                    <FlatList
                        data={student_full.student.payments}
                        renderItem={renderPay}
                        keyExtractor={item => item.id}
                        fadingEdgeLength={10}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView >
                :
                <Text style={[global.font, { alignSelf: 'center', marginTop: '10%', color: '#ffffff' }]}>No hay pagos</Text>
            }



        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: '5%',
        marginBottom: 20
    },
    card_top: {
        paddingHorizontal: 30,
        paddingTop: '10%',
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    card_info: {
        borderTopColor: '#dad7e0',
        borderTopWidth: 1,
        paddingTop: 15,
        marginTop: 10,
        marginBottom: 15,
    }
});

export default DetailStudent
