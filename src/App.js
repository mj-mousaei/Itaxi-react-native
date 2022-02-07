import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/store';
import ENV from './env.json';
import Itaxi from './Itaxi';
import Toast from 'react-native-toast-message';

axios.defaults.baseURL = ENV.API;

const App = () => {
    return (
        <Provider store={store}>
            <Itaxi />
            <Toast />
        </Provider>
    );
};

export default App;
