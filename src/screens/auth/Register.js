import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    const success = await signUp(name, email, password);
    setLoading(false);

    if (success) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={styles.backgroundGradient}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
        <View style={[styles.gradientCircle, styles.circle3]} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="person-add" size={40} color={Colors.white} />
              </View>
            </View>
            
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Comece sua jornada profissional agora
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.formInputs}>
              <Input
                label="Nome Completo"
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
                iconName="person-outline"
              />

              <Input
                label="E-mail"
                placeholder="seu.email@fiap.com.br"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                iconName="mail-outline"
              />

              <Input
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                iconName="lock-closed-outline"
              />

              <Input
                label="Confirmar Senha"
                placeholder="Digite a senha novamente"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                iconName="lock-closed-outline"
              />
            </View>

            <Button
              title="Criar Conta"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
              iconName="rocket-outline"
            />

            <View style={styles.termsContainer}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.termsText}>
                Ao criar uma conta, você concorda com nossos termos de uso
              </Text>
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.15,
  },
  circle1: {
    width: 250,
    height: 250,
    backgroundColor: Colors.secondary,
    top: -80,
    left: -80,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: Colors.accentPurple,
    top: height * 0.4,
    right: -60,
  },
  circle3: {
    width: 180,
    height: 180,
    backgroundColor: Colors.primary,
    bottom: -50,
    left: -40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: Spacing.sm,
  },
  logoContainer: {
    marginBottom: Spacing.md,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glow,
  },
  title: {
    ...Typography.hero,
    fontSize: 32,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    color: Colors.textSecondary,
    maxWidth: 280,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.large,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formInputs: {
    marginBottom: Spacing.md,
  },
  registerButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.secondary,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  termsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
    flex: 1,
    lineHeight: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  loginLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default RegisterScreen;
