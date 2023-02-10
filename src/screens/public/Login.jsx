import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Text, Button, Input, Icon } from '@ui-kitten/components';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Formik } from 'formik';
import * as yup from 'yup';
import Loading from '../../components/Loading'
import { global } from '../../../assets/styles/globalStyles'
import { loginUser } from '../../redux/actions/authActions'
import { Chase } from 'react-native-animated-spinkit'

const formSchema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
})

const Login = ({ navigation }) => {

    const { isLoading } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const renderIconUser = (props) => (
        <Icon {...props} name='person' />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                enabled={Platform.OS === "ios" ? true : false}
                style={styles.confi}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            >
                <Image source={require('../../../assets/img/logosp2.png')} style={styles.logo} />

                <Text style={[global.font, styles.title]}>
                    Inicia Sesión Para Continuar!
                </Text>

                <View style={styles.viewForm}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}

                        validationSchema={formSchema}

                        onSubmit={(values, formikBag) => {
                            Keyboard.dismiss()
                            dispatch(loginUser(values))
                            formikBag.setSubmitting(false)
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, isValid, errors, touched }) => (
                            <View>
                                <Input style={styles.input} textStyle={global.font} size='large'
                                    disabled={isLoading}
                                    accessoryRight={renderIconUser}
                                    placeholder='Usuario'
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />

                                {(errors.username && touched.username) &&
                                    <Text style={[global.font, { marginBottom: 3, marginLeft: 15 }]}>{errors.username}</Text>
                                }

                                <Input style={[styles.input, { marginTop: 20 }]} textStyle={global.font} placeholder='Contraseña' size='large'
                                    disabled={isLoading}
                                    accessoryRight={renderIcon}
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />

                                {(errors.password && touched.password) &&
                                    <Text style={[global.font, { marginBottom: 3, marginLeft: 15 }]}>{errors.password}</Text>
                                }

                                <Button style={isLoading || isSubmitting || !isValid ? styles.btnDisable : styles.btn}
                                    onPress={handleSubmit} disabled={isSubmitting || !isValid}>
                                    <Text style={[global.font, { fontSize: 20, color: 'white' }]}>
                                        Ingresar
                                    </Text>
                                </Button>
                            </View>
                        )}
                    </Formik>
                </View>

                <View style={{ marginHorizontal: 30, alignSelf: 'center' }}>
                    {isLoading ?
                        <View style={styles.spinner}>
                            <Chase size={100} color="#5257f2" style={{ marginTop: 80 }} />
                            <Text style={[global.font, { color: '#8f9bb3', marginTop: 20, fontSize: 20 }]}>
                                Iniciando Sesión ...
                            </Text>
                        </View>
                        :
                        < Text style={[global.font, { margin: 70, textAlign: "center", color: '#8f9bb3', fontSize: 20 }]} >
                            ¿Olvidate tu contraseña ? presiona para restablecerla.
                        </Text >
                    }
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    confi: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: RFPercentage(4),
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 40,
        alignSelf: 'center'
    },
    logo: {
        height: '20%',
        width: '35%',
        marginTop: '15%',
        marginLeft: 10,
        alignSelf: 'center'
    },
    viewForm: {
        marginHorizontal: 30,
        marginTop: 30
    },
    input: {
        borderRadius: 20,
        fontFamily: 'VarelaRound_400Regular',
    },
    btn: {
        alignSelf: "center",
        marginTop: 20,
        width: 150,
        backgroundColor: '#5257f2',
        borderColor: '#5257f2',
        borderRadius: 10,
        height: 50,
    },
    btnDisable: {
        alignSelf: "center",
        marginTop: 20,
        width: 150,
        backgroundColor: '#8f9bb3',
        borderColor: '#8f9bb3',
        borderRadius: 10,
        height: 50,
    },
    icons: {
        borderRadius: 10
    },
    spinner: {
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: "center",
        justifyContent: 'center'
    }
});


export default Login



