import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/theme';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Telas de Autenticação
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';

// Telas Extraordinárias
import VisionScreen from '../screens/app/VisionScreen'; // 7. Visão Computacional (Deep Learning)
import IotScreen from '../screens/app/IotScreen'; // 8. Simulação IoT/IoB
import CareerBotScreen from '../screens/app/CareerBot';      // 1. Chat de Carreira com IA
import DashboardScreen from '../screens/app/Dashboard';      // 2. Dashboard Interativo
import GoalPlannerScreen from '../screens/app/GoalPlanner';  // 3. Planejador de Objetivos (CRUD)
import RecommenderScreen from '../screens/app/Recommender';  // 4. Recomendador Inteligente
import MapScreen from '../screens/app/Map';                  // 5. Mapa de Oportunidades
import AchievementsScreen from '../screens/app/Achievements';// 6. Conquistas e Badges
import ProfileManagementScreen from '../screens/app/ProfileManagement';
import CareerCatalogScreen from '../screens/app/CareerCatalog';
import CourseCatalogScreen from '../screens/app/CourseCatalog';
import TrailRoadmapScreen from '../screens/app/TrailRoadmap';


// Telas Auxiliares
import AboutScreen from '../screens/About';
import { useAuth } from '../context/AuthContext';

const AuthStack = createStackNavigator();
const AppTab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const AppTabNavigator = () => (
  <AppTab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Dashboard':
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            break;
          case 'CareerBot':
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            break;
          case 'Goals':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Map':
            iconName = focused ? 'map' : 'map-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            break;
          default:
            iconName = focused ? 'information-circle' : 'information-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarStyle: {
        backgroundColor: Colors.cardBackground,
        borderTopColor: Colors.border,
        paddingBottom: 5,
        height: 60,
      },
    })}
  >
    <AppTab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'Evolução' }}
    />
    <AppTab.Screen
      name="CareerBot"
      component={CareerBotScreen}
      options={{ title: 'CareerBot' }}
    />
    <AppTab.Screen
      name="Goals"
      component={GoalPlannerScreen}
      options={{ title: 'Objetivos' }}
    />
    <AppTab.Screen
      name="Map"
      component={MapScreen}
      options={{ title: 'Oportunidades' }}
    />
    <AppTab.Screen
      name="Profile"
      component={ProfileManagementScreen}
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-outline" color={color} size={size} />
        ),
      }}
    />
  </AppTab.Navigator>
);

const RootNavigator = () => {
  // 🔥 pega os nomes corretos do contexto
  const { isAuthenticated, isLoading } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null); // null: carregando, true: primeiro acesso, false: já acessou
  


  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
        if (alreadyLaunched === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (e) {
        console.error("Erro ao verificar primeiro acesso:", e);
        setIsFirstLaunch(false); // Assume que já acessou em caso de erro
      }
    };
    checkFirstLaunch();
  }, []);

  // Se ainda estiver carregando o estado de primeiro acesso, mostre o loading
  if (isFirstLaunch === null || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <RootStack.Screen name="App" component={AppTabNavigator} />
      ) : isFirstLaunch ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} initialParams={{ screen: 'Login' }} />
      )}

      {/* Telas que podem ser acessadas de qualquer lugar, como a tela Sobre e o Recomendador */}
      <RootStack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: true, headerTitle: 'Sobre o App' }}
      />
      <RootStack.Screen
        name="Recommender"
        component={RecommenderScreen}
        options={{ headerShown: true, headerTitle: 'Recomendador' }}
      />
      <RootStack.Screen
        name="CareerCatalog"
        component={CareerCatalogScreen}
        options={{ headerShown: true, headerTitle: 'Catálogo de Carreiras' }}
      />
      <RootStack.Screen
        name="CourseCatalog"
        component={CourseCatalogScreen}
        options={{ headerShown: true, headerTitle: 'Catálogo de Cursos' }}
      />
      <RootStack.Screen
        name="TrailRoadmap"
        component={TrailRoadmapScreen}
        options={{ headerShown: true, headerTitle: 'Trilha Gerada' }}
      />
      <RootStack.Screen
        name="Vision"
        component={VisionScreen}
        options={{ headerShown: true, headerTitle: 'Visão Computacional' }}
      />
      <RootStack.Screen
        name="Iot"
        component={IotScreen}
        options={{ headerShown: true, headerTitle: 'Simulação IoT/IoB' }}
      />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);
