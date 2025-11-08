import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { GlobalStyles, Typography, Colors } from '../styles/theme';

const AboutScreen = () => {
  // Simulação do hash do commit. Em um app real, isso seria injetado no build.
  const commitHash = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0';

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={styles.title}>Sobre o CareerMap</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações da Aplicação</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Versão do Aplicativo:</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Desenvolvido para:</Text>
          <Text style={styles.value}>Global Solution 2025 - FIAP</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tecnologia:</Text>
          <Text style={styles.value}>React Native (Expo)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hash de Referência</Text>
        <Text style={styles.hashText}>{commitHash}</Text>
        <Text style={styles.note}>
          Este hash identifica a versão exata do código-fonte submetido.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Visão Geral do Projeto</Text>
        <Text style={styles.value}>
          O CareerMap é uma plataforma que utiliza Inteligência Artificial para mapear carreiras, competências e cursos, sugerindo trilhas de desenvolvimento personalizadas.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
    color: Colors.primary,
    marginBottom: 20,
  },
  card: {
    ...GlobalStyles.card,
    marginBottom: 20,
  },
  cardTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  value: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  hashText: {
    ...Typography.body,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', // Corrigido: Platform importado
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  note: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default AboutScreen;
