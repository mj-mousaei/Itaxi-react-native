import React from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import { colors } from '../helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import API, { Token } from '../api';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../redux/userSlice';
import { useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function RegisterScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const formInitialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [driver, setDriver] = useState(false);
    const formSchemaValidator = Yup.object().shape({
        name: Yup.string().required('Name field is required.'),
        email: Yup.string()
            .required('Email field is required.')
            .email('Please enter a valid email'),
        password: Yup.string().required('Password filed is required'),
        confirmPassword: Yup.string()
            .required('Confirm Password filed is required')
            .oneOf([Yup.ref('password')], 'Passwords does not match.'),
    });

    const handleUserRegistration = (values) => {
        setLoading(true);
        axios
            .post(API.user.register, {
                name: values.name,
                email: values.email,
                password: values.password,
                // userType: driver ? 'driver' : 'passenger'
            })
            .then((response) => {
                Token.set(response.data.token);
                axios
                    .get(API.user.me(response.data.token))
                    .then((response) => {
                        dispatch(setUser(response.data.decode));
                        dispatch(setAuth('VALID'));
                        navigation.navigate('Drawer', { screen: 'Home' });
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                    .finally(() => setLoading(false));
            })
            .catch((e) => {
                console.log(e);
            }).finally(() => setLoading(false));
    };

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/images/bg.jpg')}
                    style={styles.screenWrapper}
                >
                    <View style={styles.logoWrapper}>
                        <Logo />
                        <Text style={styles.screenTitle}>
                            Register a new account
                        </Text>
                    </View>
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={handleUserRegistration}
                        validationSchema={formSchemaValidator}
                    >
                        {({
                            handleChange,
                            touched,
                            setFieldTouched,
                            handleSubmit,
                            values,
                            errors,
                        }) => (
                            <React.Fragment>
                                <Input
                                    placeholder="Enter your name"
                                    inputWrapperStyle={{ marginBottom: 16 }}
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    value={values.name}
                                    error={errors.name}
                                    errorVisible={touched.name}
                                />
                                <Input
                                    placeholder="Enter your email"
                                    inputWrapperStyle={{ marginBottom: 16 }}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    error={errors.email}
                                    errorVisible={touched.email}
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    caretHidden={false}
                                />
                                <Input
                                    placeholder="Enter your password"
                                    inputWrapperStyle={{ marginBottom: 16 }}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                    error={errors.password}
                                    errorVisible={touched.password}
                                    secureTextEntry
                                />
                                <Input
                                    placeholder="Confirn your password"
                                    inputWrapperStyle={{ marginBottom: 16 }}
                                    onChangeText={handleChange(
                                        'confirmPassword'
                                    )}
                                    onBlur={() =>
                                        setFieldTouched('confirmPassword')
                                    }
                                    value={values.confirmPassword}
                                    error={errors.confirmPassword}
                                    errorVisible={touched.confirmPassword}
                                    secureTextEntry
                                />
                                <BouncyCheckbox
                                    size={30}
                                    fillColor={colors.primary}
                                    unfillColor="#FFFFFF"
                                    text="Are you driver ?"
                                    style={{ marginBottom: 16 }}
                                    iconStyle={{ borderColor: colors.primary }}
                                    textStyle={{ color: colors.white }}
                                    onPress={(status) => setDriver(status)}
                                    isChecked={driver}
                                />
                                <Button
                                    text="Register"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </React.Fragment>
                        )}
                    </Formik>
                    <Text
                        style={styles.helperText}
                        onPress={() => navigation.navigate('Login')}
                    >
                        You have an account ? Login here.
                    </Text>
                </ImageBackground>
            </SafeAreaView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    logoWrapper: {
        alignItems: 'center',
        marginBottom: 24,
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 16,
        color: colors.white,
    },
    helperText: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 24,
    },
});
