# Plano de Arquitetura do Aplicativo Mobile CareerMap (Atualizado)

## 1. Tecnologias Principais
*   **Framework:** React Native (com Expo)
*   **Navegação:** React Navigation (Stack e Tab)
*   **Gerenciamento de Estado:** Context API
*   **Requisições HTTP:** Axios
*   **Estilização:** StyleSheet (com um sistema de tema robusto)

## 2. Conceito de Design: "Crescimento e Futuro"
Para um visual mais profissional e moderno, a identidade visual será baseada em:
*   **Paleta de Cores:** Foco em um **Azul Profundo** (confiança, estabilidade) e um **Verde Vibrante** (crescimento, inovação) como cor de destaque.
*   **Tipografia:** Uso de fontes limpas e modernas (padrão do sistema, mas com pesos e tamanhos bem definidos).
*   **Estética:** Uso de **elevação (sombras)** sutis, **cantos arredondados** e foco em **espaço em branco** para clareza e sofisticação.

## 3. Estrutura de Pastas (Mantida)

```
/src
├── /api
├── /assets
├── /components
│   ├── /common
│   └── /ui
├── /context
├── /hooks
├── /screens
│   ├── /auth
│   └── /app
├── /navigation
├── /styles
└── App.js
```

## 4. Telas Mínimas (Mantidas)
1.  Login
2.  Register/Signup
3.  Home
4.  Careers (CRUD)
5.  Courses (CRUD)
6.  Track
7.  Profile
8.  About

## 5. Implementação de CRUD e API (Mantida)
*   Mock de API RESTful com Axios.

## 6. Sistema de Autenticação (Mantido)
*   `AuthContext` e `AsyncStorage`.
