import React ,{useState} from 'react';
import SunImage from './sun.png';
import GeolocationApi from './GeolocationApi';


const Navbar = ({onhandlelatlon}) => {
    // eslint-disable-next-line
    const [userLocation, setUserLocation] = useState(null);

    const handleLocation = (lat, lon) => {
        // Use the callback form of setUserLocation
        setUserLocation((prevLocation) => {
            // Combine the previous state with the new values
            const updatedLocation = { ...prevLocation, latitude: lat, longitude: lon };
    
            // Pass the updated location directly to onhandlelatlon
            onhandlelatlon(updatedLocation);
    
            // Return the updated location to set the state
            return updatedLocation;
        });
    };
    

    return (
        <div>
            <div style={styles.outerContainer} className="header-outer">
                <div style={styles.innerContainer} className="header-inner">
                    <a style={styles.logoLink} href="/">
                        <img style={styles.logoImage} src={SunImage} alt="Logo" />
                        <label style={styles.logoLabel}>Weather-App</label>
                    </a>
                    <GeolocationApi onLocationChange={handleLocation} />
                    {/* Pass the handleLocation function to GeolocationComponent */}
                </div>
            </div>
        </div>
    );
};

const styles = {
    outerContainer: {
        backgroundColor: 'rgb(51, 51, 51,0.5)',
        color: '#fff',
        margin: '20px 0',
        padding: '15px'
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoLink: {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        height: '50px',
        marginRight: '10px',
    },
    logoLabel: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white'
    },
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

export default Navbar;
