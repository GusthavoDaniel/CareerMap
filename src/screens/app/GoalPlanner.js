import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import Button from '../../components/common/Button';
import FormModal from '../../components/common/FormModal';
import { Ionicons } from '@expo/vector-icons';

// Mock de API para CRUD de Objetivos
const MOCK_GOALS = [
  {
    id: 1,
    title: 'Tornar-se Engenheiro de Dados',
    deadline: '2026-12-31',
    progress: 0.6,
    status: 'Em Andamento',
  },
  {
    id: 2,
    title: 'Obter Certificação AWS Cloud Practitioner',
    deadline: '2025-12-31',
    progress: 1.0,
    status: 'Concluído',
  },
  {
    id: 3,
    title: 'Aprender Python Avançado',
    deadline: '2025-09-30',
    progress: 0.2,
    status: 'Pendente',
  },
];

const getGoals = () => Promise.resolve({ data: MOCK_GOALS });
const createGoal = (data) => {
  const newGoal = {
    id: MOCK_GOALS.length + 1,
    ...data,
    progress: 0,
    status: 'Pendente',
  };
  MOCK_GOALS.push(newGoal);
  return Promise.resolve({ data: newGoal });
};
const updateGoal = (id, data) => {
  const index = MOCK_GOALS.findIndex((g) => g.id === id);
  if (index !== -1) {
    MOCK_GOALS[index] = { ...MOCK_GOALS[index], ...data };
  }
  return Promise.resolve({ data: MOCK_GOALS[index] });
};
const deleteGoal = (id) => {
  const index = MOCK_GOALS.findIndex((g) => g.id === id);
  if (index !== -1) {
    MOCK_GOALS.splice(index, 1);
  }
  return Promise.resolve();
};

const GOAL_FIELDS = [
  {
    name: 'title',
    label: 'Objetivo Profissional',
    placeholder: 'Ex: Tornar-se Engenheiro de Dados',
    required: true,
  },
  {
    name: 'deadline',
    label: 'Prazo (AAAA-MM-DD)',
    placeholder: 'Ex: 2026-12-31',
    required: true,
  },
  {
    name: 'progress',
    label: 'Progresso (0.0 a 1.0)',
    placeholder: 'Ex: 0.5',
    required: false,
    keyboardType: 'numeric',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Concluído':
      return '#2ecc71';
    case 'Em Andamento':
      return Colors.primary;
    default:
      return '#f39c12';
  }
};

const GoalItem = ({ goal, onEdit, onDelete }) => {
  const progressColor = goal.progress >= 1.0 ? '#2ecc71' : Colors.primary;
  const progressText = `${Math.round(goal.progress * 100)}%`;
  const statusColor = getStatusColor(goal.status);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{goal.title}</Text>
          <Text style={styles.cardDeadline}>Prazo: {goal.deadline}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.cardStatus, { color: statusColor }]}>{goal.status}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(goal.progress * 100, 100)}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: progressColor }]}>{progressText}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(goal)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(goal.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GoalPlannerScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const fetchGoals = useCallback(async () => {
    try {
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os objetivos.');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchGoals();
  };

  const handleSave = async (data) => {
    try {
      data.progress = parseFloat(data.progress || 0);
      if (isNaN(data.progress)) data.progress = 0;

      data.status =
        data.progress >= 1.0 ? 'Concluído' : data.progress > 0 ? 'Em Andamento' : 'Pendente';

      if (editingGoal) {
        await updateGoal(editingGoal.id, data);
      } else {
        await createGoal(data);
      }
      setModalVisible(false);
      fetchGoals();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao salvar o objetivo.');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir este objetivo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteGoal(id);
            fetchGoals();
          } catch (error) {
            Alert.alert('Erro', error.message || 'Falha ao excluir o objetivo.');
          }
        },
      },
    ]);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setModalVisible(true);
  };

  const openCreateModal = () => {
    setEditingGoal(null);
    setModalVisible(true);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando objetivos...</Text>
      </View>
    );
  }

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === 'Concluído').length;
  const inProgressGoals = goals.filter((g) => g.status === 'Em Andamento').length;

  return (
    <ScrollView
      style={[GlobalStyles.container, { flex: 1 }]}
      contentContainerStyle={styles.screenContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="flag-outline" size={24} color={Colors.primary} />
          <Text style={styles.screenTitle}>Planejador de Objetivos</Text>
        </View>
        <View style={styles.headerBadge}>
          <Ionicons name="repeat-outline" size={14} color={Colors.primary} />
          <Text style={styles.headerBadgeText}>CRUD completo</Text>
        </View>
      </View>

      <Text style={styles.screenSubtitle}>
        Defina, acompanhe e atualize seus objetivos de carreira de forma visual.
      </Text>

      {/* Card Resumo */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>{totalGoals}</Text>
        </View>
        <View style={styles.summarySeparator} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Concluídos</Text>
          <Text style={[styles.summaryValue, { color: '#2ecc71' }]}>
            {completedGoals}
          </Text>
        </View>
        <View style={styles.summarySeparator} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Em andamento</Text>
          <Text style={[styles.summaryValue, { color: Colors.primary }]}>
            {inProgressGoals}
          </Text>
        </View>
      </View>

      {/* Botões principais */}
      <View style={styles.buttonsRow}>
        <Button
          title="Catálogo de Carreiras"
          onPress={() => navigation.navigate('CareerCatalog')}
          type="secondary"
          iconName="briefcase-outline"
          style={styles.smallButton}
        />
        <Button
          title="Catálogo de Cursos"
          onPress={() => navigation.navigate('CourseCatalog')}
          type="secondary"
          iconName="school-outline"
          style={styles.smallButton}
        />
      </View>

      <Button
        title="Adicionar Novo Objetivo"
        onPress={openCreateModal}
        type="primary"
        iconName="add-circle-outline"
        style={{ marginBottom: 16 }}
      />

      {/* Lista de Objetivos */}
      {goals.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum objetivo cadastrado ainda.</Text>
      ) : (
        goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))
      )}

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
        initialData={editingGoal}
        fields={GOAL_FIELDS}
        title={editingGoal ? 'Editar Objetivo' : 'Novo Objetivo'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    ...Typography.body,
    marginTop: 10,
    color: Colors.text,
  },

  screenContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTitle: {
    ...Typography.title,
    color: Colors.primary,
    marginLeft: 8,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerBadgeText: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: 6,
  },
  screenSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  summaryCard: {
    ...GlobalStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 6,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.subtitle,
    color: Colors.text,
    marginTop: 1,
  },
  summarySeparator: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  smallButton: {
    flex: 1,
  },

  emptyText: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.textSecondary,
  },

  card: {
    ...GlobalStyles.card,
    marginBottom: 6,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    flexShrink: 1,
  },
  cardDeadline: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  cardStatus: {
    ...Typography.caption,
    fontWeight: '600',
  },

  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 4,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 999,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressText: {
    ...Typography.caption,
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 6,
  },
  actionButton: {
    marginLeft: 16,
  },
});

export default GoalPlannerScreen;
