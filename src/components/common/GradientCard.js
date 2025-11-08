import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Shadows, Spacing } from '../../styles/theme';

/**
 * Card premium com gradiente e efeitos visuais
 */
const GradientCard = ({ 
  children, 
  style, 
  gradient = 'primary',
  onPress,
  elevated = true,
}) => {
  const gradients = {
    primary: [Colors.primary, Colors.primaryDark],
    secondary: [Colors.secondary, Colors.secondaryDark],
    purple: [Colors.accentPurple, Colors.primaryDark],
    success: [Colors.accent, Colors.primary],
    sunset: [Colors.secondary, Colors.accentOrange],
    ocean: [Colors.accentCyan, Colors.primary],
  };

  const selectedGradient = gradients[gradient] || gradients.primary;

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[styles.container, elevated && Shadows.large, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      <LinearGradient
        colors={selectedGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  gradient: {
    padding: Spacing.lg,
  },
});

export default GradientCard;
