import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Alert,
    BackHandler,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowLeft, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
    destinationSelector,
    distanceSelector,
    durationSelector,
    originSelector,
    priceSelector,
    setDestination,
    setDistance,
    setDuration,
    setOrigin,
    setPrice,
    setTrip,
    setTripState,
    setUserCurrentLocation,
    tripStateSelector,
    userCurrentLocationSelector,
} from '../redux/mapSlice';
import IconButton from '../components/IconButton';
import { colors, getUserLocation, tripStatus } from '../helpers';
import SearchModal from '../components/SearchModal';
import Marker from '../components/Marker';
import MapActionButton from '../components/MapActionButton';
import ENV from '../env.json';
import Pointer from '../components/Pointer';
import Logo from '../components/Logo';
import axios from 'axios';
import API from '../api';
import Toast from 'react-native-toast-message';
import { userSelector } from '../redux/userSlice';

export default function MapScreen({ navigation }) {
    const [location, setLocation] = useState({
        latitude: 40.7128,
        longitude: -74.006,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [modalStatus, setModalStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef();
    const dispatch = useDispatch();
    const [tooltip, setTooltip] = useState(true);
    const user = useSelector(userSelector);
    const userCurrentLocation = useSelector(userCurrentLocationSelector);
    const origin = useSelector(originSelector);
    const destination = useSelector(destinationSelector);
    const price = useSelector(priceSelector);
    const distance = useSelector(distanceSelector);
    const duration = useSelector(durationSelector);
    const tripState = useSelector(tripStateSelector);

    useEffect(() => {
        // Handle Back Button For Map Actions
        const handleBack = () => {
            handleBackButton();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBack
        );
        return () => backHandler.remove();
    }, [origin, destination]);

    useEffect(() => {
        // Fit to origin and destination marker to the screen.
        if (!origin || !destination) return;
        setTimeout(() => {
            mapRef.current.fitToCoordinates([origin, destination], {
                edgePadding: { top: 200, bottom: 200, left: 50, right: 50 },
            });
        }, 100);
    }, [origin, destination]);

    useEffect(() => {
        // Get user current location and show it on the map.
        handleGetUserLocation();
    }, []);

    const handleGetUserLocation = (move = false) => {
        // get user live location
        getUserLocation()
            .then((location) => {
                dispatch(
                    setUserCurrentLocation({
                        latitude: location.latitude,
                        longitude: location.longitude,
                    })
                );
                if (move) {
                    moveToLocation(location.latitude, location.longitude);
                }
            })
            .catch(() => {
                return false;
            });
    };

    const moveToUserCurrentLocation = () => {
        // Move to user current location
        if (userCurrentLocation) {
            moveToLocation(
                userCurrentLocation?.latitude,
                userCurrentLocation?.longitude
            );
            handleGetUserLocation(true);
        } else {
            Alert.alert('Your Location', 'Trying to get your location.');
        }
    };

    const moveToLocation = (lat, lng) => {
        // Move to specific location
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
    };

    const onPickLocation = (lat, lng) => {
        // Move to picked location
        moveToLocation(lat, lng);
    };

    const setTripInfo = (result) => {
        // set distance , duration and price to the store
        dispatch(setDistance(result.distance));
        dispatch(setDuration(Math.round(result.duration)));
        dispatch(setPrice(Math.round(result.duration)));
    };

    const mapActionButtonOnPress = () => {
        // set the origin and destination that user picked in to the store
        switch (tripState) {
            case tripStatus.waiting:
                return false;
            case tripStatus.accepted:
                console.log('call the driver');
                break;
            case tripStatus.direction:
                handleMakeTrip();
                break;
            case null:
                if (!origin) {
                    dispatch(setOrigin(location));
                } else if (!destination) {
                    dispatch(setDestination(location));
                    dispatch(setTripState(tripStatus.direction));
                }
                break;
        }
    };

    const handleMakeTrip = () => {
        setLoading(true);
        axios
            .post(API.trip.make, {
                latStart: origin.latitude,
                lngStart: origin.longitude,
                latEnd: destination.latitude,
                lngEnd: destination.longitude,
                status: tripStatus.waiting,
                distance: distance,
                passengerId: user._id,
            })
            .then((response) => {
                dispatch(setTrip(response.data));
                dispatch(setTripState(tripStatus.waiting));
            })
            .catch((e) => {
                Toast.show({
                    type: 'error',
                    text1: 'Take a ride',
                    text2: 'Something went wrong!',
                });
            })
            .finally(() => setLoading(false));
    };

    const handleBackButton = () => {
        // Handle the back action in the map
        if (!tripState) {
            if (destination) {
                moveToLocation(destination.latitude, destination.longitude);
                dispatch(setDestination(null));
                dispatch(setTripState(null));
            } else if (origin) {
                moveToLocation(origin.latitude, origin.longitude);
                dispatch(setOrigin(null));
                dispatch(setTripState(null));
            } else {
                navigation.navigate('Drawer', { screen: 'Home' });
            }
        } else {
            Alert.alert("Cancel the trip!", "Do you want to cancel the trip ?");
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 1 }}>
                <SearchModal
                    origin={origin}
                    destination={destination}
                    visible={modalStatus}
                    onPickLocation={onPickLocation}
                    onClose={() => setModalStatus(false)}
                />
                <View style={styles.mapWrapper}>
                    <MapView
                        style={styles.map}
                        onRegionChange={() => setTooltip(false)}
                        onRegionChangeComplete={(e) => {
                            setTooltip(true);
                            setLocation({ ...e });
                        }}
                        ref={mapRef}
                        initialRegion={location}
                    >
                        <Marker
                            coordinate={userCurrentLocation}
                            title="You"
                            id="user_location"
                        />
                        <Marker
                            coordinate={origin}
                            title="Origin"
                            id="origin"
                            color="orange"
                        />
                        <Marker
                            coordinate={destination}
                            title="Destination"
                            id="destination"
                            color="green"
                        />
                        {destination && origin ? (
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={ENV.GOOGLE_MAPS_API_KEY}
                                strokeWidth={3}
                                strokeColor={colors.dark}
                                onReady={setTripInfo}
                            />
                        ) : null}
                    </MapView>
                    <View style={styles.topButtons}>
                        <IconButton
                            onPress={handleBackButton}
                            icon={!tripState ? faArrowLeft : faTimes}
                        />
                        <Logo />
                        <IconButton
                            onPress={() => setModalStatus(true)}
                            icon={faSearch}
                        />
                    </View>
                    {!destination || !origin ? (
                        <Pointer origin={origin} tooltip={tooltip} />
                    ) : null}
                </View>
                <MapActionButton
                    onPress={mapActionButtonOnPress}
                    origin={origin}
                    destination={destination}
                    price={price}
                    duration={duration}
                    distance={distance}
                    tripState={tripState}
                    moveToUserCurrentLocation={moveToUserCurrentLocation}
                    loading={loading}
                />
            </SafeAreaView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mapWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    },
    topButtons: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
