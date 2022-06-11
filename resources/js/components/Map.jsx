import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, GoogleMap, InfoWindow, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { CircularProgress, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const libraries = ["places"];

const Map = ({ apiKey, center, searchable = false, editable = false, onLocationChange }) => {
    const [mapCenter, setMapCenter] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(mapCenter);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });

    console.log(isLoaded);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace(),
                location = place.geometry.location,
                pos = { lat: location.lat(), lng: location.lng() };

            setMapCenter(pos);
            setMarkerPosition(pos);

            onLocationChange({
                ...pos,
                name: place.name,
                address: place.formatted_address
            });

            console.log(place);
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

    const handleLocationChange = e => {
        onLocationChange({
            lat: e.latLng.lat().toFixed(10),
            lng: e.latLng.lng().toFixed(10)
        });
    };

    useEffect(() => {
        if (!(center && center.lat && center.lng)) center = { lat: -1.265788, lng: 36.760435 };

        setMapCenter(center);
        setMarkerPosition(center);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '400px'
            }}
            onClick={e => {
                setMarkerPosition(e.latLng);
                handleLocationChange(e);
            }}
            center={mapCenter}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            {
                searchable && (
                    <Autocomplete onLoad={autocomplete => setAutocomplete(autocomplete)} onPlaceChanged={onPlaceChanged}>
                        <TextField placeholder="Search location..." variant={'standard'}
                                   sx={{ position: 'absolute', left: '50%', ml: '-10rem', width: '20rem', p: 1, mt: 1 }}/>
                    </Autocomplete>
                )
            }
            <Marker onLoad={marker => setMarker(marker)} position={markerPosition} draggable={editable}
                    animation={google.maps.Animation.BOUNCE}
                    onDragEnd={e => handleLocationChange(e)}/>
        </GoogleMap>
    ) : <CircularProgress/>;
};

Map.propTypes = {
    apiKey: PropTypes.string.isRequired,
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    searchable: PropTypes.bool,
    editable: PropTypes.bool,
    onLocationChange: PropTypes.func
};

export default Map;
