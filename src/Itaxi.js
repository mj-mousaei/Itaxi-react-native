import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import API, { Token } from './api';
import {
    authSelector,
    setAuth,
    setUser,
    userSelector,
} from './redux/userSlice';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import RegisterScreen from './screens/RegisterScreen';
import { authStatus } from './helpers';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/ProfileScreen';
import Trips from './screens/Trips';

function Drawer() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="My Trips" component={Trips} />
        </Drawer.Navigator>
    );
}

export default function Itaxi() {
    const Stack = createNativeStackNavigator();
    const user = useSelector(userSelector);
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            Token.get().then((token) => {
                if (token) {
                    axios
                        .get(API.user.me(token))
                        .then((response) => {
                            dispatch(setUser(response.data.decode));
                            dispatch(setAuth(authStatus.valid));
                        })
                        .catch((e) => {
                            dispatch(setAuth(authStatus.invalid));
                        });
                } else {
                    dispatch(setAuth(authStatus.invalid));
                }
            });
        } else {
            dispatch(setAuth(authStatus.valid));
        }
    }, []);

    return (
        <React.Fragment>
            <NavigationContainer>
                {auth === null ? (
                    <SplashScreen />
                ) : (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName={
                            auth === authStatus.valid ? 'Drawer' : 'Login'
                        }
                    >
                        {auth === 'VALID' ? (
                            <>
                                <Stack.Screen
                                    name="Drawer"
                                    component={Drawer}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Profile"
                                    component={ProfileScreen}
                                    options={{ animation: 'slide_from_right' }}
                                />
                                <Stack.Screen
                                    name="Map"
                                    component={MapScreen}
                                    options={{ animation: 'slide_from_right' }}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                />
                                <Stack.Screen
                                    name="Register"
                                    component={RegisterScreen}
                                />
                            </>
                        )}
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </React.Fragment>
    );
}
