# 🔧 GPS Location Error Troubleshooting Guide

## 🚨 Common Error: "Error getting location: calling the 'getCurrentPositionAsync' function has failed"

This error can occur for several reasons. Follow this troubleshooting guide to resolve the issue.

## 🔍 Step-by-Step Troubleshooting

### 1. **Check Device Location Services**

#### iOS:
1. Go to **Settings** → **Privacy & Security** → **Location Services**
2. Ensure **Location Services** is turned **ON**
3. Find your app in the list and set it to **"While Using"** or **"Always"**

#### Android:
1. Go to **Settings** → **Location**
2. Ensure **Location** is turned **ON**
3. Set **Mode** to **"High accuracy"** (GPS + Wi-Fi + Mobile networks)

### 2. **Check App Permissions**

#### iOS:
1. Go to **Settings** → **Privacy & Security** → **Location Services**
2. Find your app and ensure it has location permission
3. If denied, tap on the app and select **"While Using App"**

#### Android:
1. Go to **Settings** → **Apps** → **Your App** → **Permissions**
2. Ensure **Location** permission is granted
3. If denied, tap **"Allow"** for location access

### 3. **Check GPS Signal**

#### Common GPS Issues:
- **Indoors**: GPS signals are weak inside buildings
- **Urban areas**: Tall buildings can block GPS signals
- **Weather**: Heavy cloud cover can affect GPS accuracy
- **Time**: GPS may take 1-2 minutes to get a fix

#### Solutions:
- Move to an **open outdoor area**
- Wait **1-2 minutes** for GPS to acquire signal
- Ensure you have a **clear view of the sky**

### 4. **Check Network Connection**

#### Requirements:
- **Internet connection** for map services
- **Cellular data** or **Wi-Fi** connection
- **GPS signal** for location accuracy

### 5. **App-Specific Solutions**

#### Restart the App:
1. Close the app completely
2. Wait 10 seconds
3. Reopen the app
4. Try getting location again

#### Clear App Cache (Android):
1. Go to **Settings** → **Apps** → **Your App**
2. Tap **"Storage"**
3. Tap **"Clear Cache"**
4. Restart the app

#### Reset App Permissions:
1. Go to **Settings** → **Apps** → **Your App** → **Permissions**
2. Tap **"Reset permissions"**
3. Restart the app and grant permissions again

## 🛠️ Technical Solutions

### 1. **Update Expo SDK**
```bash
# Check current version
expo --version

# Update Expo CLI
npm install -g @expo/cli@latest

# Update project dependencies
npm install
```

### 2. **Check Expo Location Version**
```bash
# Ensure you have the latest expo-location
npm install expo-location@latest
```

### 3. **Test on Different Devices**
- Try on a **physical device** instead of simulator
- Test on both **iOS and Android**
- Try on a device with **good GPS signal**

## 📱 Device-Specific Issues

### iOS Simulator Issues:
- **iOS Simulator** has limited GPS capabilities
- Use a **physical iOS device** for testing
- Or use **Xcode Simulator** with custom location

### Android Emulator Issues:
- **Android Emulator** may not have GPS enabled
- Use a **physical Android device** for testing
- Or enable GPS in emulator settings

### Physical Device Issues:
- **Battery optimization** may disable GPS
- **Do Not Disturb** mode can affect location services
- **Airplane mode** disables GPS

## 🔄 Alternative Solutions

### 1. **Use Lower Accuracy**
The app now uses `Location.Accuracy.Balanced` instead of `High` for better compatibility.

### 2. **Increase Timeout**
The app now has a 15-second timeout to allow more time for GPS acquisition.

### 3. **Accept Cached Location**
The app accepts cached locations up to 10 seconds old to improve reliability.

## 📞 When to Contact Support

Contact support if:
- ✅ All troubleshooting steps completed
- ✅ GPS is enabled and working in other apps
- ✅ Permissions are granted
- ✅ Testing on physical device
- ❌ Error persists after multiple attempts

## 🎯 Prevention Tips

### Best Practices:
1. **Always test on physical devices** for location features
2. **Request permissions gracefully** with clear explanations
3. **Provide fallback options** when location fails
4. **Use appropriate accuracy levels** for your use case
5. **Handle timeouts gracefully** with user feedback

### Development Tips:
1. **Test in different environments** (indoor/outdoor)
2. **Test with poor GPS signal** (basement, urban areas)
3. **Test permission flows** (grant/deny/revoke)
4. **Monitor error logs** for specific error codes
5. **Provide clear error messages** to users

## 🔍 Debug Information

### Error Codes to Look For:
- `E_LOCATION_TIMEOUT` - GPS acquisition took too long
- `E_LOCATION_UNAVAILABLE` - GPS signal not available
- `E_LOCATION_SERVICES_DISABLED` - Location services turned off
- `E_LOCATION_PERMISSION_DENIED` - Permission not granted

### Console Logs:
Check the console for detailed error information:
```javascript
console.log('Location error details:', error);
```

## 📚 Additional Resources

- [Expo Location Documentation](https://docs.expo.dev/versions/latest/sdk/location/)
- [React Native Location Permissions](https://reactnative.dev/docs/permissionsandroid)
- [iOS Location Services Guide](https://developer.apple.com/documentation/corelocation)
- [Android Location Guide](https://developer.android.com/guide/topics/location)

---

**Note**: Most location issues are resolved by ensuring GPS is enabled, permissions are granted, and testing on a physical device in an outdoor environment with good GPS signal.
