// src/api/config.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Tenta inferir o IP do host do Expo (LAN)
const getLanHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;
  if (!hostUri) return null;
  return hostUri.split(':')[0]; // pega só o host/IP
};

// Permite sobrescrever via .env (Ex.: EXPO_PUBLIC_LAN_IP=192.168.0.15)
const LAN_IP = process.env.EXPO_PUBLIC_LAN_IP || getLanHost();

// Se você estiver em EMULADOR Android e quiser forçar 10.0.2.2,
// crie .env com EXPO_PUBLIC_FORCE_EMULATOR=true
const FORCE_EMULATOR = process.env.EXPO_PUBLIC_FORCE_EMULATOR === 'true';

const DOTNET_PORT = 5097;
const PYTHON_PORT = 8000;

const isAndroid = Platform.OS === 'android';

// Regra:
// - Emulador Android: 10.0.2.2 (se forçado)
// - Dispositivo físico: IP da LAN (ou localhost no iOS simulador)
const hostForBackend =
  isAndroid && FORCE_EMULATOR
    ? '10.0.2.2'
    : LAN_IP || 'localhost';

export const DOTNET_API_BASE_URL = `http://${hostForBackend}:${DOTNET_PORT}`;
export const PYTHON_API_BASE_URL = `http://${hostForBackend}:${PYTHON_PORT}`;
export const API_BASE_URL = DOTNET_API_BASE_URL;

export const DOTNET_ENDPOINTS = {
  LOGIN: '/api/v1/Auth/login',
  REGISTER: '/api/v1/Auth/register',
  CAREERS: '/api/v1/Carreiras',
  COURSES: '/api/v1/Cursos',
  GOALS: '/api/v1/Metas',
  TRAIL_GENERATE: '/api/v1/Trilhas/gerar',
  TRAIL_HISTORY: '/api/v1/Usuarios/{id}/trilhas',
};

export const PYTHON_ENDPOINTS = {
  GENERATE_TRAIL: '/api/gerar-trilha',
  LIST_TRAILS: '/api/trilhas/{usuario_nome}',
  HEALTH: '/health',
  ANALYZE_IMAGE: '/api/analisar-imagem',
  TELEMETRY: '/api/telemetry',
};

export const ENDPOINTS = DOTNET_ENDPOINTS;
