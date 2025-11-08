// src/screens/app/Dashboard.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '../../styles/theme';

const competencyData = [
  { label: 'Front-end (React / RN)', value: 85, color: Colors.primary },
  { label: 'Back-end (Java / APIs)', value: 78, color: Colors.secondary },
  { label: 'Banco de Dados', value: 72, color: Colors.accentPurple },
  { label: 'Cloud / DevOps', value: 68, color: Colors.accentCyan },
  { label: 'Soft Skills', value: 92, color: Colors.accent },
];

const steps = [
  { id: 1, title: 'Finalizar módulo de React Native', description: 'Implementar telas de login, dashboard e perfil.', date: 'Até quinta-feira', statusLabel: 'Em andamento' },
  { id: 2, title: 'Publicar API no Azure', description: 'Subir API Spring no App Service com DB.', date: 'Este fim de semana', statusLabel: 'Atrasado' },
  { id: 3, title: 'Revisar trilha com IA', description: 'Rodar recomendador e ajustar objetivos.', date: 'Próxima semana', statusLabel: 'Planejado' },
];

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Aluno';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* HERO (Gradiente) */}
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroDecor}>
            <View style={[styles.heroBubble, styles.b1]} />
            <View style={[styles.heroBubble, styles.b2]} />
          </View>

          <View style={styles.heroRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Olá, {firstName} 👋</Text>
              <Text style={styles.heroTitle}>Dashboard de Evolução</Text>
              <Text style={styles.heroSubtitle}>
                Acompanhe seu progresso e deixe a IA guiar seus próximos passos
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                activeOpacity={0.92}
                onPress={() => navigation.navigate('Recommender')}
              >
                <Ionicons name="sparkles" size={18} color={Colors.white} />
                <Text style={styles.heroButtonText}>Recomendações IA</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.heroRight}>
              <View style={styles.badge}>
                <Ionicons name="flame" size={14} color={Colors.secondary} />
                <Text style={styles.badgeText}>Full Stack</Text>
              </View>

              <View style={styles.scoreCircle}>
                <Text style={styles.scoreValue}>82</Text>
                <Text style={styles.scoreLabel}>Score</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* KPIs */}
        <View style={styles.kpiRow}>
          {[
            { icon: 'trending-up', color: Colors.primary, label: 'Evolução', value: '+18%', detail: 'vs. mês anterior' },
            { icon: 'trophy', color: Colors.secondary, label: 'Ranking', value: 'Top 10%', detail: 'da turma FIAP' },
            { icon: 'flame', color: Colors.accent, label: 'Dias', value: '7', detail: 'em sequência' },
          ].map((k) => (
            <View key={k.label} style={styles.kpiCard}>
              <View style={[styles.kpiIcon, { backgroundColor: k.color + '22' }]}>
                <Ionicons name={k.icon} size={24} color={k.color} />
              </View>
              <Text style={styles.kpiValue}>{k.value}</Text>
              <Text style={styles.kpiLabel}>{k.label}</Text>
              <Text style={styles.kpiDetail}>{k.detail}</Text>
            </View>
          ))}
        </View>

        {/* Competências */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Radar de Competências</Text>
              <Text style={styles.cardSubtitle}>Suas habilidades em destaque</Text>
            </View>
            <Ionicons name="pulse-outline" size={24} color={Colors.primary} />
          </View>

          {competencyData.map((item) => (
            <View key={item.label} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillLabel}>{item.label}</Text>
                <Text style={styles.skillPercent}>{item.value}%</Text>
              </View>
              <View style={styles.skillBarBg}>
                <View style={[styles.skillBarFill, { width: `${item.value}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Trilha Atual */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Trilha Atual</Text>
              <Text style={styles.cardSubtitle}>Especialização Full Stack & Cloud</Text>
            </View>
            <Ionicons name="layers-outline" size={24} color={Colors.secondary} />
          </View>

          <View style={styles.tags}>
            {['Front-end', 'Back-end', 'Cloud / DevOps'].map((t) => (
              <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
            ))}
          </View>

          <View style={styles.trackBox}>
            <View style={styles.trackItem}>
              <Text style={styles.trackLabel}>Módulos</Text>
              <Text style={styles.trackValue}>8 / 12</Text>
            </View>
            <View style={styles.trackDivider} />
            <View style={styles.trackItem}>
              <Text style={styles.trackLabel}>Progresso</Text>
              <Text style={styles.trackValue}>66%</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('Goals')}>
            <Text style={styles.trackBtnText}>Ver objetivos da trilha</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Próximos Passos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Próximos Passos</Text>
              <Text style={styles.cardSubtitle}>Organize sua semana</Text>
            </View>
            <Ionicons name="calendar-outline" size={24} color={Colors.accentPurple} />
          </View>

          {steps.map((s, i) => (
            <View key={s.id} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={styles.timelineDot} />
                {i < steps.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTitle}>{s.title}</Text>
                  <View style={styles.timelineBadge}>
                    <Text style={styles.timelineBadgeText}>{s.statusLabel}</Text>
                  </View>
                </View>
                <Text style={styles.timelineDesc}>{s.description}</Text>
                <Text style={styles.timelineDate}>{s.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  /* HERO */
  heroCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.large,
  },
  heroDecor: { position: 'absolute', width: '100%', height: '100%' },
  heroBubble: { position: 'absolute', borderRadius: 9999, opacity: 0.12, backgroundColor: Colors.white },
  b1: { width: 160, height: 160, top: -40, right: -30 },
  b2: { width: 110, height: 110, bottom: -30, left: -25 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },

  greeting: { ...Typography.bodySmall, color: Colors.white, opacity: 0.9, marginBottom: Spacing.xs },
  heroTitle: { ...Typography.title, color: Colors.white, fontSize: 28, lineHeight: 32, marginBottom: Spacing.xs },
  heroSubtitle: { ...Typography.bodySmall, color: Colors.white, opacity: 0.9, marginBottom: Spacing.lg, maxWidth: 230 },

  heroButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.black + '33',
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md, gap: Spacing.xs,
  },
  heroButtonText: { ...Typography.button, color: Colors.white, fontSize: 14, marginHorizontal: Spacing.xs },

  heroRight: { alignItems: 'flex-end' },
  badge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white + '15',
    paddingVertical: Spacing.xs, paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm, marginBottom: Spacing.md, gap: Spacing.xs,
  },
  badgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  scoreCircle: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.black + '22',
    alignItems: 'center', justifyContent: 'center',
  },
  scoreValue: { ...Typography.title, color: Colors.white, fontSize: 28 },
  scoreLabel: { ...Typography.caption, color: Colors.white, opacity: 0.9 },

  /* KPIs */
  kpiRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  kpiCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  kpiIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  kpiValue: { ...Typography.title, fontSize: 24, marginBottom: Spacing.xs, fontWeight: '800' },
  kpiLabel: { ...Typography.caption, fontWeight: '600', marginBottom: 2 },
  kpiDetail: { ...Typography.caption, fontSize: 10, color: Colors.textMuted },

  /* CARDS BASE */
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  cardTitle: { ...Typography.heading, marginBottom: Spacing.xs, fontWeight: '700' },
  cardSubtitle: { ...Typography.caption, color: Colors.textSecondary },

  /* SKILLS */
  skillRow: { marginBottom: Spacing.md },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  skillLabel: { ...Typography.bodySmall, fontWeight: '500' },
  skillPercent: { ...Typography.bodySmall, fontWeight: '700', color: Colors.primary },
  skillBarBg: {
    height: 8, backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.sm, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  skillBarFill: { height: '100%', borderRadius: BorderRadius.sm },

  /* TRACK */
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.md },
  tag: { backgroundColor: Colors.primary + '22', paddingVertical: Spacing.xs, paddingHorizontal: Spacing.sm, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.border },
  tagText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },

  trackBox: { flexDirection: 'row', backgroundColor: Colors.backgroundLight, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  trackItem: { flex: 1, alignItems: 'center' },
  trackDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: Spacing.md },
  trackLabel: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.xs },
  trackValue: { ...Typography.heading, color: Colors.primary },

  trackBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 2, borderColor: Colors.primary, gap: Spacing.sm },
  trackBtnText: { ...Typography.button, color: Colors.primary },

  /* TIMELINE */
  timelineRow: { flexDirection: 'row', marginBottom: Spacing.lg },
  timelineLeft: { alignItems: 'center', marginRight: Spacing.md },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.border, marginTop: Spacing.xs },
  timelineContent: { flex: 1 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  timelineTitle: { ...Typography.bodySmall, fontWeight: '600', flex: 1 },
  timelineBadge: { paddingVertical: 2, paddingHorizontal: Spacing.sm, borderRadius: BorderRadius.sm, backgroundColor: Colors.primary + '22' },
  timelineBadgeText: { ...Typography.caption, fontSize: 10, fontWeight: '700', color: Colors.primary },
  timelineDesc: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.xs, lineHeight: 16 },
  timelineDate: { ...Typography.caption, color: Colors.textMuted, fontSize: 11 },
});
