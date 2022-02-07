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
import { authStatus, colors } from '../helpers';
import * as Yup from 'yup';
import API, { Token } from '../api';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuth, setUser } from '../redux/userSlice';
import { Formik } from 'formik';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const formInitialValues = {
        email: '',
        password: '',
    };
    const formSchemaValidator = Yup.object().shape({
        email: Yup.string()
            .required('Email field is required.')
            .email('Please enter a valid email'),
        password: Yup.string().required('Password filed is required'),
    });
    const handleUseLogin = (values) => {
        setLoading(true);
        axios
            .post(API.user.login, {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                Token.set(response.data['x-auth-token']);
                axios
                    .get(API.user.me(response.data['x-auth-token']))
                    .then((response) => {
                        dispatch(setUser(response.data.decode));
                        dispatch(setAuth(authStatus.valid));
                        navigation.navigate('Drawer', { screen: 'Home' });
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            })
            .catch((e) => {
                console.log(e);
            }).finally(() => setLoading(false));;
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
                            Login to your account
                        </Text>
                    </View>
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={handleUseLogin}
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
                                <Button
                                    text="Login"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </React.Fragment>
                        )}
                    </Formik>
                    <Text
                        style={styles.helperText}
                        onPress={() => navigation.navigate('Register')}
                    >
                        You dont have account ? Register here.
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
        color: colors.white,
        marginTop: 24,
    },
});
