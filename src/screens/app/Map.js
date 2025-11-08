import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GlobalStyles, Typography, Colors } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Mock de Oportunidades de Carreira (Vagas)
const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Desenvolvedor React Native Sênior',
    company: 'Tech Solutions S.A.',
    career: 'Desenvolvimento Mobile',
    coordinate: { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
  },
  {
    id: 2,
    title: 'Analista de Dados Júnior',
    company: 'Data Insights Ltda.',
    career: 'Ciência de Dados',
    coordinate: { latitude: -22.9068, longitude: -43.1729 }, // Rio de Janeiro
  },
  {
    id: 3,
    title: 'Arquiteto de Cloud AWS',
    company: 'Cloud Masters',
    career: 'Cloud Computing',
    coordinate: { latitude: -15.7801, longitude: -47.9292 }, // Brasília
  },
];

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: -23.5505, // Centro em São Paulo
    longitude: -46.6333,
    latitudeDelta: LATITUDE_DELTA * 5, // Zoom out para ver o Brasil
    longitudeDelta: LONGITUDE_DELTA * 5,
  });

  const mapRef = useRef(null);

  const handleMarkerPress = (opportunity) => {
    Alert.alert(
      opportunity.title,
      `Empresa: ${opportunity.company}\nCarreira: ${opportunity.career}`,
      [{ text: 'OK' }]
    );
  };

  const focusOpportunity = (opportunity) => {
    mapRef.current?.animateToRegion(
      {
        ...opportunity.coordinate,
        latitudeDelta: LATITUDE_DELTA * 2.5,
        longitudeDelta: LONGITUDE_DELTA * 2.5,
      },
      600
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={[GlobalStyles.container, styles.container]}>
        {/* Cabeçalho */}
        <View style={styles.headerRow}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="map-outline" size={24} color={Colors.primary} />
            <Text style={styles.title}>Mapa de Oportunidades</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="locate-outline" size={14} color={Colors.primary} />
            <Text style={styles.headerBadgeText}>GeoInsights</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Visualize vagas e empresas mapeadas por localização para conectar sua trilha
          com o mercado.
        </Text>

        {/* Mapa */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          provider="google" // se estiver configurado
        >
          {MOCK_OPPORTUNITIES.map((opportunity) => (
            <Marker
              key={opportunity.id}
              coordinate={opportunity.coordinate}
              pinColor={Colors.primary}
            >
              <Callout onPress={() => handleMarkerPress(opportunity)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{opportunity.title}</Text>
                  <Text style={styles.calloutText}>{opportunity.company}</Text>
                  <Text style={styles.calloutTextSmall}>{opportunity.career}</Text>
                  <Text style={styles.calloutHint}>Toque para detalhes</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        {/* Legenda */}
        <View style={styles.legend}>
          <Ionicons name="pin" size={16} color={Colors.primary} />
          <Text style={styles.legendText}>Oportunidades de carreira mapeadas</Text>
        </View>

        {/* Cards horizontais de oportunidades */}
        <Text style={styles.sectionTitle}>Oportunidades em destaque</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {MOCK_OPPORTUNITIES.map((opportunity) => (
            <TouchableOpacity
              key={opportunity.id}
              style={styles.opportunityCard}
              activeOpacity={0.9}
              onPress={() => focusOpportunity(opportunity)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="briefcase-outline" size={18} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{opportunity.title}</Text>
                  <Text style={styles.cardCompany}>{opportunity.company}</Text>
                </View>
              </View>
              <View style={styles.cardFooterRow}>
                <View style={styles.careerPill}>
                  <Ionicons name="trending-up-outline" size={14} color={Colors.primary} />
                  <Text style={styles.careerText}>{opportunity.career}</Text>
                </View>
                <View style={styles.cardLocationRow}>
                  <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.cardLocationText}>Brasil</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
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

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: height * 0.45,
    borderRadius: 16,
    overflow: 'hidden',
    ...GlobalStyles.shadow,
  },

  calloutContainer: {
    width: 180,
  },
  calloutTitle: {
    ...Typography.subtitle,
    fontSize: 14,
    color: Colors.primary,
  },
  calloutText: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  calloutTextSmall: {
    ...Typography.caption,
    color: Colors.primary,
  },
  calloutHint: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },

  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  legendText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 6,
  },

  sectionTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    marginTop: 14,
    marginBottom: 6,
  },
  cardsRow: {
    paddingVertical: 4,
  },
  opportunityCard: {
    ...GlobalStyles.card,
    width: 260,
    padding: 12,
    marginRight: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cardTitle: {
    ...Typography.body,
    color: Colors.text,
  },
  cardCompany: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  careerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  careerText: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: 4,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});

export default MapScreen;
