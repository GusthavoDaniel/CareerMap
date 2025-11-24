import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, Typography } from '../../styles/theme';
import Button from '../../components/common/Button';

// util p/ horas
const h = (n) => `${n}h`;

/* 🔵 TRILHA FIXA — DEVOPS */
const TRAIL = {
  title: 'Trilha de DevOps',
  career: 'DevOps',
  justification:
    'Guilherme demonstra forte interesse em Backend e Cloud, além de preferir a área de DevOps. A carreira de DevOps é ideal, pois une o desenvolvimento de aplicações (Backend) com as operações de infraestrutura (Cloud, automação, monitoramento), capacitando-o a construir, implantar e gerenciar sistemas de forma eficiente e escalável. É uma área com alta demanda, que permite explorar a infraestrutura, a nuvem e dar suporte a aplicações de IA e Backend.',
  steps: [
    {
      title: 'Fundamentos de Linux e Controle de Versão (Git)',
      duration: h(12),
      description:
        'Dominar a linha de comando Linux, comandos essenciais, gerenciamento de arquivos e permissões. Aprender Git (clone, add, commit, push, pull), branches, merges e resolução de conflitos.',
      resources: [],
    },
    {
      title: 'Introdução ao Cloud Computing (AWS)',
      duration: h(16),
      description:
        'Conceitos de nuvem e serviços fundamentais: EC2 (VMs), S3 (armazenamento), VPC (rede) e IAM (identidades). Criar conta free tier e fazer experimentos práticos.',
      resources: [],
    },
    {
      title: 'Programação e Scripting para Automação (Python)',
      duration: h(20),
      description:
        'Lógica em Python focada em automação: manipulação de arquivos, estruturas de dados, interação com APIs REST e uso do boto3 para AWS.',
      resources: [],
    },
    {
      title: 'Containerização com Docker',
      duration: h(16),
      description:
        'Conceitos de containers, criação e gerenciamento com Docker. Escrever Dockerfiles para aplicações backend, construir imagens e executar serviços localmente.',
      resources: [],
    },
    {
      title: 'Integração e Entrega Contínuas (CI/CD) com GitHub Actions',
      duration: h(12),
      description:
        'Princípios de CI/CD. Configurar pipelines de build, testes e deploy. Criar workflow para compilar app, rodar testes e publicar imagem Docker.',
      resources: [],
    },
    {
      title: 'Infraestrutura como Código (IaC) com Terraform',
      duration: h(24),
      description:
        'Fundamentos de IaC. Provisionar EC2, S3, VPC e security groups na AWS de forma declarativa. Entender o ciclo de vida: plan, apply, destroy.',
      resources: [],
    },
    {
      title: 'Monitoramento Básico e Observabilidade',
      duration: h(16),
      description:
        'Noções de monitoramento, logging e observabilidade. Usar Prometheus para métricas e Grafana para dashboards e alertas.',
      resources: [],
    },
    {
      title: 'Projeto Prático Integrado: Deploy de uma API na Nuvem',
      duration: h(32),
      description:
        'Desenvolver uma API simples, empacotar com Docker, pipeline CI/CD (GitHub Actions) para deploy em EC2 provisionado por Terraform e monitorar com Grafana.',
      resources: [],
    },
  ],
};

export default function TrailRoadmap() {
  const handleResourcePress = (url) => {
    if (!url) return;
    Linking.openURL(url).catch((err) => console.error("Couldn't open url", err));
  };

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={[GlobalStyles.container, { flex: 1 }]}>
        <Text style={styles.title}>🗺️ {TRAIL.title}</Text>
        <Text style={styles.subtitle}>Carreira Foco: {TRAIL.career}</Text>
        <Text style={styles.justification}>{TRAIL.justification}</Text>

        <View style={styles.roadmapContainer}>
          {TRAIL.steps.map((step, index) => (
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

              {Array.isArray(step.resources) && step.resources.length > 0 && (
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

              {index < TRAIL.steps.length - 1 && <View style={styles.connector} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Salvar no Histórico" icon="save-outline" onPress={() => alert('Trilha salva!')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 100 },
  title: { ...Typography.title, color: Colors.text, marginBottom: 5 },
  subtitle: { ...Typography.subtitle, color: Colors.primary, marginBottom: 10 },
  justification: { ...Typography.body, color: Colors.textSecondary, marginBottom: 15 },
  roadmapContainer: { paddingLeft: 10 },
  stepContainer: { marginBottom: 30, position: 'relative', paddingLeft: 20 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepNumberContainer: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.secondary,
    justifyContent: 'center', alignItems: 'center', position: 'absolute', left: -25, zIndex: 10,
    borderWidth: 3, borderColor: Colors.background,
  },
  stepNumber: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  stepTitleContainer: { flex: 1 },
  stepTitle: { ...Typography.subtitle, color: Colors.text },
  stepDuration: { ...Typography.caption, color: Colors.primary, marginTop: 2 },
  stepDescription: { ...Typography.body, color: Colors.textSecondary, marginBottom: 10, marginLeft: 10 },
  resourcesContainer: {
    backgroundColor: Colors.cardBackground, borderRadius: 8, padding: 10, marginLeft: 10, marginTop: 5,
    borderLeftWidth: 3, borderLeftColor: Colors.primary,
  },
  resourcesTitle: { ...Typography.caption, color: Colors.text, fontWeight: 'bold', marginBottom: 5 },
  resourceButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  resourceText: { ...Typography.caption, color: Colors.secondary, marginLeft: 5, textDecorationLine: 'underline' },
  connector: { position: 'absolute', top: 0, bottom: -30, left: 0, width: 2, backgroundColor: Colors.primary + '55' },
  body: { ...Typography.body, color: Colors.textSecondary },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15,
    backgroundColor: Colors.cardBackground, borderTopWidth: 1, borderTopColor: Colors.border,
  },
});
