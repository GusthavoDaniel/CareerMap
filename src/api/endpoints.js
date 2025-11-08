import axios from 'axios';
import {
  API_BASE_URL,
  DOTNET_ENDPOINTS as ENDPOINTS,
  PYTHON_API_BASE_URL,
  PYTHON_ENDPOINTS,
} from './config';

// ==============================
// 🔹 Instâncias Axios
// ==============================
const dotnetApi = axios.create({
  baseURL: API_BASE_URL, // http://10.0.2.2:5097
  headers: { 'Content-Type': 'application/json' },
});

const pythonApi = axios.create({
  baseURL: PYTHON_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Opcional: padroniza erro 401
dotnetApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // ex.: deslogar usuário
      // AsyncStorage.removeItem('token') ...
    }
    return Promise.reject(err);
  }
);

// ==============================
// 🔹 Helpers de Auth
// ==============================
export const setDotnetAuthToken = (token) => {
  if (token)
    dotnetApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete dotnetApi.defaults.headers.common.Authorization;
};

export const setPythonAuthToken = (token) => {
  if (token)
    pythonApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete pythonApi.defaults.headers.common.Authorization;
};

// ==============================
// 🔹 Normalização de Erros
// ==============================
function normalizeAxiosError(err, fallbackMessage) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.detail ||
    err?.response?.data?.title ||
    err?.message ||
    fallbackMessage;
  return new Error(msg);
}

// ==============================
// 🔹 Auth (.NET principal)
// ==============================
export const login = async (email, password) => {
  try {
    const { data } = await dotnetApi.post(ENDPOINTS.LOGIN, { email, password });
    if (data?.token) setDotnetAuthToken(data.token);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Falha no login.');
  }
};

export const register = async (name, email, password) => {
  try {
    const { data } = await dotnetApi.post(ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao registrar.');
  }
};

// ==============================
// 🔹 Carreiras / Cursos / Metas (.NET)
// ==============================
export const getCareers = async () => {
  try {
    const { data } = await dotnetApi.get(ENDPOINTS.CAREERS);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao listar carreiras.');
  }
};

export const getCourses = async () => {
  try {
    const { data } = await dotnetApi.get(ENDPOINTS.COURSES);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao listar cursos.');
  }
};

export const getGoals = async () => {
  try {
    const { data } = await dotnetApi.get(ENDPOINTS.GOALS);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao listar metas.');
  }
};

// ==============================
// 🔹 Trilhas (.NET principal)
// ==============================
export const generateTrailDotNet = async ({
  areaInteresse,
  nivelAtual,
  competencias,
}) => {
  try {
    const payload = {
      areaInteresse: areaInteresse ?? 'Desenvolvedor Full Stack',
      nivelAtual: nivelAtual ?? 'Júnior',
      competencias: competencias ?? ['APIs REST', 'Cloud'],
    };
    const res = await dotnetApi.post(ENDPOINTS.TRAIL_GENERATE, payload);
    return { data: res.data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao gerar trilha (.NET).');
  }
};

// ==============================
// 🔹 Trilhas / IoT / Visão (Python opcional)
// ==============================
export const generateTrailPython = async (params) => {
  try {
    const { data } = await pythonApi.post(PYTHON_ENDPOINTS.GENERATE_TRAIL, params);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Erro ao gerar trilha (Python).');
  }
};

export const sendTelemetry = async (payload) => {
  try {
    const { data } = await pythonApi.post(PYTHON_ENDPOINTS.TELEMETRY, payload);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Falha ao enviar telemetria.');
  }
};

export const analyzeImage = async (payload) => {
  try {
    const { data } = await pythonApi.post(PYTHON_ENDPOINTS.ANALYZE_IMAGE, payload);
    return { data };
  } catch (err) {
    throw normalizeAxiosError(err, 'Falha ao analisar imagem.');
  }
};
