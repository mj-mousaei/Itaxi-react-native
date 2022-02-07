import AsyncStorage from '@react-native-async-storage/async-storage';
const API = {
    user: {
        register: 'users/register',
        login: 'users/login',
        me: (token) => `me?tokencheck=${token}`,
        edit: (id) => `users/edit/${id}`,
    },
    trip: {
        make: 'trip',
        index: (user_id, type) => `trip/${type}/${user_id}`,
        active: (user_id) => `trip/statusnotrejected/${user_id}`
    },
};

const Token = {
    async set(token) {
        await AsyncStorage.setItem('USER_AUTH_TOKEN', token);
    },
    async get() {
        return await AsyncStorage.getItem('USER_AUTH_TOKEN');
    },
    async remove() {
        await AsyncStorage.removeItem('USER_AUTH_TOKEN');
    },
};

export { Token };
export default API;
