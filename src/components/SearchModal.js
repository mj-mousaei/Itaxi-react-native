import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ENV from '../env.json';
import { colors } from '../helpers';
import IconButton from './IconButton';
import SearchInput from './SearchInput';

export default function SearchModal({
    visible,
    onPickLocation,
    onClose,
    origin,
}) {
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={styles.modalWrapper}>
                    <View
                        style={{
                            marginBottom: 16,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.modalTitle}>
                            {!origin
                                ? 'Where are you ?'
                                : 'Where you want to go ?'}
                        </Text>
                        <IconButton
                            style={{ width: 40, height: 40 }}
                            icon={faTimes}
                            onPress={onClose}
                        />
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder="Search by name"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            onClose();
                            onPickLocation(
                                details.geometry.location.lat,
                                details.geometry.location.lng
                            );
                        }}
                        query={{
                            key: ENV.GOOGLE_MAPS_API_KEY,
                            language: 'en',
                        }}
                        enablePoweredByContainer={false}
                        textInputProps={{
                            InputComp: SearchInput,
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalWrapper: {
        padding: 16,
        flex: 1,
    },
    modalTitle: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 20,
    },
});
