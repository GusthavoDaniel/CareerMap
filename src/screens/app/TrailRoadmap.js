import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, Typography } from '../../styles/theme';
import Button from '../../components/common/Button';

export default function TrailRoadmap() {
  const route = useRoute();
  const trailRaw = route?.params?.trail || {};

  // Normalização de campos (PT-BR da .NET ou EN da Python)
  const trail = {
    title: trailRaw.titulo || trailRaw.title || 'Trilha',
    career: trailRaw.carreira || trailRaw.career || '',
    steps: Array.isArray(trailRaw.steps) ? trailRaw.steps : [],
  };

  const handleResourcePress = (url) => {
    if (!url) return;
    Linking.openURL(url).catch((err) => console.error("Couldn't open url", err));
  };

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={[GlobalStyles.container, { flex: 1 }]}>
        <Text style={styles.title}>🗺️ {trail.title}</Text>
        {!!trail.career && <Text style={styles.subtitle}>Carreira Foco: {trail.career}</Text>}

        <View style={styles.roadmapContainer}>
          {trail.steps.length === 0 ? (
            <Text style={styles.body}>Nenhum passo encontrado.</Text>
          ) : (
            trail.steps.map((s, index) => {
              const step = {
                title: s.titulo || s.title || `Passo ${index + 1}`,
                duration: s.duracao || s.duration || '',
                description: s.descricao || s.description || '',
                resources: Array.isArray(s.recursos) ? s.recursos : (Array.isArray(s.resources) ? s.resources : []),
              };
              return (
                <View key={index} style={styles.stepContainer}>
                  <View style={styles.stepHeader}>
                    <View style={styles.stepNumberContainer}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.stepTitleContainer}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      {!!step.duration && (
                        <Text style={styles.stepDuration}>
                          <Ionicons name="time-outline" size={14} color={Colors.primary} /> {step.duration}
                        </Text>
                      )}
                    </View>
                  </View>

                  {!!step.description && <Text style={styles.stepDescription}>{step.description}</Text>}

                  {step.resources.length > 0 && (
                    <View style={styles.resourcesContainer}>
                      <Text style={styles.resourcesTitle}>Recursos Recomendados:</Text>
                      {step.resources.map((r, j) => (
                        <TouchableOpacity
                          key={j}
                          style={styles.resourceButton}
                          onPress={() => handleResourcePress(r.link || r.url)}
                        >
                          <Ionicons name="link-outline" size={16} color={Colors.secondary} />
                          <Text style={styles.resourceText}>{r.nome || r.name || 'Recurso'}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {index < trail.steps.length - 1 && <View style={styles.connector} />}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Salvar no Histórico" icon="save-outline" onPress={() => alert('Trilha salva!')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: 5,
  },
  subtitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 15,
  },
  roadmapContainer: {
    paddingLeft: 10,
  },
  stepContainer: {
    marginBottom: 30,
    position: 'relative',
    paddingLeft: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -25,
    zIndex: 10,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepTitleContainer: {
    flex: 1,
  },
  stepTitle: {
    ...Typography.subtitle,
    color: Colors.text,
  },
  stepDuration: {
    ...Typography.caption,
    color: Colors.primary,
    marginTop: 2,
  },
  stepDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 10,
    marginLeft: 10,
  },
  resourcesContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
    marginTop: 5,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  resourcesTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  resourceText: {
    ...Typography.caption,
    color: Colors.secondary,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  connector: {
    position: 'absolute',
    top: 0,
    bottom: -30,
    left: 0,
    width: 2,
    backgroundColor: Colors.primary + '55',
  },
  body: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
