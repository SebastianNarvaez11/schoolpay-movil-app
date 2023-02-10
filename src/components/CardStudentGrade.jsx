import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text, Button } from '@ui-kitten/components';
import { global } from '../../assets/styles/globalStyles'
import NumberFormat from 'react-number-format';
import { FontAwesome5 } from '@expo/vector-icons';
import CircleProgressSmal from './CircleProgressSmal'

const CardStudentGrade = ({ navigation, student_full }) => {

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
                <View style={{ flexDirection: 'row' }}>
                    <CircleProgressSmal student={student_full.student} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[global.font, { fontSize: RFPercentage(2.5), flexDirection: 'column' }]}>
                            {(student_full.last_name + " " + student_full.first_name).length < 23
                                ?
                                student_full.last_name + " " + student_full.first_name
                                :
                                student_full.last_name + `${'\n'}` + student_full.first_name
                            }
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View >
                                <Text style={[global.font, { color: '#a8a9ae', textAlignVertical: 'center', fontSize: RFPercentage(2) }]}>Mes(es) en mora:</Text>
                                <Text style={[global.font, { fontSize: RFPercentage(3) }]}>{renderIcons()} {student_full.student.monthOwed}</Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={[global.font, { color: '#a8a9ae', textAlignVertical: 'center',  fontSize: RFPercentage(2) }]}>Valor en mora:</Text>
                                <NumberFormat
                                    renderText={text => <Text style={[global.font, { fontSize: RFPercentage(3) }]}>
                                        <FontAwesome5 name="dollar-sign" size={20} color="#6eb561" /> {text} </Text>}
                                    value={student_full.student.amountOwed}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={''} />
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default CardStudentGrade
