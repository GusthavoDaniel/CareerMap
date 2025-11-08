import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';

/**
 * Card de conquista premium com gradiente e animação
 */
const AchievementCard = ({ 
  icon, 
  title, 
  description, 
  unlocked = false,
  progress = 0,
  onPress,
}) => {
  const gradientColors = unlocked
    ? [Colors.accent, Colors.primary]
    : [Colors.backgroundLight, Colors.backgroundLight];

  return (
    <TouchableOpacity
      style={[styles.container, unlocked && Shadows.glow]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={[
            styles.iconContainer,
            { 
              backgroundColor: unlocked ? Colors.white + '30' : Colors.border,
              borderColor: unlocked ? Colors.white : Colors.border,
            }
          ]}>
            <Ionicons 
              name={icon} 
              size={32} 
              color={unlocked ? Colors.white : Colors.textMuted} 
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[
              styles.title,
              { color: unlocked ? Colors.white : Colors.text }
            ]}>
              {title}
            </Text>
            <Text style={[
              styles.description,
              { color: unlocked ? Colors.white + 'CC' : Colors.textMuted }
            ]}>
              {description}
            </Text>

            {!unlocked && progress > 0 && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
            )}
          </View>

          {unlocked && (
            <View style={styles.badge}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  gradient: {
    padding: Spacing.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.heading,
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.caption,
    lineHeight: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },
  progressText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  badge: {
    marginLeft: Spacing.sm,
  },
});

export default AchievementCard;
