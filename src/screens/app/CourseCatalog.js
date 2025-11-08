// src/screens/app/CourseCatalog.js
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  GlobalStyles,
  Typography,
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
} from '../../styles/theme';
import Button from '../../components/common/Button';
import FormModal from '../../components/common/FormModal';
import SearchBar from '../../components/common/SearchBar';

/* =========================
   MOCK & "API"
========================= */
const MOCK_COURSES = [
  { id: 1, title: 'Python para Data Science',  description: 'Python aplicado à análise de dados.',    duration: '40h', area: 'Data Science' },
  { id: 2, title: 'React Native Avançado',     description: 'Arquitetura e performance no mobile.',  duration: '60h', area: 'Mobile' },
  { id: 3, title: 'Fundamentos de Cloud AWS',  description: 'Serviços essenciais da AWS.',           duration: '20h', area: 'Cloud' },
];

const getCourses   = () => Promise.resolve({ data: [...MOCK_COURSES] });
const createCourse = (data) => { const c = { id: Date.now(), ...data }; MOCK_COURSES.push(c); return Promise.resolve({ data: c }); };
const updateCourse = (id, data) => { const i = MOCK_COURSES.findIndex(c => c.id === id); if (i>-1) MOCK_COURSES[i] = { ...MOCK_COURSES[i], ...data }; return Promise.resolve({ data: MOCK_COURSES[i] }); };
const deleteCourse = (id) => { const i = MOCK_COURSES.findIndex(c => c.id === id); if (i>-1) MOCK_COURSES.splice(i,1); return Promise.resolve(); };

const COURSE_FIELDS = [
  { name: 'title',       label: 'Título do Curso', placeholder: 'Ex: Python para Data Science', required: true },
  { name: 'description', label: 'Descrição',        placeholder: 'Breve descrição do curso',     required: true },
  { name: 'duration',    label: 'Duração',          placeholder: 'Ex: 40h',                      required: true },
  { name: 'area',        label: 'Área',             placeholder: 'Ex: Data Science, Mobile, Cloud', required: true },
];

