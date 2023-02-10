import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { global } from '../../assets/styles/globalStyles'
import { RFPercentage } from "react-native-responsive-fontsize";
import CircleProgress from './CircleProgress'
import NumberFormat from 'react-number-format';
import { FontAwesome5 } from '@expo/vector-icons';
import { initialCharge } from '../helpers/functions'

const CardFilter = ({ navigation, student_full }) => {


    const renderIcons = () => {
        const n = student_full.student.monthOwed
        const e = student_full.student.amountOwed

        if (n >= 3) {
            return <FontAwesome5 name="exclamation-circle" size={20} color="#f5365c" />
        }
        else if (n >= 1 || e !== 0) {
            return <FontAwesome5 name="exclamation-triangle" size={20} color="#faad14" />
        }
        else if (n === 0) {
            return <FontAwesome5 name="check" size={20} color="#2dce89" />
        }
    }

    return (
        <Pressable onPress={() => navigation.navigate('DetalleEstudiante', { student_full })}  >
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[global.font, { fontSize: RFPercentage(2), marginTop: 10, color: '#a8a9ae' }]}>Meses en Mora:</Text>
                        <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                            {renderIcons()} {student_full.student.monthOwed}{' '}
                            <Text style={[global.font, { fontSize: RFPercentage(2), marginTop: 10, color: '#a8a9ae' }]}>
                                Mes(es)
                            </Text>
                        </Text>

                        <Text style={[global.font, { fontSize: RFPercentage(2), marginTop: 20, color: '#a8a9ae' }]}>Valor en Mora:</Text>
                        <NumberFormat
                            renderText={text => <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                                <FontAwesome5 name="dollar-sign" size={24} color="#6eb561" /> {text} </Text>}
                            value={student_full.student.amountOwed}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={''} />

                    

                    </View>
                    <CircleProgress student={student_full.student} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[global.font, { fontSize: RFPercentage(2), marginTop: 20, color: '#a8a9ae' }]}>Descuento Mensual:</Text>
                        <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                            <FontAwesome5 name="tag" size={24} color="#ffe289" /> {student_full.student.discount} %
                        </Text>
                    </View>
                    <Text style={[global.font, { fontSize: RFPercentage(4), textAlignVertical: 'bottom' }]}>
                        {student_full.student.code}
                    </Text>
                </View>

                <View style={{ borderTopColor: '#dad7e0', borderTopWidth: 1, padding: 10, marginTop: 20 }}>
                    <Text style={[global.font, { fontSize: RFPercentage(2.5), textAlign: 'center' }]}>{student_full.last_name + `${'\n'}` + student_full.first_name}</Text>
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20,
        marginTop: '-5%',
        marginHorizontal: '4%',
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

export default CardFilter
