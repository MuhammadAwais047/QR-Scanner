import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CelestialView from '../components/CelestialView';
import ScannerOverlay from '../components/ScannerOverlay';

interface ScannerScreenProps {
  onBackToSplash: () => void;
}

export default function ScannerScreen({ onBackToSplash }: ScannerScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanned, setScanned] = useState(false);
  const isProcessingRef = useRef(false);

  const resetScanner = useCallback(() => {
    isProcessingRef.current = false;
    setScanned(false);
  }, []);

  const handleBarCodeScanned = useCallback(
    async (result: BarcodeScanningResult) => {
      if (isProcessingRef.current || scanned) {
        return;
      }
      isProcessingRef.current = true;
      setScanned(true);

      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (_) {
        // Silently fail if haptics unavailable
      }

      const { data } = result;

      Alert.alert(
        'QR Code Scanned',
        data,
        [
          {
            text: 'Open in Browser',
            onPress: () => {
              if (data.startsWith('http://') || data.startsWith('https://')) {
                Linking.openURL(data).catch(() => {});
              } else {
                Linking.openURL('https://' + data).catch(() => {});
              }
              resetScanner();
            },
          },
          {
            text: 'Copy',
            onPress: () => {
              Alert.alert('Copied', data);
              resetScanner();
            },
          },
          {
            text: 'Scan Again',
            onPress: () => resetScanner(),
            style: 'cancel',
          },
        ],
        { cancelable: true, onDismiss: () => resetScanner() }
      );
    },
    [scanned, resetScanner]
  );

  const toggleFlash = useCallback(() => {
    setFlashEnabled((prev) => !prev);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_) {
      // Silently fail if haptics unavailable
    }
  }, []);

  const { width: screenWidth } = useWindowDimensions();
  const isSmallScreen = screenWidth < 375;

  const backButtonSize = isSmallScreen ? 36 : 40;
  const flashButtonSize = isSmallScreen ? 48 : 56;
  const instructionFontSize = isSmallScreen ? 13 : 15;

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="camera-outline" size={64} color="#FFFFFF" />
        <Text style={styles.loadingText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flashEnabled}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <ScannerOverlay />

        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButtonWrapper,
              {
                width: backButtonSize,
                height: backButtonSize,
                borderRadius: backButtonSize / 2,
              },
            ]}
            onPress={onBackToSplash}
            activeOpacity={0.7}
          >
            <CelestialView
              style={[
                styles.celestialButton,
                {
                  width: backButtonSize,
                  height: backButtonSize,
                  borderRadius: backButtonSize / 2,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </CelestialView>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scanner</Text>
          <View
            style={[
              styles.headerSpacer,
              { width: backButtonSize },
            ]}
          />
        </SafeAreaView>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text
              style={[
                styles.instructionText,
                { fontSize: instructionFontSize },
              ]}
            >
              Point your camera at a QR code
            </Text>
            <TouchableOpacity
              onPress={toggleFlash}
              activeOpacity={0.7}
            >
              <CelestialView
                style={[
                  styles.flashButton,
                  {
                    width: flashButtonSize,
                    height: flashButtonSize,
                    borderRadius: flashButtonSize / 2,
                  },
                  flashEnabled && styles.flashButtonActive,
                ]}
              >
                <Ionicons
                  name={flashEnabled ? 'flash' : 'flash-off'}
                  size={isSmallScreen ? 20 : 24}
                  color="#FFFFFF"
                />
              </CelestialView>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  permissionButton: {
    backgroundColor: '#6C00FF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButtonWrapper: {
    overflow: 'hidden',
  },
  celestialButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    paddingHorizontal: 24,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instructionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
  flashButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  flashButtonActive: {
    borderColor: '#6C00FF',
  },
});
