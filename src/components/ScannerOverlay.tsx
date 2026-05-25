import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LINE_HEIGHT = 3;

export default function ScannerOverlay() {
  const { width: screenWidth } = useWindowDimensions();
  const SCANNER_SIZE = screenWidth * 0.7;
  const cornerSize = screenWidth < 375 ? 24 : 28;
  const cornerBorderWidth = screenWidth < 375 ? 3 : 4;

  const scanAnim = useRef(new Animated.Value(0)).current;
  const cornerPulse = useRef(new Animated.Value(1)).current;
  const overlayColor = 'rgba(0, 0, 0, 0.5)';

  useEffect(() => {
    const scanLineAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    scanLineAnim.start();

    const cornerPulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(cornerPulse, {
          toValue: 0.35,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(cornerPulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    cornerPulseAnim.start();

    return () => {
      scanLineAnim.stop();
      cornerPulseAnim.stop();
    };
  }, [scanAnim, cornerPulse]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCANNER_SIZE - LINE_HEIGHT],
  });

  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Top dimmed bar */}
      <View style={[styles.topBar, { backgroundColor: overlayColor }]} />

      {/* Middle row: left dimmed, clear cutout, right dimmed */}
      <View style={[styles.middleRow, { height: SCANNER_SIZE }]}>
        <View style={[styles.sideBar, { backgroundColor: overlayColor }]} />
        <View style={[styles.scannerArea, { width: SCANNER_SIZE, height: SCANNER_SIZE }]}>
          {/* Corner borders with pulsing glow */}
          <Animated.View
            style={[
              styles.corner,
              styles.cornerTopLeft,
              {
                width: cornerSize,
                height: cornerSize,
                borderTopWidth: cornerBorderWidth,
                borderLeftWidth: cornerBorderWidth,
                borderTopLeftRadius: cornerSize / 3.5,
              },
              { opacity: cornerPulse },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.cornerTopRight,
              {
                width: cornerSize,
                height: cornerSize,
                borderTopWidth: cornerBorderWidth,
                borderRightWidth: cornerBorderWidth,
                borderTopRightRadius: cornerSize / 3.5,
              },
              { opacity: cornerPulse },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.cornerBottomLeft,
              {
                width: cornerSize,
                height: cornerSize,
                borderBottomWidth: cornerBorderWidth,
                borderLeftWidth: cornerBorderWidth,
                borderBottomLeftRadius: cornerSize / 3.5,
              },
              { opacity: cornerPulse },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.cornerBottomRight,
              {
                width: cornerSize,
                height: cornerSize,
                borderBottomWidth: cornerBorderWidth,
                borderRightWidth: cornerBorderWidth,
                borderBottomRightRadius: cornerSize / 3.5,
              },
              { opacity: cornerPulse },
            ]}
          />

          {/* Animated scanning line */}
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY }] },
            ]}
          >
            <LinearGradient
              colors={['rgba(0, 229, 255, 0)', '#00E5FF', 'rgba(0, 229, 255, 0)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.scanLineGradient}
            />
          </Animated.View>
        </View>
        <View style={[styles.sideBar, { backgroundColor: overlayColor }]} />
      </View>

      {/* Bottom dimmed bar */}
      <View style={[styles.bottomBar, { backgroundColor: overlayColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    flex: 1,
  },
  middleRow: {
    flexDirection: 'row',
  },
  sideBar: {
    flex: 1,
  },
  scannerArea: {
    position: 'relative',
  },
  bottomBar: {
    flex: 1,
  },
  scanLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: LINE_HEIGHT,
    zIndex: 10,
  },
  scanLineGradient: {
    flex: 1,
    borderRadius: 1.5,
  },
  corner: {
    position: 'absolute',
    borderColor: '#FFFFFF',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
  },
});
