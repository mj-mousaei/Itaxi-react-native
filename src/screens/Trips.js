import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/userSlice';
import API from '../api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import Header from '../components/Header';
import TripCard from '../components/TripCard';

export default function Trips() {
    const [trips, setTrips] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const user = useSelector(userSelector);

    useEffect(() => {
        getTrips();
    }, []);

    const getTrips = () => {
        setFetching(true);
        axios
            .get(API.trip.index(user._id, 'passenger'))
            .then((response) => {
                setTrips(response.data.passengerTrips);
            })
            .catch(() =>
                Toast.show({
                    type: 'error',
                    text1: 'My Trips',
                    text2: 'Something went wrong!',
                })
            ).finally(() => setFetching(false));
    }

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                {trips ? (
                    trips.length ? (
                        <>
                            <FlatList
                                refreshing={fetching}
                                onRefresh={() => getTrips()}
                                data={trips}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => <TripCard item={item} />}
                                contentContainerStyle={{ paddingBottom: 6, paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}
                            />
                        </>
                    ) : (
                        <Text>nothing</Text>
                    )
                ) : (
                    <Text>loading</Text>
                )}
            </SafeAreaView>
        </React.Fragment>
    );
}
