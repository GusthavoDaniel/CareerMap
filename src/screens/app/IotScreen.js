import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import Button from '../../components/common/Button';
import { sendTelemetry } from '../../api/endpoints';

const IotScreen = ({ navigation }) => {
  const [focusLevel, setFocusLevel] = useState(0.5);
  const [studyTime, setStudyTime] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScore, setLastScore] = useState(null);

  const handleSendTelemetry = async () => {
    setIsLoading(true);
    try {
      const body = {
        device_id: 'mobile-app-simulator-1',
        focus_level: Number(focusLevel),
        study_time_minutes: Number(studyTime),
        user_id: 1,
      };

      // a função pode retornar o dado direto ou dentro de { data }
      const res = await sendTelemetry(body);
      const payload = res?.data ?? res;

      // aceita score OU analysis_score
      const rawScore =
        typeof payload?.analysis_score === 'number'
          ? payload.analysis_score
          : typeof payload?.score === 'number'
          ? payload.score
          : null;

      const message = payload?.message ?? 'Telemetria enviada.';

      setLastScore(rawScore);

      const scoreStr = typeof rawScore === 'number'
        ? `${rawScore.toFixed(2)}%`
        : 'N/A%';

      Alert.alert('Telemetria Enviada (IoB)', `${message}\n\nScore de Comportamento: ${scoreStr}`);
    } catch (error) {
      console.error('Erro ao enviar telemetria:', error);
      const status = error?.response?.status || error?.status;
      const detail = error?.response?.data?.message || error?.message || 'Falha ao enviar dados de telemetria.';
      Alert.alert('Erro', `${detail}${status ? ` (HTTP ${status})` : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const scoreValueText =
    typeof lastScore === 'number' ? `${lastScore.toFixed(2)}%` : 'N/A%';

  return (
    <ScrollView
      style={[GlobalStyles.container, { flex: 1 }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Ionicons name="hardware-chip-outline" size={28} color={Colors.primary} />
        <Text style={styles.title}>Simulação IoT/IoB</Text>
      </View>

      <Text style={styles.subtitle}>
        Demonstração da integração com a API de Telemetria (Internet of Behaviors).
      </Text>
      <Text style={styles.body}>
        Simule o envio de dados de um dispositivo (ex: um sensor de foco) para o backend. O backend calcula um Score de Comportamento.
      </Text>

      {/* Nível de Foco */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nível de Foco (Sensor de Atenção)</Text>
        <Text style={styles.cardValue}>{Math.round((Number(focusLevel) || 0) * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={focusLevel}
          onValueChange={setFocusLevel}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.border}
        />
        <Text style={styles.cardDescription}>
          Simula a leitura de um sensor que mede a atenção do usuário durante o estudo.
        </Text>
      </View>

      {/* Tempo de Estudo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tempo de Estudo (Minutos)</Text>
        <Text style={styles.cardValue}>{Number(studyTime) || 0} min</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={120}
          step={5}
          value={studyTime}
          onValueChange={setStudyTime}
          minimumTrackTintColor={Colors.secondary}
          maximumTrackTintColor={Colors.border}
        />
        <Text style={styles.cardDescription}>
          Simula o tempo de estudo registrado pelo dispositivo.
        </Text>
      </View>

      <Button
        title={isLoading ? 'Enviando Telemetria...' : 'Enviar Dados de Comportamento'}
        icon="send-outline"
        onPress={handleSendTelemetry}
        style={styles.button}
        disabled={isLoading}
        type="secondary"
      />

      {lastScore !== null && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Último Score de Comportamento (IoB)</Text>
          <Text style={styles.scoreValue}>{scoreValueText}</Text>
          <Text style={styles.scoreDescription}>
            Este score pode ser usado pelo backend para refinar as recomendações de IA.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...Typography.title,
    color: Colors.primary,
    marginLeft: 8,
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
  card: {
    ...GlobalStyles.card,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    marginBottom: 4,
  },
  cardValue: {
    ...Typography.heading,
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  cardDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    marginBottom: 20,
  },
  scoreContainer: {
    ...GlobalStyles.card,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  scoreTitle: {
    ...Typography.subtitle,
    color: Colors.accent,
    marginBottom: 4,
  },
  scoreValue: {
    ...Typography.heading,
    fontSize: 32,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  scoreDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default IotScreen;
