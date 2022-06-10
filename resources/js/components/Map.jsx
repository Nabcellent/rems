import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, InfoWindow, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { CircularProgress, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const libraries = ["places"];

const Map = ({ apiKey, position, onLocationChange }) => {
    const [center, setCenter] = useState({ lat: -1.265788, lng: 36.760435 });
    const [autocomplete, setAutocomplete] = useState(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(center);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });

    console.log(isLoaded);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const location = autocomplete.getPlace().geometry.location;

            setCenter({ lat: location.lat(), lng: location.lng() });
            setMarkerPosition({ lat: location.lat(), lng: location.lng() });

            console.log(autocomplete.getPlace());
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    };

    const panToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Current location found.");
                    infoWindow.open(map);

                    map.setCenter(pos);
                    marker.setCenter(pos);

                    onLocationChange({
                        lat: pos.lat.toFixed(10),
                        lng: pos.lng.toFixed(10)
                    });
                },
                () => handleLocationError(true, infoWindow, map.getCenter())
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());    // Browser doesn't support Geolocation
        }
    };

    useEffect(() => {
        if (position.lng && position.lng) {
            setCenter(position);
            setMarkerPosition(position);
        }
    }, [position]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '400px'
            }}
            onClick={e => setMarkerPosition(e.latLng)}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            <Autocomplete onLoad={autocomplete => setAutocomplete(autocomplete)} onPlaceChanged={onPlaceChanged}>
                <TextField placeholder="Search location..." variant={'standard'}
                           sx={{ position: 'absolute', left: '50%', ml: '-10rem', width: '20rem', p: 1, mt: 1 }}/>
            </Autocomplete>
            <Marker onLoad={marker => setMarker(marker)} position={markerPosition} draggable
                    animation={google.maps.Animation.BOUNCE}
                    onDrag={e => onLocationChange({
                        lat: e.latLng.lat().toFixed(10),
                        lng: e.latLng.lng().toFixed(10)
                    })}/>
        </GoogleMap>
    ) : <CircularProgress/>;
};

Map.propTypes = {
    apiKey: PropTypes.string.isRequired,
    position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),
    onLocationChange: PropTypes.func
};

export default Map;
