import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { colors } from '../helpers';

class ButtonSpinner extends Component {
    spinValue = new Animated.Value(0);

    componentDidMount() {
        this.spin();
    }

    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => this.spin());
    };

    render() {
        const rotate = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <Animated.View style={{ transform: [{ rotate }] }}>
                <FontAwesomeIcon
                    icon={faSpinner}
                    color={colors.white}
                    size={20}
                />
            </Animated.View>
        );
    }
}

export default ButtonSpinner;
