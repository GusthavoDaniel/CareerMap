// .NET (no emulador Android use 10.0.2.2)
export const DOTNET_API_BASE_URL = 'http://10.0.2.2:5097';
export const API_BASE_URL = DOTNET_API_BASE_URL;

// Endpoints reais do seu backend .NET
export const DOTNET_ENDPOINTS = {
  LOGIN: '/api/v1/Auth/login',
  REGISTER: '/api/v1/Auth/register',
  CAREERS: '/api/v1/Carreiras',
  COURSES: '/api/v1/Cursos',
  GOALS: '/api/v1/Metas',
  TRAIL_GENERATE: '/api/v1/Trilhas/gerar',
  TRAIL_HISTORY: '/api/v1/Usuarios/{id}/trilhas',
};

// (Opcional) API Python extra
export const PYTHON_API_BASE_URL = 'https://8000-iqq2t9jac60a0ipxcdhrl-654bbf32.manusvm.computer';
export const PYTHON_ENDPOINTS = {
  GENERATE_TRAIL: '/api/gerar-trilha',
  LIST_TRAILS: '/api/trilhas/{usuario_nome}',
  HEALTH: '/health',
  ANALYZE_IMAGE: '/api/analisar-imagem',
  TELEMETRY: '/api/telemetry',
};

// Compatibilidade
export const ENDPOINTS = DOTNET_ENDPOINTS;
