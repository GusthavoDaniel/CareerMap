import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';

const Input = ({ label, error, style, iconName, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
      >
        {iconName && typeof iconName === 'string' && (
          <Ionicons
            name={iconName}
            size={20}
            style={[styles.icon, isFocused && styles.iconFocused]}
          />
        )}
        <TextInput
          style={[styles.input, iconName && styles.inputWithIcon]}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    ...Shadows.small,
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackground,
    ...Shadows.glow,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  inputWithIcon: {
    paddingLeft: Spacing.sm,
  },
  icon: {
    color: Colors.textSecondary,
  },
  iconFocused: {
    color: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
});

export default Input;
