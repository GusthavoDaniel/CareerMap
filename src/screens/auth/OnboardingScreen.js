import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Bem-vindo ao CareerMap',
    subtitle: 'Seu guia definitivo para o sucesso profissional.',
    icon: 'rocket-outline',
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'Planejamento Inteligente',
    subtitle: 'Defina objetivos, acompanhe seu progresso e receba recomendações de IA.',
    icon: 'sparkles-outline',
    color: Colors.accent,
  },
  {
    id: '3',
    title: 'Design Extraordinário',
    subtitle: 'Uma experiência visual premium com animações e tema dark moderno.',
    icon: 'color-palette-outline',
    color: Colors.secondary,
  },
  {
    id: '4',
    title: 'Pronto para Começar?',
    subtitle: 'Transforme sua carreira hoje mesmo. Vamos lá!',
    icon: 'arrow-forward-circle-outline',
    color: Colors.accentPurple,
  },
];

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={[item.color + '20', Colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.slideBackground}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={120} color={item.color} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </LinearGradient>
    </View>
  );
};

const Pagination = ({ data, scrollX, currentIndex }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.textMuted, Colors.primary, Colors.textMuted],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.dot,
              { width: dotWidth, opacity, backgroundColor },
            ]}
          />
        );
      })}
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Final do Onboarding, navegar para a pilha de Autenticação
      navigation.replace("Auth");
    }
  };

  const skip = () => {
    // Pular Onboarding e ir para a tela de Login
    navigation.replace("Auth", { screen: "Login" });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        style={styles.flatList}
      />

      <View style={styles.footer}>
        <Pagination data={slides} scrollX={scrollX} currentIndex={currentIndex} />

        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 ? (
            <TouchableOpacity style={styles.skipButton} onPress={skip}>
              <Text style={styles.skipText}>Pular</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}

          <Button
            title={currentIndex === slides.length - 1 ? 'Começar Agora' : 'Próximo'}
            onPress={scrollTo}
            type="primary"
            iconName={currentIndex === slides.length - 1 ? 'rocket-outline' : 'arrow-forward-outline'}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    ...Shadows.large,
  },
  title: {
    ...Typography.title,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
  },
  footer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    ...Shadows.large,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: Spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: Spacing.sm,
  },
  skipText: {
    ...Typography.button,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  skipPlaceholder: {
    width: 80, // Para manter o alinhamento do botão Next
  },
  nextButton: {
    width: width * 0.5,
  },
});

export default OnboardingScreen;
