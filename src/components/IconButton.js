import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../helpers';

export default function IconButton({ onPress, icon, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <FontAwesomeIcon icon={icon} color={colors.dark} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 50 / 2,
        borderStyle: 'solid',
        borderColor: colors.primary,
        borderWidth: 2,
    },
});
