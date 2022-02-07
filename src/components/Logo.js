import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../helpers';

export default function Logo() {
    return (
        <React.Fragment>
            <View style={styles.logo}>
                <Text style={styles.logoText}>iTaxi</Text>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    logo: {
        backgroundColor: colors.white,
        width: 100,
        height: 50,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    logoText: {
        fontSize: 26,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.white,
    },
});
