import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

export default function MainScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // Check if location services are enabled
        let locationEnabled = await Location.hasServicesEnabledAsync();
        if (!locationEnabled) {
          setErrorMsg('Location services are disabled. Please enable GPS in your device settings.');
          return;
        }

        // Request permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied. Please grant location permissions in settings.');
          return;
        }

        // Get initial location with more lenient settings
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeout: 10000,
          maximumAge: 30000, // Accept cached location up to 30 seconds old
        });
        setLocation(location);
        generateShareLink(location);
      } catch (error) {
        console.log('Initial location error:', error);
        // Don't show error on initial load, let user manually try
        setErrorMsg(null);
      }
    })();
  }, []);

  const generateShareLink = (loc) => {
    if (loc) {
      const { latitude, longitude } = loc.coords;
      const link = `https://maps.google.com/?q=${latitude},${longitude}`;
      setShareLink(link);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    
    try {
      // Step 1: Check if location services are enabled
      let locationEnabled = await Location.hasServicesEnabledAsync();
      if (!locationEnabled) {
        setErrorMsg('Location services are disabled. Please enable GPS in your device settings.');
        setLoading(false);
        return;
      }

      // Step 2: Request permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied. Please grant location permissions in settings.');
        setLoading(false);
        return;
      }

      // Step 3: Get current position with timeout and lower accuracy first
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Start with balanced accuracy
        timeout: 15000, // 15 second timeout
        maximumAge: 10000, // Accept cached location up to 10 seconds old
      });
      
      setLocation(currentLocation);
      generateShareLink(currentLocation);
      setErrorMsg(null);
      
    } catch (error) {
      console.log('Location error details:', error);
      
      // Provide more specific error messages
      if (error.code === 'E_LOCATION_TIMEOUT') {
        setErrorMsg('Location request timed out. Please try again or move to an area with better GPS signal.');
      } else if (error.code === 'E_LOCATION_UNAVAILABLE') {
        setErrorMsg('Location is currently unavailable. Please check your GPS signal and try again.');
      } else if (error.code === 'E_LOCATION_SERVICES_DISABLED') {
        setErrorMsg('Location services are disabled. Please enable GPS in your device settings.');
      } else {
        setErrorMsg(`Error getting location: ${error.message || 'Unknown error occurred'}`);
      }
    }
    setLoading(false);
  };

  const shareLocation = async () => {
    if (!shareLink) {
      Alert.alert('Error', 'No location available to share');
      return;
    }

    try {
      await Share.share({
        message: `Check out my location: ${shareLink}`,
        url: shareLink,
        title: 'My Location',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share location');
    }
  };

  const copyToClipboard = async () => {
    if (!shareLink) {
      Alert.alert('Error', 'No location available to copy');
      return;
    }

    try {
      await Clipboard.setStringAsync(shareLink);
      Alert.alert('Success', 'Link copied to clipboard!');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy link to clipboard');
    }
  };

  const openInMaps = () => {
    if (!shareLink) {
      Alert.alert('Error', 'No location available to open');
      return;
    }

    Linking.openURL(shareLink);
  };

  const formatCoordinates = (coords) => {
    if (!coords) return 'Not available';
    return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
  };

  const formatAddress = (address) => {
    if (!address) return 'Address not available';
    return `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`.trim();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>📍 GPS Location Sharer</Text>
        <Text style={styles.subtitle}>Share your location with anyone</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A8D5BA" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}

        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>📍 Current Location</Text>
            
            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesLabel}>Coordinates:</Text>
              <Text style={styles.coordinatesText}>
                {formatCoordinates(location.coords)}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Accuracy:</Text>
              <Text style={styles.detailText}>
                {location.coords.accuracy ? `${Math.round(location.coords.accuracy)}m` : 'Unknown'}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Altitude:</Text>
              <Text style={styles.detailText}>
                {location.coords.altitude ? `${Math.round(location.coords.altitude)}m` : 'Not available'}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Speed:</Text>
              <Text style={styles.detailText}>
                {location.coords.speed ? `${Math.round(location.coords.speed * 3.6)} km/h` : 'Not available'}
              </Text>
            </View>
          </View>
        )}

        {shareLink && (
          <View style={styles.shareContainer}>
            <Text style={styles.sectionTitle}>🔗 Share Link</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText} numberOfLines={2}>
                {shareLink}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={getCurrentLocation}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Getting Location...' : '📍 Get Current Location'}
            </Text>
          </TouchableOpacity>

          {shareLink && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.shareButton]}
                onPress={shareLocation}
              >
                <Text style={styles.buttonText}>📤 Share Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={copyToClipboard}
              >
                <Text style={styles.buttonText}>📋 Copy Link</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.mapButton]}
                onPress={openInMaps}
              >
                <Text style={styles.buttonText}>🗺️ Open in Maps</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>ℹ️ How it works:</Text>
          <Text style={styles.infoText}>
            • Tap "Get Current Location" to update your coordinates{'\n'}
            • Use "Share Location" to send via any app{'\n'}
            • "Copy Link" to copy the Google Maps link{'\n'}
            • "Open in Maps" to view in Google Maps
          </Text>
        </View>

        <View style={styles.troubleshootContainer}>
          <Text style={styles.infoTitle}>🔧 Troubleshooting:</Text>
          <Text style={styles.infoText}>
            • Ensure GPS is enabled in device settings{'\n'}
            • Grant location permissions when prompted{'\n'}
            • Try moving to an area with better GPS signal{'\n'}
            • Restart the app if issues persist
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    backgroundColor: '#B8E6B8',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A6741',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B8E6B',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8B8B9F',
  },
  errorContainer: {
    backgroundColor: '#FFE8F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#E8A5C4',
  },
  errorText: {
    color: '#B76E79',
    fontSize: 14,
  },
  locationContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5D5D7A',
  },
  coordinatesContainer: {
    marginBottom: 15,
  },
  coordinatesLabel: {
    fontSize: 14,
    color: '#8B8B9F',
    marginBottom: 5,
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B9E89',
    fontFamily: 'monospace',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8B8B9F',
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5D5D7A',
  },
  shareContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkContainer: {
    backgroundColor: '#F0F4FF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4E3F7',
  },
  linkText: {
    fontSize: 14,
    color: '#7B9E89',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#A8D5BA',
  },
  shareButton: {
    backgroundColor: '#B8E6B8',
  },
  secondaryButton: {
    backgroundColor: '#C8B5E8',
  },
  mapButton: {
    backgroundColor: '#F4C2A1',
  },
  buttonText: {
    color: '#4A6741',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5D5D7A',
  },
  infoText: {
    fontSize: 14,
    color: '#8B8B9F',
    lineHeight: 20,
  },
  troubleshootContainer: {
    backgroundColor: '#FFF8E1',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD54F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
