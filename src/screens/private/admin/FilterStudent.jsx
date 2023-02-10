import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import CardFilter from '../../../components/CardFilter'
import { Text, Button, Icon, Input, ViewPager } from '@ui-kitten/components';
import { global } from '../../../../assets/styles/globalStyles'
import { filterStudents, getStudentsFull, resetStudentSelect } from '../../../redux/actions/studentActions'
import { Chase } from 'react-native-animated-spinkit'
import { FontAwesome5 } from '@expo/vector-icons';

const FilterStudent = ({ navigation }) => {

    const { students_select, students_full, isFetchStudentsFull } = useSelector(state => state.studentReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStudentsFull(students_select))
    }, [students_select])


    const [selectedIndex, setSelectedIndex] = useState(0);


    const renderIconUser = (props) => (
        <Icon {...props} name='search' />
    );


    const handleFilter = (text) => {
        dispatch(filterStudents(text))
    }

    return (
        <ImageBackground source={require('../../../../assets/img/bg2.png')} style={styles.confi}>
            {isFetchStudentsFull
                ?
                <Chase size={100} color="#ffffff" style={{ flex: 6, alignSelf: 'center' }} />
                :
                <View style={{ flex: 6, justifyContent: 'center', marginHorizontal: 40, marginTop: '10%' }}>
                    {students_full.length === 0
                        ?
                        <Text style={[global.font, styles.text]}>
                            Digite el nombre o el codigo del estudiante
                        </Text>
                        :
                        <ViewPager
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}>
                            {students_full.map((student, index) =>
                                <CardFilter key={index} navigation={navigation} student_full={student} />
                            )}
                        </ViewPager>
                    }
                </View>
            }

            <View style={styles.panel}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, justifyContent: 'center', }}>
                    <Input style={styles.input} textStyle={[global.font, { fontSize: RFPercentage(2) }]} size='large'
                        accessoryRight={renderIconUser}
                        placeholder='Ingresa el codigo o el nombre'
                        onChangeText={handleFilter}
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
        justifyContent: 'center',
        backgroundColor: '#ffffff',
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
        fontSize: RFPercentage(3),
        marginBottom: 10,
        marginHorizontal: 40,
        alignSelf: 'center',
        color: '#5257f2',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        borderRadius: 20,
        fontFamily: 'VarelaRound_400Regular',
        marginHorizontal: '5%',
        marginVertical: '5%',
        fontSize: RFPercentage(2)
    },
    text: {
        fontSize: RFPercentage(3),
        marginTop: '40%',
        marginBottom: 10,
        marginHorizontal: 40,
        alignSelf: 'center',
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default FilterStudent
