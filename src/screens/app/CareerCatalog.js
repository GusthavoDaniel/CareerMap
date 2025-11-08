// src/screens/app/CareerCatalog.js
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
import { GlobalStyles, Typography, Colors, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import Button from '../../components/common/Button';
import FormModal from '../../components/common/FormModal';
import SearchBar from '../../components/common/SearchBar';
import Card from '../../components/common/Card';

/* =========================
   MOCK & "API"
========================= */
const MOCK_CAREERS = [
  { id: 1, title: 'Engenheiro de Dados',        description: 'Big Data, ETL e pipelines de dados.',     area: 'Tecnologia' },
  { id: 2, title: 'Arquiteto de Soluções Cloud', description: 'Desenho de soluções AWS/Azure/GCP.',      area: 'Cloud' },
  { id: 3, title: 'Cientista de Dados',          description: 'Modelagem, estatística e ML.',            area: 'Data Science' },
];

const getCareers   = () => Promise.resolve({ data: [...MOCK_CAREERS] });
const createCareer = (data) => { const c = { id: Date.now(), ...data }; MOCK_CAREERS.push(c); return Promise.resolve({ data: c }); };
const updateCareer = (id, data) => { const i = MOCK_CAREERS.findIndex(c => c.id === id); if (i>-1) MOCK_CAREERS[i] = { ...MOCK_CAREERS[i], ...data }; return Promise.resolve({ data: MOCK_CAREERS[i] }); };
const deleteCareer = (id) => { const i = MOCK_CAREERS.findIndex(c => c.id === id); if (i>-1) MOCK_CAREERS.splice(i,1); return Promise.resolve(); };

const CAREER_FIELDS = [
  { name: 'title',       label: 'Título da Carreira', placeholder: 'Ex: Engenheiro de Dados', required: true },
  { name: 'description', label: 'Descrição',           placeholder: 'Breve descrição da função',          required: true },
  { name: 'area',        label: 'Área',                placeholder: 'Ex: Tecnologia, Cloud, Data Science',required: true },
];

/* =========================
   UI SUB-COMPONENTES
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

const CareerItem = ({ career, onEdit, onDelete }) => (
  <View style={styles.careerCard}>
    {/* header */}
    <View style={styles.careerHeader}>
      <View style={styles.careerIcon}>
        <Ionicons name="briefcase-outline" size={20} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.careerTitle}>{career.title}</Text>
        <Text style={styles.careerArea}>{career.area}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </View>

    {/* body */}
    <Text style={styles.careerDesc}>{career.description}</Text>

    {/* tags */}
    <View style={styles.tagRow}>
      <View style={styles.tagPill}>
        <Ionicons name="pricetag" size={12} color={Colors.primary} />
        <Text style={styles.tagPillText}>{career.area}</Text>
      </View>
    </View>

    {/* footer actions */}
    <View style={styles.cardActions}>
      <Button
        title="Editar"
        onPress={() => onEdit(career)}
        type="secondary"
        style={styles.cardBtn}
        textStyle={styles.cardBtnText}
        iconName="create-outline"
      />
      <Button
        title="Excluir"
        onPress={() => onDelete(career.id)}
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
export default function CareerCatalogScreen() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos'); // Todos | Tecnologia | Cloud | Data Science

  const fetchCareers = useCallback(async () => {
    try {
      const { data } = await getCareers();
      setCareers(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as carreiras.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchCareers(); }, [fetchCareers]);

  const handleSave = async (data) => {
    try {
      if (editingCareer) await updateCareer(editingCareer.id, data);
      else await createCareer(data);
      setModalVisible(false);
      fetchCareers();
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha ao salvar a carreira.');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmação', 'Deseja excluir esta carreira?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCareer(id);
            fetchCareers();
          } catch (e) {
            Alert.alert('Erro', e.message || 'Falha ao excluir a carreira.');
          }
        },
      },
    ]);
  };

  const filteredCareers = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return careers.filter((c) => {
      const byText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q);

      const byFilter = activeFilter === 'Todos' || c.area === activeFilter;
      return byText && byFilter;
    });
  }, [careers, searchText, activeFilter]);

  /* -------- Loading -------- */
  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando catálogo de carreiras...</Text>
      </View>
    );
  }

  /* -------- UI -------- */
  const total = careers.length;
  const byArea = (area) => careers.filter((c) => c.area === area).length;

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: Spacing.xxl }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchCareers(); }} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>💼 Catálogo de Carreiras</Text>
          <TouchableOpacity
            onPress={() => { setEditingCareer(null); setModalVisible(true); }}
            style={styles.addFab}
            activeOpacity={0.9}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.screenSubtitle}>Descubra e gerencie carreiras do CareerMap.</Text>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard icon="albums"        title="Total"        value={total}          color={Colors.primary} />
          <StatCard icon="cloud-outline"  title="Cloud"        value={byArea('Cloud')}         color={Colors.accentCyan} />
          <StatCard icon="code-slash"     title="Tecnologia"   value={byArea('Tecnologia')}    color={Colors.secondary} />
          <StatCard icon="analytics"      title="Data Science" value={byArea('Data Science')}  color={Colors.accentPurple} />
        </View>

        {/* Busca + Filtros */}
        <SearchBar
          placeholder="Pesquisar por título, área ou descrição..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <View style={styles.chipsRow}>
          {['Todos', 'Tecnologia', 'Cloud', 'Data Science'].map((f) => (
            <FilterChip key={f} label={f} active={activeFilter === f} onPress={() => setActiveFilter(f)} />
          ))}
        </View>

        {/* Lista */}
        {filteredCareers.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search" size={22} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhuma carreira encontrada.</Text>
          </View>
        ) : (
          filteredCareers.map((career) => (
            <CareerItem
              key={career.id}
              career={career}
              onEdit={(c) => { setEditingCareer(c); setModalVisible(true); }}
              onDelete={handleDelete}
            />
          ))
        )}

        {/* CTA */}
        <Button
          title="Adicionar Nova Carreira"
          onPress={() => { setEditingCareer(null); setModalVisible(true); }}
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
        initialData={editingCareer}
        fields={CAREER_FIELDS}
        title={editingCareer ? 'Editar Carreira' : 'Nova Carreira'}
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

  careerCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  careerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  careerIcon: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary + '22',
    marginRight: Spacing.sm,
  },
  careerTitle: { ...Typography.heading, fontWeight: '700' },
  careerArea: { ...Typography.caption, color: Colors.textSecondary },
  careerDesc: { ...Typography.body, color: Colors.textSecondary, marginTop: 6 },

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
