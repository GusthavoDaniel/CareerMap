import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import Button from '../../components/common/Button';
import { analyzeImage } from '../../api/endpoints'; // Precisamos criar este endpoint

const VisionScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // Pedir permissão de acesso à galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true, // Pedir base64 para enviar para a API
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setAnalysisResult(null);
      // A API espera o base64
      handleAnalyzeImage(result.assets[0].base64);
    }
  };

  const handleAnalyzeImage = async (base64Image) => {
    setIsLoading(true);
    try {
      // A API espera o base64 com o prefixo 'data:image/jpeg;base64,'
      const imageBase64 = `data:image/jpeg;base64,${base64Image}`;
      
      // Chamada à API de Visão Computacional
      const result = await analyzeImage({ image_base64: imageBase64 });
      
      setAnalysisResult(result);
      
      Alert.alert(
        'Análise Concluída',
        `Detectamos ${result.detections.length} objetos em ${result.latency_ms}ms.`
      );
    } catch (error) {
      console.error('Erro na análise de imagem:', error);
      Alert.alert('Erro', error.message || 'Falha ao analisar a imagem com a API de Visão Computacional.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[GlobalStyles.container, { flex: 1 }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Ionicons name="eye-outline" size={28} color={Colors.primary} />
        <Text style={styles.title}>Visão Computacional (YOLOv8)</Text>
      </View>
      <Text style={styles.subtitle}>
        Demonstração da integração com a API de Visão Computacional (Deep Learning).
      </Text>
      <Text style={styles.body}>
        Selecione uma imagem para que a IA detecte objetos e sugira uma pontuação de afinidade com carreiras.
      </Text>

      <Button
        title={imageUri ? "Selecionar Outra Imagem" : "Selecionar Imagem da Galeria"}
        icon="image-outline"
        onPress={pickImage}
        style={styles.button}
        disabled={isLoading}
      />

      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Analisando imagem...</Text>
        </View>
      )}

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Resultado da Análise (Deep Learning)</Text>
          <Text style={styles.resultBody}>
            Latência: {analysisResult.latency_ms}ms
          </Text>
          <Text style={styles.resultBody}>
            Objetos Detectados: {analysisResult.detections.length}
          </Text>
          
          {analysisResult.detections.length > 0 && (
            <View style={styles.detectionList}>
              {analysisResult.detections.map((det, index) => (
                <Text key={index} style={styles.detectionItem}>
                  - {det.label} ({Math.round(det.confidence * 100)}% de confiança)
                </Text>
              ))}
            </View>
          )}

          <Text style={styles.resultTitle}>Afinidade com Carreiras</Text>
          <Text style={styles.resultBody}>
            *Esta funcionalidade está pendente na API, mas a estrutura está pronta.*
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
  button: {
    marginBottom: 20,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    backgroundColor: Colors.cardBackground,
  },
  resultContainer: {
    ...GlobalStyles.card,
    padding: 16,
    marginBottom: 20,
  },
  resultTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 8,
    marginTop: 10,
  },
  resultBody: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: 4,
  },
  detectionList: {
    marginTop: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  detectionItem: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
});

export default VisionScreen;
