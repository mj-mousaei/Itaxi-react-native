import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { colors } from '../helpers';

export default function SearchInput(props) {
    return (
        <React.Fragment>
            <TextInput
                {...props}
                selectionColor={colors.primary}
                style={[styles.input, props.style]}
            />
            {props.error && props.errorVisible && (
                <Text style={styles.errorText}>{props.error}</Text>
            )}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 16,
        borderRadius: 3,
        fontSize: 16,
        backgroundColor: colors.white,
        height: 55,
    },
    errorText: {
        color: 'tomato',
        fontWeight: 'bold',
    },
});
