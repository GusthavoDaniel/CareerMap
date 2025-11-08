import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { generateTrailDotNet, generateTrailPython } from '../../api/endpoints';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import Button from '../../components/common/Button';

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'trail', label: 'Trilhas' },
  { id: 'course', label: 'Cursos' },
  { id: 'job', label: 'Vagas' },
];

const recommendations = [
  {
    id: 'trail-cloud',
    type: 'trail',
    title: 'Trilha Sugerida: Especialista em Cloud',
    tags: ['AWS', 'Azure', 'DevOps'],
    body:
      'Seu perfil demonstra alta afinidade com infraestrutura e escalabilidade. ' +
      'Recomendamos esta trilha para acelerar sua carreira em Cloud Computing.',
    iconName: 'cloud-outline',
    accentColor: Colors.primary,
    match: 92,
    navigateTo: 'Dashboard',
  },
  {
    id: 'course-python-ds',
    type: 'course',
    title: 'Curso: Python para Data Science',
    tags: ['DataScience', 'Python'],
    body:
      'Para complementar suas habilidades analíticas, este curso é o próximo passo ideal.',
    iconName: 'school-outline',
    accentColor: Colors.secondary || Colors.primary,
    match: 86,
    navigateTo: 'Goals',
  },
  {
    id: 'course-spring',
    type: 'course',
    title: 'Curso: Microsserviços com Spring Boot',
    tags: ['Java', 'APIs', 'Spring'],
    body:
      'Aprofunde APIs REST, microsserviços e boas práticas de back-end empresarial.',
    iconName: 'construct-outline',
    accentColor: Colors.primary,
    match: 88,
    navigateTo: 'Goals',
  },
  {
    id: 'job-fullstack',
    type: 'job',
    title: 'Vaga Alvo: Dev Full Stack Jr. (Cloud First)',
    tags: ['FullStack', 'Cloud'],
    body:
      'Perfil aderente a squads que utilizam React, Java, bancos SQL/NoSQL e ferramentas de nuvem.',
    iconName: 'briefcase-outline',
    accentColor: Colors.primary,
    match: 79,
    navigateTo: 'Dashboard',
  },
];

const RecommenderScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTrail = async (usePythonApi = false) => {
    setIsLoading(true);
    try {
      const apiCall = usePythonApi ? generateTrailPython : generateTrailDotNet;

      const params = usePythonApi
        ? {
            nome: 'Aluno FIAP',
            interesses: ['Cloud Computing', 'Data Science'],
            experiencia: 'Estudante',
            prefere_areas: ['Back-end', 'DevOps'],
            horas_por_semana: 15,
          }
        : {
            areaInteresse: 'Desenvolvedor Full Stack',
            nivelAtual: 'Júnior',
            competencias: ['APIs REST', 'Azure'],
          };

      const res = await apiCall(params);

      // 🔒 Suporta ambos formatos: `{ data }` OU `data`
      const trail = res?.data ?? res;
      if (!trail) {
        throw new Error('Resposta vazia da API.');
      }

      navigation.navigate('TrailRoadmap', { trail });
    } catch (error) {
      console.error('[Trail Generate] ', error);
      const status = error?.status || error?.response?.status;
      const detail =
        error?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        'Falha ao gerar trilha.';
      Alert.alert(
        'Erro ao gerar trilha',
        `${detail}${status ? ` (HTTP ${status})` : ''}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecommendations =
    selectedFilter === 'all'
      ? recommendations
      : recommendations.filter((rec) => rec.type === selectedFilter);

  return (
    <ScrollView
      style={[GlobalStyles.container, { flex: 1 }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="sparkles-outline" size={24} color={Colors.primary} />
          <Text style={styles.title}>Recomendador Inteligente</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="cloud-outline" size={14} color={Colors.primary} />
          <Text style={styles.badgeText}>Simulação de API</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Simulação de integração com a API de Recomendações (.NET / Python - Extra)
      </Text>
      <Text style={styles.body}>
        Esta tela apresenta uma lista dinâmica de trilhas, cursos e vagas
        sugeridas pela API, baseadas no seu perfil e progresso dentro do
        CareerMap.
      </Text>

      {/* Geração de Trilha com IA */}
      <View style={styles.generateTrailContainer}>
        <Text style={styles.generateTrailTitle}>
          Geração de Trilha Personalizada com IA
        </Text>
        <Text style={styles.generateTrailSubtitle}>
          Simule a geração de uma trilha com base em seus interesses atuais.
        </Text>
        <Button
          title="Gerar Trilha (API .NET)"
          icon="rocket-outline"
          onPress={() => handleGenerateTrail(false)}
          isLoading={isLoading}
          disabled={isLoading}
          style={styles.generateTrailButton}
        />
        <Button
          title="Gerar Trilha (API Python - Extra)"
          icon="flask-outline"
          onPress={() => handleGenerateTrail(true)}
          type="secondary"
          isLoading={isLoading}
          disabled={isLoading}
          style={styles.generateTrailButton}
        />
      </View>

      {/* Filtros */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[
              styles.filterChip,
              selectedFilter === f.id && styles.filterChipActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedFilter(f.id)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === f.id && styles.filterChipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista filtrada de recomendações */}
      {filteredRecommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          title={rec.title}
          tags={rec.tags}
          body={rec.body}
          iconName={rec.iconName}
          accentColor={rec.accentColor}
          type={rec.type}
          match={rec.match}
          onPress={() => navigation.navigate(rec.navigateTo)}
        />
      ))}
    </ScrollView>
  );
};

const RecommendationCard = ({
  title,
  tags,
  body,
  onPress,
  iconName = 'bulb-outline',
  accentColor = Colors.primary,
  type,
  match,
}) => {
  const typeLabel =
    type === 'trail'
      ? 'Trilha personalizada'
      : type === 'course'
      ? 'Curso recomendado'
      : 'Vaga alvo sugerida';

  // 🔒 Proteções de render (evita crash com dados indefinidos)
  const safeTags = Array.isArray(tags) ? tags : [];
  const hasMatch = typeof match === 'number';

  return (
    <TouchableOpacity
      style={[styles.recommendationCard, { borderLeftColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.iconCircle}>
            {iconName && typeof iconName === 'string' && (
              <Ionicons name={iconName} size={20} color={accentColor} />
            )}
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.recTitle}>{title}</Text>
            <Text style={styles.recType}>{typeLabel}</Text>
          </View>
        </View>

        {hasMatch && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchValue}>{match}%</Text>
            <Text style={styles.matchLabel}>match</Text>
          </View>
        )}
      </View>

      <View style={styles.tagContainer}>
        {safeTags.map((tag) => (
          <Text key={String(tag)} style={styles.recTag}>
            #{String(tag)}
          </Text>
        ))}
      </View>

      <Text style={styles.recBody}>{body}</Text>

      <View style={styles.actionRow}>
        <Text style={styles.actionText}>Ver detalhes</Text>
        <Ionicons name="arrow-forward" size={16} color={accentColor} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
    alignItems: 'stretch',
  },
  generateTrailContainer: {
    ...GlobalStyles.card,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  generateTrailTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    marginBottom: 4,
  },
  generateTrailSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  generateTrailButton: { alignSelf: 'flex-start' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  title: {
    ...Typography.title,
    color: Colors.primary,
    marginLeft: 8,
    flexShrink: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: 6,
  },
  subtitle: {
    ...Typography.subtitle,
    color: Colors.text,
    marginBottom: 6,
  },
  body: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  recommendationCard: {
    ...GlobalStyles.card,
    alignSelf: 'stretch',
    width: '100%',
    marginBottom: 16,
    borderLeftWidth: 4,
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginRight: 10,
  },
  recTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    flexShrink: 1,
  },
  recType: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  matchBadge: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  matchValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
  matchLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginTop: 4,
  },
  recTag: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    maxWidth: '100%',
  },
  recBody: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  actionText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default RecommenderScreen;
