import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import taxiImage from '../assets/images/taxi.png';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import { colors } from '../helpers';
import { userSelector } from '../redux/userSlice';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import API from '../api';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({ navigation }) {
    const user = useSelector(userSelector);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const formInitialValues = {
        name: user.name,
        email: user.email,
    };
    const formSchemaValidator = Yup.object().shape({
        name: Yup.string().required('Name field is required.'),
        email: Yup.string()
            .required('Email field is required.')
            .email('Please enter a valid email'),
    });

    const handleUpdateProfile = (values) => {
        setLoading(true);
        axios
            .put(API.user.edit(user._id), {
                name: values.name,
            })
            .then((response) => {
                console.log(response.status);
                Toast.show({
                    type: 'success',
                    text1: 'Update Profile.',
                    text2: 'profile updated successfully.',
                    visibilityTime: 2000,
                });
            })
            .catch((e) => {
                Toast.show({
                    type: 'error',
                    text1: 'Update Profile.',
                    text2: 'something went wrong!.',
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header back />
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 16,
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <Button
                    text={showForm ? 'Cancel' : 'Edit Profile'}
                    onPress={() => setShowForm(!showForm)}
                />
                {showForm && (
                    <View style={{ marginTop: 16 }}>
                        <Formik
                            initialValues={formInitialValues}
                            validationSchema={formSchemaValidator}
                            onSubmit={handleUpdateProfile}
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
                                    <Button
                                        text="Register"
                                        onPress={handleSubmit}
                                        loading={loading}
                                    />
                                </React.Fragment>
                            )}
                        </Formik>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    name: {
        marginTop: 16,
        fontWeight: 'bold',
        fontSize: 20,
    },
    email: {
        fontSize: 16,
        marginBottom: 16,
    },
});
