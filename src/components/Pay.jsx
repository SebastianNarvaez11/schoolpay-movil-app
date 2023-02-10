import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { RFPercentage } from "react-native-responsive-fontsize";
import { global } from '../../assets/styles/globalStyles'


const Pay = ({ value, description, create }) => (
    <View style={styles.card}>
        <FontAwesome5 name="money-bill-alt" size={24} color="#2dce89" />
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
                <NumberFormat
                    style={{ justifyContent: 'center' }}
                    renderText={text => <Text style={[global.font, { fontSize: RFPercentage(3) }]}> {text} </Text>}
                    value={value}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                />
                <View style={{ marginLeft: '15%' }}>
                    <Text style={[global.font, { fontSize: RFPercentage(2), color: '#a8a9ae', padding: 2, borderRadius: 5 }]}>
                        {create}
                    </Text>
                </View>
            </View>

            <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                {description}
            </Text>
        </View>

    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        textAlignVertical: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 15,
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

export default Pay
