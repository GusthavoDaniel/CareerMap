import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';

/**
 * Componente de Toast para feedback visual
 */
const Toast = ({ visible, message, type = 'success', duration = 3000, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  };

  const config = {
    success: {
      icon: 'checkmark-circle',
      color: Colors.accent,
      backgroundColor: Colors.accent + '20',
    },
    error: {
      icon: 'close-circle',
      color: Colors.error,
      backgroundColor: Colors.error + '20',
    },
    warning: {
      icon: 'warning',
      color: Colors.accentOrange,
      backgroundColor: Colors.accentOrange + '20',
    },
    info: {
      icon: 'information-circle',
      color: Colors.primary,
      backgroundColor: Colors.primary + '20',
    },
  };

  const currentConfig = config[type] || config.success;

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: currentConfig.backgroundColor }]}>
        <Ionicons name={currentConfig.icon} size={24} color={currentConfig.color} />
        <Text style={[styles.message, { color: currentConfig.color }]}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.large,
    gap: Spacing.sm,
  },
  message: {
    ...Typography.bodySmall,
    fontWeight: '600',
    flex: 1,
  },
});

export default Toast;
