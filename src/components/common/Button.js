import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import useHaptic from '../../hooks/useHaptic';

const Button = ({
  title,
  onPress,
  loading,
  type = 'primary',
  style,
  textStyle,
  iconName,
  disabled,
  ...props
}) => {
  const getButtonStyle = () => {
    if (disabled) return styles.buttonDisabled;
    switch (type) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      case 'ghost':
        return styles.buttonGhost;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.textMuted;
    if (type === 'outline' || type === 'ghost') return Colors.primary;
    return Colors.white;
  };

  const { lightImpact } = useHaptic();

  const handlePress = () => {
    if (onPress && !disabled && !loading) {
      lightImpact(); // Feedback tátil leve ao pressionar
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={handlePress}
      disabled={loading || disabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {iconName && typeof iconName === 'string' && (
            <Ionicons
              name={iconName}
              size={20}
              color={getTextColor()}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    ...Shadows.medium,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.medium,
  },
  buttonOutline: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonGhost: {
    backgroundColor: Colors.transparent,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
    opacity: 0.5,
  },
  text: {
    ...Typography.button,
    fontWeight: '700',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: Spacing.sm,
  },
});

export default Button;
