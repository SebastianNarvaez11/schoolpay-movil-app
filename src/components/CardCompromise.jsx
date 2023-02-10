import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text, Button } from '@ui-kitten/components';
import { global } from '../../assets/styles/globalStyles'
import NumberFormat from 'react-number-format';
import { FontAwesome5 } from '@expo/vector-icons';

const CardCompromise = ({ navigation, compromise }) => {

    const renderIcons = () => {

        if (compromise.state === 1) {
            return <FontAwesome5 name="clock" size={30} color="#faad14" />
        }
        else if (compromise.state === 2) {
            return <FontAwesome5 name="exclamation-circle" size={30} color="#f5232e" />
        }
        else if (compromise.state === 3) {
            return <FontAwesome5 name="check" size={30} color="#2dce89" />
        }
    }


    return (
        <Pressable >
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    {renderIcons()}
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[global.font, { fontSize: RFPercentage(2.5), flexDirection: 'column' }]}>
                            {(compromise.student.user.last_name + " " + compromise.student.user.first_name).length < 23
                                ?
                                compromise.student.user.last_name + " " + compromise.student.user.first_name
                                :
                                compromise.student.user.last_name + `${'\n'}` + compromise.student.user.first_name
                            }
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View >
                                <Text style={[global.font, { color: '#a8a9ae', textAlignVertical: 'center', fontSize: RFPercentage(2) }]}>Fecha estipulada:</Text>
                                <Text style={[global.font, { fontSize: RFPercentage(2.5) }]}>{compromise.date_pay}</Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={[global.font, { color: '#a8a9ae', textAlignVertical: 'center',  fontSize: RFPercentage(2) }]}>Valor a pagar:</Text>
                                <NumberFormat
                                    renderText={text => <Text style={[global.font, { fontSize: RFPercentage(2.5) }]}>
                                        <FontAwesome5 name="dollar-sign" size={20} color="#6eb561" /> {text} </Text>}
                                    value={compromise.value}
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

export default CardCompromise
