import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

/**
 * Componente de View com animação de entrada
 * Suporta fade, slide e scale
 */
const AnimatedView = ({ 
  children, 
  style, 
  animation = 'fade', 
  delay = 0, 
  duration = 600 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const animations = [];

    if (animation === 'fade' || animation === 'all') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    if (animation === 'slide' || animation === 'all') {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    if (animation === 'scale' || animation === 'all') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, []);

  const animatedStyle = {
    opacity: animation === 'fade' || animation === 'all' ? fadeAnim : 1,
    transform: [
      ...(animation === 'slide' || animation === 'all'
        ? [{ translateY: slideAnim }]
        : []),
      ...(animation === 'scale' || animation === 'all'
        ? [{ scale: scaleAnim }]
        : []),
    ],
  };

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