/* =========================
   SUB-COMPONENTES
========================= */
const StatCard = ({ icon, title, value, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '22' }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      styles.chip,
      active && { backgroundColor: Colors.primary + '22', borderColor: Colors.primary },
    ]}
  >
    <Text style={[styles.chipText, active && { color: Colors.primary, fontWeight: '700' }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CourseCard = ({ course, onEdit, onDelete }) => (
  <View style={styles.courseCard}>
    {/* header */}
    <View style={styles.courseHeader}>
      <View style={styles.courseIcon}>
        <Ionicons name="book-outline" size={20} color={Colors.accentPurple} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseArea}>{course.area}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </View>

    {/* body */}
    <Text style={styles.courseDesc}>{course.description}</Text>

    {/* tags */}
    <View style={styles.tagRow}>
      <View style={styles.tagPill}>
        <Ionicons name="timer-outline" size={12} color={Colors.primary} />
        <Text style={styles.tagPillText}>{course.duration}</Text>
      </View>
      <View style={styles.tagPill}>
        <Ionicons name="pricetag-outline" size={12} color={Colors.primary} />
        <Text style={styles.tagPillText}>{course.area}</Text>
      </View>
    </View>

    {/* footer actions */}
    <View style={styles.cardActions}>
      <Button
        title="Editar"
        onPress={() => onEdit(course)}
        type="secondary"
        style={styles.cardBtn}
        textStyle={styles.cardBtnText}
        iconName="create-outline"
      />
      <Button
        title="Excluir"
        onPress={() => onDelete(course.id)}
        type="error"
        style={styles.cardBtn}
        textStyle={styles.cardBtnText}
        iconName="trash-outline"
      />
    </View>
  </View>
);

/* =========================
   TELA
========================= */
export default function CourseCatalogScreen() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos'); // Todos | Data Science | Mobile | Cloud

  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await getCourses();
      setCourses(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os cursos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleSave = async (data) => {
    try {
      if (editingCourse) await updateCourse(editingCourse.id, data);
      else await createCourse(data);
      setModalVisible(false);
      fetchCourses();
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha ao salvar o curso.');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmação', 'Deseja excluir este curso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCourse(id);
            fetchCourses();
          } catch (e) {
            Alert.alert('Erro', e.message || 'Falha ao excluir o curso.');
          }
        },
      },
    ]);
  };

  const filteredCourses = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return courses.filter((c) => {
      const byText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q);
      const byFilter = activeFilter === 'Todos' || c.area === activeFilter;
      return byText && byFilter;
    });
  }, [courses, searchText, activeFilter]);

  /* -------- Loading -------- */
  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando catálogo de cursos...</Text>
      </View>
    );
  }

  /* -------- UI -------- */
  const total = courses.length;
  const byArea = (a) => courses.filter((c) => c.area === a).length;

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: Spacing.xxl }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchCourses(); }}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>📚 Catálogo de Cursos</Text>
          <TouchableOpacity
            onPress={() => { setEditingCourse(null); setModalVisible(true); }}
            style={styles.addFab}
            activeOpacity={0.9}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.screenSubtitle}>Gerencie os cursos disponíveis para as trilhas.</Text>

        {/* KPIs */}
        <View style={styles.statsGrid}>
          <StatCard icon="albums"           title="Total"        value={total}             color={Colors.primary} />
          <StatCard icon="analytics"        title="Data Science" value={byArea('Data Science')} color={Colors.accentPurple} />
          <StatCard icon="phone-portrait"   title="Mobile"       value={byArea('Mobile')}   color={Colors.secondary} />
          <StatCard icon="cloud-outline"    title="Cloud"        value={byArea('Cloud')}    color={Colors.accentCyan} />
        </View>

        {/* Busca + Filtros */}
        <SearchBar
          placeholder="Pesquisar por título, descrição ou área..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.chipsRow}>
          {['Todos', 'Data Science', 'Mobile', 'Cloud'].map((f) => (
            <FilterChip key={f} label={f} active={activeFilter === f} onPress={() => setActiveFilter(f)} />
          ))}
        </View>

        {/* Lista */}
        {filteredCourses.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search" size={22} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhum curso encontrado.</Text>
          </View>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={(c) => { setEditingCourse(c); setModalVisible(true); }}
              onDelete={handleDelete}
            />
          ))
        )}

        {/* CTA */}
        <Button
          title="Adicionar Novo Curso"
          onPress={() => { setEditingCourse(null); setModalVisible(true); }}
          type="primary"
          style={{ marginTop: Spacing.md }}
          iconName="add-circle-outline"
        />
      </ScrollView>

      {/* Modal CRUD */}
      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
        initialData={editingCourse}
        fields={COURSE_FIELDS}
        title={editingCourse ? 'Editar Curso' : 'Novo Curso'}
      />
    </SafeAreaView>
  );
}

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background },
  loadingText: { ...Typography.body, marginTop: 10, color: Colors.text },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  screenTitle: { ...Typography.title, color: Colors.primary, marginBottom: 4 },
  screenSubtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.md },

  addFab: {
    backgroundColor: Colors.primary,
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.medium,
  },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: {
    flexBasis: '48%',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: { ...Typography.heading, fontSize: 20 },
  statTitle: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.md },
  chip: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.cardBackground,
  },
  chipText: { ...Typography.caption },

  courseCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  courseIcon: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.accentPurple + '22',
    marginRight: Spacing.sm,
  },
  courseTitle: { ...Typography.heading, fontWeight: '700' },
  courseArea: { ...Typography.caption, color: Colors.textSecondary },
  courseDesc: { ...Typography.body, color: Colors.textSecondary, marginTop: 6 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tagPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  tagPillText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },

  cardActions: { flexDirection: 'row', gap: 8, marginTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm },
  cardBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, shadowOpacity: 0, elevation: 0 },
  cardBtnText: { fontSize: 14 },

  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  emptyText: { ...Typography.body, color: Colors.textSecondary, marginTop: 6 },
});
