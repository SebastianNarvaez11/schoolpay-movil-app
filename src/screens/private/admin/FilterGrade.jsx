import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, ImageBackground, SafeAreaView, FlatList } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text } from '@ui-kitten/components';
import { global } from '../../../../assets/styles/globalStyles'
import { Chase } from 'react-native-animated-spinkit'
import RNPickerSelect from 'react-native-picker-select';
import CardStudentGrade from '../../../components/CardStudentGrade'
import { filterStudentsGrade, resetStudentSelect } from '../../../redux/actions/studentActions'
import { FontAwesome5 } from '@expo/vector-icons';

const FilterGrade = ({ navigation }) => {

    const { grades } = useSelector(state => state.gradeReducer)
    const { isFetchingStudentForGrade, schedule_select, students_filter_grade } = useSelector(state => state.studentReducer)
    const dispatch = useDispatch()

    const [valueGrade, setValueGrade] = useState(null);
    const [valueSchedule, setValueSchedule] = useState(null);



    const data = () => {
        const data = []
        grades.map(function (grade) {
            const item = { label: `${grade.name}`, value: JSON.stringify(grade) }
            return data.push(item)
        })
        return data
    }


    const selectGrade = (e) => {
        setValueGrade(e)
        const grade = JSON.parse(e)

        if (valueSchedule !== null) {
            dispatch(filterStudentsGrade(grade, parseInt(valueSchedule)))
        }

    }

    const selectSchedule = (e) => {
        setValueSchedule(e)
        const schedule = parseInt(e)

        if (valueGrade !== null) {
            dispatch(filterStudentsGrade(JSON.parse(valueGrade), schedule))
        }
    }

    const renderStudent = ({ item }) => (
        <CardStudentGrade student_full={item} navigation={navigation} />
    );


    return (
        <ImageBackground source={require('../../../../assets/img/bg2.png')} style={styles.confi}>
            {isFetchingStudentForGrade
                ?
                <Chase size={100} color="#ffffff" style={{ flex: 6, alignSelf: 'center' }} />
                :
                <View style={{ flex: 6, justifyContent: 'center', marginTop: '20%' }}>
                    {students_filter_grade.length === 0
                        ?
                        <Text style={[global.font, styles.text]}>
                            Seleccione un grado y una jornada
                        </Text>
                        :
                        <SafeAreaView style={[styles.container]}>
                            <FlatList
                                data={students_filter_grade}
                                renderItem={renderStudent}
                                keyExtractor={item => item.id}
                                fadingEdgeLength={10}
                                showsVerticalScrollIndicator={false}
                            />
                        </SafeAreaView >
                    }
                </View>
            }

            <View style={styles.panel}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30,justifyContent: 'space-around' }}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        value={valueGrade}
                        placeholder={{ label: "Grado", value: null }}
                        style={{
                            inputAndroid: {
                                width: 120,
                                padding: 10,
                                borderColor: '#e4e9f2',
                                borderWidth: 1,
                                borderRadius: 20,
                                fontFamily: 'VarelaRound_400Regular',
                                backgroundColor: '#f7f9fc',
                                color: 'black',
                                fontSize: RFPercentage(2),
                                marginHorizontal: '4%'
                            }
                        }}
                        onValueChange={(value) => selectGrade(value)}
                        items={data()}
                    />
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        value={valueSchedule}
                        placeholder={{ label: "Jornada", value: null }}
                        style={{
                            inputAndroid: {
                                width: 120,
                                padding: 10,
                                borderColor: '#e4e9f2',
                                borderWidth: 1,
                                borderRadius: 20,
                                fontFamily: 'VarelaRound_400Regular',
                                backgroundColor: '#f7f9fc',
                                color: 'black',
                                fontSize: RFPercentage(2)
                            }
                        }}
                        onValueChange={(value) => selectSchedule(value)}
                        items={[
                            { label: 'Mañana', value: '1' },
                            { label: 'Tarde', value: '2' },
                            { label: 'Unica', value: '3' }]}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
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
    title: {
        fontSize: 30,
        marginBottom: 10,
        marginHorizontal: 40,
        alignSelf: 'center',
        color: '#5257f2',
        justifyContent: 'center',
    },
    input: {
        borderRadius: 20,
        fontFamily: 'VarelaRound_400Regular',
        marginHorizontal: 30
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
    container: {
        flex: 1,
        marginTop: '10%',
        marginBottom: 20,
        paddingHorizontal: 20
    },
});



export default FilterGrade
