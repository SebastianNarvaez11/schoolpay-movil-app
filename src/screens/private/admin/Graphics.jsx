import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, ImageBackground, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import { Text as TextPie } from 'react-native-svg'
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { RFPercentage } from "react-native-responsive-fontsize";
import { global } from '../../../../assets/styles/globalStyles'

const Graphics = () => {
    const { data_graphics, students } = useSelector(state => state.studentReducer)

    const en_mora = data_graphics.filter(data => data.student.monthOwed !== 0).length
    const al_dia = data_graphics.filter(data => data.student.monthOwed === 0).length
    const un_mes = data_graphics.filter(data => data.student.monthOwed === 1).length
    const dos_meses = data_graphics.filter(data => data.student.monthOwed === 2).length
    const tres_meses = data_graphics.filter(data => data.student.monthOwed >= 3).length
    const cobertura = students.length - en_mora - al_dia
    const total_estudiantes = en_mora + al_dia


    const [select, setSelect] = useState({
        selectedSlice: {
            label: '',
            value: 0
        },
        labelWidth: 0
    })

    const { labelWidth, selectedSlice } = select;
    const { label, value } = selectedSlice;
    const keys = ['Al Dia', '1 Mes', '2 Meses', '3 o Mas'];
    const values = [al_dia, un_mes, dos_meses, tres_meses];
    const colors = ['#2ece89', '#faad15', '#ff7042', '#f5242f']
    const data = keys.map((key, index) => {
        return {
            key,
            value: values[index],
            svg: { fill: colors[index] },
            arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
            onPress: () => setSelect({ selectedSlice: { label: key, value: values[index] } })
        }
    })

    const deviceWidth = Dimensions.get('window').width

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <TextPie
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={15}
                    fontFamily="VarelaRound_400Regular"
                >
                    {(data.value * 100 / total_estudiantes).toFixed()}%
                </TextPie>
            )
        })
    }

    const renderIcons = () => {
        if (select.selectedSlice.label == 'Al Dia') {
            return (
                <View style={[styles.icon, { backgroundColor: '#2dce89' }]}>
                    <FontAwesome5 name="check" size={30} color="#ffffff" />
                </View>
            )
        } else if (select.selectedSlice.label === '1 Mes') {
            return (
                <View style={[styles.icon, { backgroundColor: '#faad15' }]}>
                    <FontAwesome5 name="exclamation-triangle" size={30} color="#ffffff" />
                </View>
            )
        } else if (select.selectedSlice.label === '2 Meses') {
            return (
                <View style={[styles.icon, { backgroundColor: '#ff7042', }]}>
                    <FontAwesome5 name="exclamation-circle" size={30} color="#ffffff" />
                </View>
            )
        } else if (select.selectedSlice.label === '3 o Mas') {
            return (
                <View style={[styles.icon, { backgroundColor: '#f5242f' }]}>
                    <FontAwesome5 name="radiation-alt" size={30} color="#ffffff" />
                </View>
            )
        }
    }

    return (
        <ImageBackground source={require('../../../../assets/img/bg-black.png')} style={styles.confi}>
            <SafeAreaView style={{ flex: 1, paddingTop: '5%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {select.selectedSlice.label !== '' &&
                        <View style={[styles.card, { alignSelf: 'flex-end', marginTop: '1%' }]}>
                            {renderIcons()}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    {select.selectedSlice.label}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {select.selectedSlice.value}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }

                    <PieChart
                        style={{ height: 400, marginTop: '-5%', marginBottom: '-10%' }}
                        outerRadius={'30%'}
                        innerRadius={'10%'}
                        data={data}
                        valueAccessor={({ item }) => item.value}
                    >
                        <Labels />
                    </PieChart>


                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                        <View style={styles.card}>
                            <View style={[styles.icon, { backgroundColor: '#2dce89' }]}>
                                <FontAwesome5 name="check" size={30} color="#ffffff" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    Al Día :
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {al_dia}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={styles.card}>
                            <View style={[styles.icon, { backgroundColor: '#faad15' }]}>
                                <FontAwesome5 name="exclamation-triangle" size={30} color="#ffffff" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    1 Mes :
                        </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {un_mes}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={[styles.icon, { backgroundColor: '#ff7042', }]}>
                                <FontAwesome5 name="exclamation-circle" size={30} color="#ffffff" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    2 Meses:
                        </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {dos_meses}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={styles.card}>
                            <View style={[styles.icon, { backgroundColor: '#f5242f' }]}>
                                <FontAwesome5 name="radiation-alt" size={30} color="#ffffff" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    3 ó Mas :
                        </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {tres_meses}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={[styles.icon, { backgroundColor: '#11cdef', }]}>
                                <FontAwesome5 name="certificate" size={30} color="#ffffff" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                    Cobertura:
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                        {cobertura}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.card, { alignSelf: 'flex-end', marginTop: '10%', width: '45%' }]}>
                        <View style={[styles.icon, { backgroundColor: '#f5242f', }]}>
                            <FontAwesome5 name="exclamation-circle" size={30} color="#ffffff" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[global.font, { fontSize: RFPercentage(2), marginLeft: 10, color: '#a8a9ae' }]}>
                                Total En Mora:
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[global.font, { fontSize: RFPercentage(3), marginLeft: 10 }]}>
                                    {en_mora}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
        paddingTop: '15%',
        backgroundColor: '#ffffff'
    },
    card: {
        backgroundColor: '#ffffff',
        textAlignVertical: 'center',
        flexDirection: 'row',
        width: '35%',
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
        elevation: 2,
    },
    icon: {
        padding: '5%',
        borderRadius: 10,
        alignSelf: 'center',
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


export default Graphics
