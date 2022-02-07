import axios from 'axios';
import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import API from '../api';
import taxiImage from '../assets/images/taxi.png';
import Header from '../components/Header';
import { colors } from '../helpers';
import { setDestination, setOrigin, setTrip, setTripState } from '../redux/mapSlice';
import { userSelector } from '../redux/userSlice';

export default function HomeScreen({ navigation }) {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(API.trip.active(user._id)).then((response) => {
            dispatch(setTrip(response.data));
            dispatch(setOrigin({ latitude: response.data.latStart, longitude: response.data.lngStart }))
            dispatch(setDestination({ latitude: response.data.latEnd, longitude: response.data.lngEnd }))
            dispatch(setTripState(response.data.status));
            navigation.replace('Map');
        }).catch((e) => {
            console.log(e)
            if (e.response.status === 404) {
                return false;
            }
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingHorizontal: 16,
                }}
            >
                <Image source={taxiImage} />
                <Text style={styles.pageTitle}>Welcome back {user.name}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>GET A RIDE !</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        marginTop: 36,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    tripInfo: {
        padding: 12,
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
    },
    tripInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tripInfoItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    pageTitle: {
        marginTop: 16,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
