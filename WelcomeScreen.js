import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📍</Text>
            </View>
            <Text style={styles.title}>GPS Location Sharer</Text>
            <Text style={styles.subtitle}>Share your location with anyone, anywhere</Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>✨ What you can do:</Text>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📍</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Get Your Location</Text>
                <Text style={styles.featureDescription}>
                  Instantly get your current GPS coordinates with high accuracy
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📤</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Share Location</Text>
                <Text style={styles.featureDescription}>
                  Share your location via any messaging app or social media
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🗺️</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Open in Maps</Text>
                <Text style={styles.featureDescription}>
                  View your location directly in Google Maps
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📋</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Copy Link</Text>
                <Text style={styles.featureDescription}>
                  Copy the location link to paste anywhere you want
                </Text>
              </View>
            </View>
          </View>

          {/* How to Use Section */}
          <View style={styles.howToSection}>
            <Text style={styles.sectionTitle}>🚀 How to use:</Text>
            
            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Tap "Get Current Location" to update your coordinates
              </Text>
            </View>

            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Choose how you want to share: Share, Copy, or Open in Maps
              </Text>
            </View>

            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Send the location to friends, family, or save for later
              </Text>
            </View>
          </View>

          {/* Privacy Section */}
          <View style={styles.privacySection}>
            <Text style={styles.sectionTitle}>🔒 Privacy & Safety:</Text>
            <Text style={styles.privacyText}>
              • Your location is only shared when you choose to{'\n'}
              • No data is stored on our servers{'\n'}
              • You have full control over when to share{'\n'}
              • Location permissions are only used when needed
            </Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Main')}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Text style={styles.getStartedArrow}>→</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#B8E6B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A6741',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B8E6B',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D5D7A',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6741',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#8B8B9F',
    lineHeight: 20,
  },
  howToSection: {
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#A8D5BA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A6741',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#5D5D7A',
    lineHeight: 20,
  },
  privacySection: {
    backgroundColor: '#FFF8E1',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD54F',
  },
  privacyText: {
    fontSize: 14,
    color: '#8B8B9F',
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A6741',
    marginRight: 10,
  },
  getStartedArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A6741',
  },
});
