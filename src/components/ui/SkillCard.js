import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';

/**
 * Card de habilidade com barra de progresso animada
 */
const SkillCard = ({ 
  icon, 
  name, 
  level, 
  progress = 0, 
  color = Colors.primary,
  onPress,
  delay = 0,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(progressAnim, {
          toValue: progress,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.container,
          Shadows.medium,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.level}>{level}</Text>
          </View>
          <Text style={[styles.percentage, { color }]}>{progress}%</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressFill,
                { width: progressWidth, backgroundColor: color },
              ]}
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: 2,
  },
  level: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  percentage: {
    ...Typography.heading,
    fontSize: 18,
    fontWeight: '800',
  },
  progressContainer: {
    marginTop: Spacing.xs,
  },
  progressBackground: {
    height: 8,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
});

export default SkillCard;
