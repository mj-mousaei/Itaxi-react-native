import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../helpers';
import ButtonSpinner from './ButtonSpinner';

export default function Button({ onPress, text, loading = false }) {
    const onPressHandler = () => {
        if (loading) return;
        onPress();
    };

    return (
        <React.Fragment>
            <TouchableOpacity style={styles.button} onPress={onPressHandler}>
                {loading && <ButtonSpinner />}
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
    },
});
