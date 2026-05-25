import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CelestialViewProps {
  children: React.ReactNode;
  style?: object;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

// Deterministic pseudo-random (seeded so stars don't jump on re-render)
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateStars = (count: number, seedOffset: number): Star[] => {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const seed = seedOffset + i;
    stars.push({
      x: seededRandom(seed * 1.7) * 100,
      y: seededRandom(seed * 3.1) * 100,
      size: seededRandom(seed * 5.3) < 0.6 ? 1 : 1.5,
      opacity: 0.3 + seededRandom(seed * 7.7) * 0.5,
    });
  }
  return stars;
};

export default function CelestialView({ children, style }: CelestialViewProps) {
  // Use a fixed seed offset so stars are consistent per component instance
  const seedOffset = useMemo(() => Math.floor(Math.random() * 9999), []);
  const stars = useMemo(() => generateStars(14, seedOffset), [seedOffset]);

  return (
    <LinearGradient
      colors={['#0B0015', '#1A0A3E', '#0D0221']}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {stars.map((star, i) => (
        <View
          key={i}
          style={[
            styles.star,
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
});
