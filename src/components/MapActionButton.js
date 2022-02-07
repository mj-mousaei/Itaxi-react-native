import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import { faCar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { colors, tripStatus } from '../helpers';
import IconButton from './IconButton';
import ButtonSpinner from './ButtonSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const TripInfo = (props) => {
    const slideUp = useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        Animated.timing(slideUp, {
            toValue: 150,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [slideUp]);
    return (
        <Animated.View style={{ ...props.style, height: slideUp }}>
            {props.children}
        </Animated.View>
    );
};

export default function MapActionButton({
    onPress,
    origin,
    destination,
    distance,
    duration,
    price,
    tripState,
    moveToUserCurrentLocation,
    loading,
}) {
    const render = () => {
        switch (tripState) {
            case tripStatus.direction:
                return (
                    <TripInfo style={styles.tripInfo}>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>Timing</Text>
                            <Text>{duration} min</Text>
                        </View>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>
                                Distance
                            </Text>
                            <Text>{distance} KM</Text>
                        </View>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>Price</Text>
                            <Text>${price}</Text>
                        </View>
                    </TripInfo>
                );
            case tripStatus.waiting:
                return null;
            case tripStatus.accepted:
                return (
                    <TripInfo style={styles.tripInfo}>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>Driver</Text>
                            <Text>Alex</Text>
                        </View>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>Car</Text>
                            <Text>BMW x3</Text>
                        </View>
                        <View style={styles.tripInfoItem}>
                            <Text style={styles.tripInfoItemTitle}>Age</Text>
                            <Text>32</Text>
                        </View>
                    </TripInfo>
                );
        }
    };

    return (
        <View style={styles.buttonWrapper}>
            <IconButton
                style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: -58,
                    right: 8,
                }}
                onPress={moveToUserCurrentLocation}
                icon={faMapMarkerAlt}
            />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                {tripState === tripStatus.waiting && (
                    <View style={styles.buttonContentWrapper}>
                        <ButtonSpinner />
                        <Text style={styles.buttonText}>Wait for a driver</Text>
                    </View>
                )}
                {tripState === null &&
                    (!origin ? (
                        <View style={styles.buttonContentWrapper}>
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                color={colors.white}
                                size={20}
                            />
                            <Text style={styles.buttonText}>
                                Select the origin
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.buttonContentWrapper}>
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                color={colors.white}
                                size={20}
                            />
                            <Text style={styles.buttonText}>
                                Select the destination
                            </Text>
                        </View>
                    ))}
                {tripState === tripStatus.direction && (
                    <View style={styles.buttonContentWrapper}>
                        {loading ? (
                            <ButtonSpinner />
                        ) : (
                            <FontAwesomeIcon
                                icon={faCar}
                                color={colors.white}
                                size={20}
                            />
                        )}
                        <Text style={styles.buttonText}>GET A RIDE !</Text>
                    </View>
                )}
            </TouchableOpacity>
            {render()}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        position: 'relative',
    },
    button: {
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    buttonContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginLeft: 8,
    },
    tripInfo: {
        padding: 12,
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
    },
    tripInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tripInfoItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
