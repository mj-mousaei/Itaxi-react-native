import React from 'react';
import { faArrowLeft, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../helpers';
import IconButton from './IconButton';
import Logo from './Logo';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../redux/userSlice';
import { Token } from '../api';

export default function Header({ back = false }) {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser(null));
        dispatch(setAuth('INVALID'));
        Token.remove('USER_AUTH_TOKEN');
    };

    return (
        <View style={styles.header}>
            {!back ? (
                <>
                    <IconButton icon={faBars} onPress={navigation.openDrawer} />
                    <Logo />
                    <IconButton
                        icon={faUser}
                        onPress={() => navigation.navigate('Profile')}
                    />
                </>
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        icon={faArrowLeft}
                        onPress={navigation.goBack}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#000',
                            fontSize: 16,
                            marginLeft: 16,
                        }}
                    >
                        {route.name}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid'
    },
});
