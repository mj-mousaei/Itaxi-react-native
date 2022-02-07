import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Geocoder from 'react-native-geocoding';
import ENV from '../env.json';
import { colors } from '../helpers';

Geocoder.init(ENV.GOOGLE_MAPS_API_KEY);

export default function TripCard({ item }) {

    const [originAddress, setOriginAddress] = useState(null);
    const [destinationAddress, setDestinationAddress] = useState(null);

    useEffect(() => {
        Geocoder.from(item.latStart, item.lngStart)
            .then(json => {
                setOriginAddress(json.results[0].formatted_address)
            })
            .catch(error => console.warn(error));
        Geocoder.from(item.latEnd, item.lngEnd)
            .then(json => {
                setDestinationAddress(json.results[0].formatted_address)
            })
            .catch(error => console.warn(error));
    }, [])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 16, padding: 16, borderRadius: 3 }}>
            <View style={{ flex: 1, marginRight: 16 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 8, lineHeight: 30 }} numberOfLines={2}>{originAddress}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>TO</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 8, lineHeight: 30 }} numberOfLines={2}>{destinationAddress}</Text>
            </View>
            <Text style={{ color: '#fff', backgroundColor: 'green', padding: 4, fontSize: 10, borderRadius: 3 }}>{item.status}</Text>
        </View>
    )
}
