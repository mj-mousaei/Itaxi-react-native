import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        origin: null,
        destination: null,
        userCurrentLocation: null,
        duration: null,
        distance: null,
        price: null,
        tripState: null,
        trip: null,
    },
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setUserCurrentLocation: (state, action) => {
            state.userCurrentLocation = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setDistance: (state, action) => {
            state.distance = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setTripState: (state, action) => {
            state.tripState = action.payload;
        },
        setTrip: (state, action) => {
            state.trip = action.payload;
        },
    },
});

export const {
    setOrigin,
    setDestination,
    setUserCurrentLocation,
    setDuration,
    setDistance,
    setPrice,
    setTripState,
    setTrip,
} = mapSlice.actions;

export const originSelector = (state) => state.map.origin;
export const destinationSelector = (state) => state.map.destination;
export const distanceSelector = (state) => state.map.distance;
export const durationSelector = (state) => state.map.duration;
export const priceSelector = (state) => state.map.price;
export const userCurrentLocationSelector = (state) =>
    state.map.userCurrentLocation;
export const tripStateSelector = (state) => state.map.tripState;

export default mapSlice.reducer;
