import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Hook customizado para feedback tátil (vibração)
 * Requer a instalação do expo-haptics: expo install expo-haptics
 */
const useHaptic = () => {
  // Verifica se o dispositivo suporta Haptics
  const isSupported = Platform.OS === 'ios' || Platform.OS === 'android';

  /**
   * Vibração leve para interações sutis (ex: toque em botão)
   */
  const lightImpact = () => {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  /**
   * Vibração média para interações importantes (ex: sucesso, confirmação)
   */
  const mediumImpact = () => {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  /**
   * Vibração forte para interações críticas (ex: erro, delete)
   */
  const heavyImpact = () => {
    if (isSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  /**
   * Vibração de notificação para sucesso
   */
  const notificationSuccess = () => {
    if (isSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  /**
   * Vibração de notificação para erro
   */
  const notificationError = () => {
    if (isSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return {
    lightImpact,
    mediumImpact,
    heavyImpact,
    notificationSuccess,
    notificationError,
  };
};

export default useHaptic;
