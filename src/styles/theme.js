import { StyleSheet } from 'react-native';

// Paleta de Cores Moderna e Profissional - Gradiente Azul/Roxo com Acentos Vibrantes
export const Colors = {
  // Cores Primárias - Gradiente Moderno
  primary: '#6366F1', // Indigo vibrante
  primaryDark: '#4F46E5', // Indigo escuro
  primaryLight: '#818CF8', // Indigo claro
  
  // Cores Secundárias - Acentos Vibrantes
  secondary: '#EC4899', // Pink vibrante
  secondaryDark: '#DB2777', // Pink escuro
  secondaryLight: '#F472B6', // Pink claro
  
  // Cores de Acento
  accent: '#10B981', // Verde esmeralda
  accentOrange: '#F59E0B', // Laranja vibrante
  accentPurple: '#8B5CF6', // Roxo
  accentCyan: '#06B6D4', // Ciano
  
  // Backgrounds
  background: '#0F172A', // Azul escuro profundo
  backgroundLight: '#1E293B', // Azul escuro médio
  cardBackground: '#1E293B', // Cards com fundo escuro
  cardBackgroundLight: '#334155', // Cards hover
  
  // Texto
  text: '#F1F5F9', // Texto principal claro
  textSecondary: '#94A3B8', // Texto secundário
  textMuted: '#64748B', // Texto desativado
  textDark: '#1E293B', // Texto escuro para fundos claros
  textLight: '#FFFFFF', // Texto claro
  
  // Bordas e Divisores
  border: '#334155', // Borda sutil
  borderLight: '#475569', // Borda clara
  
  // Estados
  success: '#10B981', // Verde sucesso
  error: '#EF4444', // Vermelho erro
  warning: '#F59E0B', // Amarelo aviso
  info: '#3B82F6', // Azul informação
  
  // Gradientes (para uso em componentes)
  gradientStart: '#6366F1',
  gradientMiddle: '#8B5CF6',
  gradientEnd: '#EC4899',
  
  // Overlays
  overlay: 'rgba(15, 23, 42, 0.8)',
  overlayLight: 'rgba(15, 23, 42, 0.4)',
  
  // Transparências
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Tipografia Moderna e Hierárquica
export const Typography = {
  // Títulos
  hero: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  
  // Corpo
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  
  // Utilitários
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Botões
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
};

// Sombras e Elevações
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Espaçamentos Consistentes
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Estilos Globais Modernos
export const GlobalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  
  // Cards Modernos
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardGradient: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.glow,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  // Botões
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  buttonOutline: {
    backgroundColor: Colors.transparent,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  // Tags e Badges
  tag: {
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
    backgroundColor: Colors.primaryLight,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  badge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.accent,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
  },
  
  // Inputs
  input: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: Colors.primary,
    ...Shadows.glow,
  },
  
  // Divisores
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  
  // Texto
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
  textMuted: {
    color: Colors.textSecondary,
  },
  
  // Flex Utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Animações (durações em ms)
export const Animations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export default {
  Colors,
  Typography,
  Shadows,
  Spacing,
  BorderRadius,
  GlobalStyles,
  Animations,
};
