import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CelestialView from '../components/CelestialView';

interface SplashScreenProps {
  onEnterScanner: () => void;
}

export default function SplashScreen({ onEnterScanner }: SplashScreenProps) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  // Responsive sizing
  const qrIconSize = isSmallScreen ? 44 : 48;
  const iconCircleSize = isSmallScreen ? 100 : 120;
  const titleFontSize = isSmallScreen ? 26 : Math.min(32, width * 0.085);
  const subtitleFontSize = isSmallScreen ? 14 : 16;

  // Scan button dimensions
  const scanBtnSize = isSmallScreen ? 72 : 80;
  const scanIconSize = isSmallScreen ? 28 : 32;

  // Pulsing glow animation
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Press scale animation
  const pressAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [glowAnim]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  return (
    <LinearGradient
      colors={['#6C00FF', '#0066FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View
            style={[
              styles.iconCircle,
              {
                width: iconCircleSize,
                height: iconCircleSize,
                borderRadius: iconCircleSize / 2,
              },
            ]}
          >
            <Ionicons name="qr-code" size={qrIconSize} color="#FFFFFF" />
          </View>
          <Text style={[styles.title, { fontSize: titleFontSize }]}>
            iOS 26 QR Code Scanner
          </Text>
          <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
            Fast. Secure. Seamless.
          </Text>
        </View>

        <View style={styles.scanButtonContainer}>
          {/* Outer pulsing glow ring */}
          <Animated.View
            style={[
              styles.glowRing,
              {
                width: scanBtnSize + 16,
                height: scanBtnSize + 16,
                borderRadius: (scanBtnSize + 16) / 2,
                opacity: glowOpacity,
                transform: [{ scale: glowScale }],
              },
            ]}
          />
          {/* Second glow ring for layered effect */}
          <Animated.View
            style={[
              styles.glowRingSecondary,
              {
                width: scanBtnSize + 28,
                height: scanBtnSize + 28,
                borderRadius: (scanBtnSize + 28) / 2,
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.35],
                }),
                transform: [{
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.12],
                  }),
                }],
              },
            ]}
          />
          {/* The button itself */}
          <TouchableOpacity
            onPress={onEnterScanner}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <Animated.View
              style={{
                transform: [{ scale: pressAnim }],
              }}
            >
              <CelestialView
                style={{
                  width: scanBtnSize,
                  height: scanBtnSize,
                  borderRadius: scanBtnSize / 2,
                }}
              >
                <Ionicons name="scan-outline" size={scanIconSize} color="#FFFFFF" />
              </CelestialView>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 48 : 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  title: {
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  scanButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: '#6C00FF',
  },
  glowRingSecondary: {
    position: 'absolute',
    backgroundColor: '#0066FF',
  },
});
