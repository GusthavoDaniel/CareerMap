import React, { useRef, useEffect } from 'react';
import { RefreshControl, Animated, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/theme';

/**
 * Componente de RefreshControl customizado com animação de foguete
 */
const CustomRefreshControl = ({ refreshing, onRefresh }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (refreshing) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [refreshing]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={Colors.primary}
      colors={[Colors.primary, Colors.secondary]}
      progressBackgroundColor={Colors.cardBackground}
      title="Atualizando CareerMap..."
      titleColor={Colors.textSecondary}
      // Adiciona um componente customizado para o indicador
      // Nota: A customização completa do indicador é limitada no React Native padrão,
      // mas podemos usar o `tintColor` e `colors` para um visual premium.
      // Para um indicador de foguete, seria necessário um componente de terceiros ou Lottie.
      // Usaremos o tintColor e colors para um visual premium.
    />
  );
};

const styles = StyleSheet.create({
  // Estilos para um indicador customizado (se possível)
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default CustomRefreshControl;
