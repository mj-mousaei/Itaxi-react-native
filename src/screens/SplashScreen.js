import React from 'react';
import { SafeAreaView } from 'react-native';
import { colors } from '../helpers';

export default function SplashScreen() {
    return (
        <React.Fragment>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: colors.primary }}
            ></SafeAreaView>
        </React.Fragment>
    );
}
