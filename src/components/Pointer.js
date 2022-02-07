import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const Tooltip = (props) => {
    const fade = useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        if (props.tooltip) {
            Animated.timing(fade, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(fade, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    }, [fade, props.tooltip]);
    return (
        <Animated.View style={{ ...props.style, opacity: fade }}>
            {props.children}
        </Animated.View>
    );
};

export default function Pointer({ origin, tooltip }) {
    return (
        <React.Fragment>
            <View
                style={[
                    styles.pointer,
                    { borderColor: !origin ? 'orange' : 'green' },
                ]}
            >
                <Tooltip
                    tooltip={tooltip}
                    style={{
                        ...styles.tooltip,
                        backgroundColor: !origin ? 'orange' : 'green',
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 12,
                        }}
                    >
                        {!origin ? 'Origin' : 'Destination'}
                    </Text>
                </Tooltip>
                <Text
                    style={[
                        styles.pointerText,
                        { color: !origin ? 'orange' : 'green' },
                    ]}
                >
                    .
                </Text>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    pointer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 3,
        alignSelf: 'center',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 / 2,
    },
    pointerText: {
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 20,
    },
    tooltip: {
        position: 'absolute',
        top: -35,
        width: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 3,
    },
});
