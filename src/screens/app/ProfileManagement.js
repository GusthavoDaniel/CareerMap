import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import AnimatedView from '../../components/common/AnimatedView';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SkillCard from '../../components/ui/SkillCard';

const ProfileManagementScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState(user?.name || 'Aluno FIAP');
  const [email, setEmail] = useState(user?.email || 'user@fiap.com.br');
  const [career, setCareer] = useState('Desenvolvedor Full Stack');
  const [loading, setLoading] = useState(false);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  const firstName = name.split(' ')[0] || 'Aluno';

  const skills = [
    { icon: 'logo-react', name: 'React Native', level: 'Avançado', progress: 85, color: Colors.primary },
    { icon: 'logo-nodejs', name: 'Node.js', level: 'Intermediário', progress: 72, color: Colors.accent },
    { icon: 'server', name: 'APIs REST', level: 'Avançado', progress: 88, color: Colors.secondary },
    { icon: 'cloud', name: 'Cloud / Azure', level: 'Básico', progress: 45, color: Colors.accentCyan },
  ];

  const stats = [
    { icon: 'calendar', value: '127', label: 'Dias ativos' },
    { icon: 'trophy', value: '12', label: 'Conquistas' },
    { icon: 'trending-up', value: '+28%', label: 'Evolução' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Perfil atualizado com sucesso! ✅');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <AnimatedView animation="all" style={styles.headerContainer}>
          <LinearGradient
            colors={[Colors.primary, Colors.accentPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerBackground}>
              <View style={[styles.headerCircle, styles.headerCircle1]} />
              <View style={[styles.headerCircle, styles.headerCircle2]} />
            </View>

            <View style={styles.headerContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color={Colors.white} />
                </TouchableOpacity>
              </View>

              <Text style={styles.headerName}>{name}</Text>
              <Text style={styles.headerEmail}>{email}</Text>
              <View style={styles.headerBadge}>
                <Ionicons name="briefcase" size={14} color={Colors.white} />
                <Text style={styles.headerBadgeText}>{career}</Text>
              </View>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Stats Row */}
        <AnimatedView animation="all" delay={100} style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: Colors.primary + '20' }]}>
                <Ionicons name={stat.icon} size={20} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </AnimatedView>

        {/* Skills Section */}
        <AnimatedView animation="all" delay={200} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minhas Habilidades</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Editar</Text>
            </TouchableOpacity>
          </View>

          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              name={skill.name}
              level={skill.level}
              progress={skill.progress}
              color={skill.color}
              delay={index * 100}
            />
          ))}
        </AnimatedView>

        {/* Profile Form */}
        <AnimatedView animation="all" delay={300} style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-circle" size={24} color={Colors.primary} />
              <Text style={styles.cardTitle}>Dados do Perfil</Text>
            </View>

            <Input
              label="Nome Completo"
              value={name}
              onChangeText={setName}
              iconName="person-outline"
            />

            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="mail-outline"
              editable={false}
            />

            <Input
              label="Carreira Atual"
              value={career}
              onChangeText={setCareer}
              iconName="briefcase-outline"
            />

            <Button
              title={loading ? 'Salvando...' : 'Salvar Alterações'}
              onPress={handleSave}
              disabled={loading}
              type="primary"
              iconName="save-outline"
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </AnimatedView>

        {/* Quick Actions */}
        <AnimatedView animation="all" delay={400} style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="settings" size={24} color={Colors.secondary} />
              <Text style={styles.cardTitle}>Ações Rápidas</Text>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Achievements')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.accent + '20' }]}>
                  <Ionicons name="trophy" size={20} color={Colors.accent} />
                </View>
                <Text style={styles.actionText}>Ver Conquistas e Badges</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Goals')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.primary + '20' }]}>
                  <Ionicons name="target" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.actionText}>Meus Objetivos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Recommender')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.secondary + '20' }]}>
                  <Ionicons name="sparkles" size={20} color={Colors.secondary} />
                </View>
                <Text style={styles.actionText}>Recomendações de IA</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Vision')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.accentCyan + '20' }]}>
                  <Ionicons name="eye" size={20} color={Colors.accentCyan} />
                </View>
                <Text style={styles.actionText}>Visão Computacional (Deep Learning)</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Iot')}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.accentGreen + '20' }]}>
                  <Ionicons name="hardware-chip" size={20} color={Colors.accentGreen} />
                </View>
                <Text style={styles.actionText}>Simulação IoT/IoB</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={signOut}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: Colors.error + '20' }]}>
                  <Ionicons name="log-out" size={20} color={Colors.error} />
                </View>
                <Text style={[styles.actionText, { color: Colors.error }]}>Fazer Logout</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
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
  headerContainer: {
    marginBottom: Spacing.lg,
  },
  headerGradient: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.2,
  },
  headerCircle1: {
    width: 150,
    height: 150,
    backgroundColor: Colors.white,
    top: -50,
    right: -30,
  },
  headerCircle2: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    bottom: -30,
    left: -20,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white + '30',
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glow,
  },
  avatarText: {
    ...Typography.title,
    fontSize: 36,
    color: Colors.white,
    fontWeight: '800',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  headerName: {
    ...Typography.title,
    fontSize: 24,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerEmail: {
    ...Typography.bodySmall,
    color: Colors.white + 'DD',
    marginBottom: Spacing.sm,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white + '20',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  headerBadgeText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.heading,
    fontSize: 18,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading,
    fontSize: 18,
  },
  sectionLink: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  cardTitle: {
    ...Typography.heading,
    fontSize: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  actionText: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
});

export default ProfileManagementScreen;
