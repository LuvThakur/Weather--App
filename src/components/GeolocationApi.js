import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const GeolocationApi = ({ onLocationChange }) => {
    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    onLocationChange(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const styles = {
        locationButton: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
        },
        locationIcon: {
            marginRight: '5px',
        },
    };

    return (
        <button style={styles.locationButton} onClick={handleLocation}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.locationIcon} />
            Location
        </button>
    );
};

export default GeolocationApi;
