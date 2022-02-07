import React from 'react';
import { Marker as GoogleMapMarker } from 'react-native-maps';

export default function Marker({ coordinate, title, id, color = null }) {
    return (
        <React.Fragment>
            {coordinate && (
                <GoogleMapMarker
                    coordinate={coordinate}
                    title={title}
                    identifier={id}
                    pinColor={color}
                />
            )}
        </React.Fragment>
    );
}
