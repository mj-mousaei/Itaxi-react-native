import GetLocation from 'react-native-get-location';

async function getUserLocation() {
    const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    });
    return location;
}

const colors = {
    dark: '#555555',
    white: '#FFFFFF',
    primary: '#FEBB1B',
};

const authStatus = {
    valid: 'VALID',
    invalid: 'INVALID',
};

const tripStatus = {
    direction: 'DIRECTION',
    waiting: 'WAITING',
    accepted: 'ACCEPTED',
    rejected: 'REJECTED',
};

export { getUserLocation, colors, authStatus, tripStatus };
