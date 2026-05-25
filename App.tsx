import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import ScannerScreen from './src/screens/ScannerScreen';

type Screen = 'splash' | 'scanner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  return (
    <SafeAreaProvider>
      <StatusBar
        hidden={currentScreen === 'scanner'}
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {currentScreen === 'splash' ? (
        <SplashScreen onEnterScanner={() => setCurrentScreen('scanner')} />
      ) : (
        <ScannerScreen onBackToSplash={() => setCurrentScreen('splash')} />
      )}
    </SafeAreaProvider>
  );
}
