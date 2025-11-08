import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import AnimatedView from '../../components/common/AnimatedView';
import AchievementCard from '../../components/ui/AchievementCard';
import CircularProgress from '../../components/ui/CircularProgress';

const AchievementsScreen = ({ navigation }) => {
  const { user } = useAuth();

  const achievements = [
    {
      id: 1,
      icon: 'rocket',
      title: 'Primeiro Passo',
      description: 'Completou o cadastro e fez o primeiro login no CareerMap',
      unlocked: true,
    },
    {
      id: 2,
      icon: 'map',
      title: 'Explorador de Carreira',
      description: 'Visitou todas as telas do aplicativo e explorou as funcionalidades',
      unlocked: true,
    },
    {
      id: 3,
      icon: 'construct',
      title: 'Mestre do CRUD',
      description: 'Criou, editou e excluiu objetivos profissionais com sucesso',
      unlocked: true,
    },
    {
      id: 4,
      icon: 'trophy',
      title: 'Planejador Estratégico',
      description: 'Definiu 5 objetivos de carreira de longo prazo',
      unlocked: false,
      progress: 60,
    },
    {
      id: 5,
      icon: 'chatbubbles',
      title: 'Conectado com a IA',
      description: 'Teve 10 conversas produtivas com o CareerBot',
      unlocked: false,
      progress: 30,
    },
    {
      id: 6,
      icon: 'school',
      title: 'Estudante Dedicado',
      description: 'Completou 3 cursos recomendados pela plataforma',
      unlocked: false,
      progress: 0,
    },
    {
      id: 7,
      icon: 'flame',
      title: 'Sequência de Fogo',
      description: 'Acessou o app por 30 dias consecutivos',
      unlocked: false,
      progress: 23,
    },
    {
      id: 8,
      icon: 'star',
      title: 'Estrela em Ascensão',
      description: 'Alcançou o Top 5% no ranking da sua turma',
      unlocked: false,
      progress: 0,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <AnimatedView animation="all" style={styles.heroContainer}>
          <LinearGradient
            colors={[Colors.secondary, Colors.accentPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroBackground}>
              <View style={[styles.heroCircle, styles.heroCircle1]} />
              <View style={[styles.heroCircle, styles.heroCircle2]} />
            </View>

            <View style={styles.heroContent}>
              <View style={styles.heroLeft}>
                <Text style={styles.heroTitle}>Conquistas 🏆</Text>
                <Text style={styles.heroSubtitle}>
                  Continue evoluindo e desbloqueie todas as badges!
                </Text>
                <View style={styles.heroStats}>
                  <View style={styles.heroStat}>
                    <Ionicons name="trophy" size={20} color={Colors.white} />
                    <Text style={styles.heroStatText}>
                      {unlockedCount} de {totalCount}
                    </Text>
                  </View>
                  <View style={styles.heroStat}>
                    <Ionicons name="flame" size={20} color={Colors.white} />
                    <Text style={styles.heroStatText}>7 dias</Text>
                  </View>
                </View>
              </View>

              <View style={styles.heroRight}>
                <CircularProgress
                  size={100}
                  strokeWidth={8}
                  progress={completionPercentage}
                  color={Colors.white}
                  label="Completo"
                />
              </View>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Stats Cards */}
        <AnimatedView animation="all" delay={100} style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: Colors.accent + '20' }]}>
              <Ionicons name="ribbon" size={24} color={Colors.accent} />
            </View>
            <Text style={styles.statValue}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>Desbloqueadas</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: Colors.primary + '20' }]}>
              <Ionicons name="trending-up" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>{totalCount - unlockedCount}</Text>
            <Text style={styles.statLabel}>Em Progresso</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: Colors.secondary + '20' }]}>
              <Ionicons name="star" size={24} color={Colors.secondary} />
            </View>
            <Text style={styles.statValue}>Top 10%</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </View>
        </AnimatedView>

        {/* Achievements List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suas Conquistas</Text>
            <Text style={styles.sectionSubtitle}>
              {unlockedCount} de {totalCount} desbloqueadas
            </Text>
          </View>

          {achievements.map((achievement, index) => (
            <AnimatedView key={achievement.id} animation="all" delay={index * 50}>
              <AchievementCard
                icon={achievement.icon}
                title={achievement.title}
                description={achievement.description}
                unlocked={achievement.unlocked}
                progress={achievement.progress}
                onPress={() => {
                  if (achievement.unlocked) {
                    // Mostrar detalhes ou animação
                  }
                }}
              />
            </AnimatedView>
          ))}
        </View>

        {/* Motivational Card */}
        <AnimatedView animation="all" delay={400} style={styles.motivationCard}>
          <LinearGradient
            colors={[Colors.primary, Colors.accentCyan]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.motivationGradient}
          >
            <Ionicons name="bulb" size={32} color={Colors.white} />
            <Text style={styles.motivationTitle}>Continue assim!</Text>
            <Text style={styles.motivationText}>
              Você está no caminho certo. Defina mais objetivos e continue
              evoluindo para desbloquear novas conquistas.
            </Text>
          </LinearGradient>
        </AnimatedView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  heroContainer: {
    marginBottom: Spacing.lg,
  },
  heroGradient: {
    padding: Spacing.xl,
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.2,
  },
  heroCircle1: {
    width: 120,
    height: 120,
    backgroundColor: Colors.white,
    top: -40,
    right: -20,
  },
  heroCircle2: {
    width: 80,
    height: 80,
    backgroundColor: Colors.white,
    bottom: -20,
    left: -10,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  heroTitle: {
    ...Typography.title,
    fontSize: 28,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    ...Typography.bodySmall,
    color: Colors.white + 'DD',
    marginBottom: Spacing.md,
  },
  heroStats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white + '20',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  heroStatText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
  },
  heroRight: {
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.title,
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading,
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  motivationCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.large,
  },
  motivationGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  motivationTitle: {
    ...Typography.heading,
    fontSize: 20,
    color: Colors.white,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  motivationText: {
    ...Typography.bodySmall,
    color: Colors.white + 'DD',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AchievementsScreen;
