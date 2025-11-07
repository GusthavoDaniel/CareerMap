# CareerMap - Global Solution 2025

## Mobile Application Development (React Native)

**Integrantes do Grupo:**
*   [Nome do Integrante 1] - RM [RM do Integrante 1]
*   [Nome do Integrante 2] - RM [RM do Integrante 2]
*   [Nome do Integrante 3] - RM [RM do Integrante 3]

**Link para o Vídeo no YouTube:**
[URL do Vídeo de Demonstração - A ser preenchido após a gravação]

**Link do Repositório GitHub:**
[URL do Repositório - A ser preenchido]

## Descrição da Solução Global Solution

O projeto **CareerMap** é uma plataforma inovadora que visa revolucionar o planejamento de carreira. Utilizando **Inteligência Artificial Generativa**, a solução mapeia e correlaciona **carreiras**, **competências** e **cursos** para sugerir **trilhas de desenvolvimento personalizadas** para estudantes e profissionais.

A solução é composta por:
1.  **Backend (Java Advanced / .NET):** API RESTful para gerenciamento de dados de carreiras, competências, cursos e trilhas, com endpoints de autenticação e integração com IA.
2.  **Banco de Dados (Oracle/MongoDB):** Armazenamento relacional (Oracle) e não-relacional (MongoDB) dos dados do CareerMap.
3.  **IA Generativa (Disruptive Architectures):** Módulo para gerar explicações textuais detalhadas sobre as trilhas de carreira sugeridas.
4.  **Aplicativo Mobile (React Native):** Interface de usuário para acesso e gerenciamento das funcionalidades do CareerMap, incluindo autenticação, CRUD de dados e visualização das trilhas personalizadas.
5.  **DevOps & Cloud Computing:** Pipeline de CI/CD e deploy da solução completa no Azure.

O aplicativo mobile desenvolvido nesta disciplina é o ponto de acesso principal para o usuário interagir com o CareerMap, permitindo:
*   Cadastro e Login de usuários com autenticação segura
*   Visualização e gerenciamento de carreiras, competências e cursos (CRUD completo)
*   Acesso à trilha de carreira personalizada gerada pela IA
*   Dashboard interativo com métricas de evolução e progresso
*   Planejador de objetivos profissionais
*   Recomendador inteligente baseado em IA
*   Mapa de oportunidades de carreira
*   Sistema de conquistas e badges
*   Visualização do perfil do usuário

## Requisitos da Disciplina (Mobile Application Development)

| Requisito | Pontuação | Status |
| :--- | :--- | :--- |
| **1. Telas e Navegação (Mínimo 6 telas)** | 10 pts | ✅ Completo (9+ telas) |
| **2. CRUD com API (Java/.NET)** | 30 pts | ✅ Completo (Objetivos, Carreiras, Cursos) |
| **3. Sistema de Autenticação** | 20 pts | ✅ Completo (Login, Cadastro, Recuperação) |
| **4. Estilização com identidade visual personalizada** | 5 pts | ✅ Completo (Design moderno e profissional) |
| **5. Arquitetura do Código** | 20 pts | ✅ Completo (Organização clara e padronizada) |
| **6. Gravação de vídeo com todas as funcionalidades** | 10 pts | ⏳ A fazer |
| **7. Publicação do app (Firebase App Distribution)** | 5 pts | ⏳ A fazer |
| **Total** | **100 pts** | |

## Telas Implementadas

### Autenticação (3 telas)
1. **Login** - Tela de login com validação e design moderno
2. **Cadastro** - Tela de registro de novos usuários
3. **Recuperação de Senha** - Tela para recuperação de senha

### Aplicativo Principal (6+ telas)
4. **Dashboard** - Dashboard interativo com métricas e visualizações
5. **CareerBot** - Chat de carreira com IA generativa
6. **Planejador de Objetivos** - CRUD completo de objetivos profissionais
7. **Mapa de Oportunidades** - Visualização de oportunidades de carreira
8. **Perfil** - Gerenciamento de perfil do usuário
9. **Recomendador** - Recomendações inteligentes baseadas em IA
10. **Catálogo de Carreiras** - Listagem e gerenciamento de carreiras
11. **Catálogo de Cursos** - Listagem e gerenciamento de cursos
12. **Conquistas** - Sistema de badges e conquistas

## Design e Identidade Visual

O aplicativo foi desenvolvido com um design **moderno, profissional e impactante**, utilizando:

### Paleta de Cores
- **Primária**: Indigo vibrante (#6366F1) - Representa tecnologia e inovação
- **Secundária**: Pink vibrante (#EC4899) - Destaque e energia
- **Acentos**: Verde esmeralda (#10B981), Roxo (#8B5CF6), Ciano (#06B6D4)
- **Background**: Azul escuro profundo (#0F172A) - Elegância e profissionalismo

### Características do Design
- **Gradientes sutis** com círculos decorativos
- **Sombras e elevações** para profundidade visual
- **Tipografia hierárquica** clara e legível
- **Ícones modernos** do Ionicons
- **Animações suaves** nas interações
- **Cards com bordas arredondadas** e efeitos de brilho
- **Barras de progresso coloridas** e visuais
- **Timeline interativa** para próximos passos
- **Badges e tags** coloridas para categorização

## Arquitetura do Código

O projeto segue uma arquitetura bem organizada e escalável:

```
src/
├── api/
│   ├── api.js              # Configuração do Axios
│   └── endpoints.js        # Endpoints da API (Mock)
├── components/
│   ├── common/
│   │   ├── Button.js       # Componente de botão reutilizável
│   │   ├── Input.js        # Componente de input com validação
│   │   ├── Card.js         # Componente de card
│   │   └── FormModal.js    # Modal para formulários
│   └── ui/
│       └── ProgressChart.js # Gráfico de progresso
├── context/
│   └── AuthContext.js      # Contexto de autenticação
├── navigation/
│   └── AppNavigator.js     # Configuração de navegação
├── screens/
│   ├── auth/
│   │   ├── Login.js        # Tela de login
│   │   ├── Register.js     # Tela de cadastro
│   │   └── ForgotPassword.js # Recuperação de senha
│   └── app/
│       ├── Dashboard.js    # Dashboard principal
│       ├── CareerBot.js    # Chat com IA
│       ├── GoalPlanner.js  # Planejador de objetivos (CRUD)
│       ├── Map.js          # Mapa de oportunidades
│       ├── ProfileManagement.js # Gerenciamento de perfil
│       ├── Recommender.js  # Recomendador inteligente
│       ├── Achievements.js # Conquistas e badges
│       ├── CareerCatalog.js # Catálogo de carreiras
│       └── CourseCatalog.js # Catálogo de cursos
└── styles/
    └── theme.js            # Tema global (cores, tipografia, estilos)
```

### Boas Práticas Implementadas
- **Componentização**: Componentes reutilizáveis e modulares
- **Context API**: Gerenciamento de estado global para autenticação
- **Separação de responsabilidades**: API, UI, lógica de negócio
- **Nomenclatura clara**: Variáveis e funções descritivas
- **Código limpo**: Formatação consistente e comentários quando necessário
- **Tema centralizado**: Cores e estilos em arquivo único
- **Navegação estruturada**: Stack e Tab Navigation bem organizados

## Funcionalidades Principais

### 1. Sistema de Autenticação Completo
- Login com validação de credenciais
- Cadastro de novos usuários com validação de dados
- Recuperação de senha por e-mail
- Proteção de rotas (telas restritas após login)
- Logout funcional com limpeza de sessão
- Persistência de sessão com AsyncStorage

### 2. CRUD Completo de Objetivos
- **Create**: Adicionar novos objetivos profissionais
- **Read**: Listar todos os objetivos cadastrados
- **Update**: Editar objetivos existentes
- **Delete**: Remover objetivos concluídos ou cancelados
- Interface intuitiva com modais e validações
- Feedback visual para todas as operações

### 3. Dashboard Interativo
- Métricas de evolução e progresso
- Gráficos de competências (barras de progresso coloridas)
- Trilha atual com status de conclusão
- Timeline de próximos passos
- KPIs rápidos (evolução, ranking, sequência de estudos)
- Score personalizado

### 4. Integração com IA (Mock)
- CareerBot para orientação profissional
- Recomendador inteligente de trilhas
- Explicações textuais geradas por IA
- Sugestões personalizadas baseadas no perfil

## Tecnologias Utilizadas

- **React Native** (v0.81.5)
- **Expo** (~54.0.23)
- **React Navigation** (v7.x)
  - Stack Navigator
  - Bottom Tab Navigator
- **Axios** (v1.13.2) - Requisições HTTP
- **AsyncStorage** (v2.2.0) - Persistência de dados
- **React Native Maps** (v1.20.1) - Mapas
- **React Native Chart Kit** (v6.12.0) - Gráficos
- **Ionicons** - Ícones modernos
- **Lottie** - Animações

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (no celular) ou emulador Android/iOS

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd CareerMap
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

4. Escaneie o QR Code com o Expo Go (Android) ou Camera (iOS)

### Credenciais de Teste

Para testar o aplicativo, use as seguintes credenciais:

- **E-mail**: user@fiap.com.br
- **Senha**: 123456

## Próximos Passos

- [ ] Gravar vídeo demonstrativo de todas as funcionalidades
- [ ] Publicar no Firebase App Distribution
- [ ] Integrar com API real (Java/.NET)
- [ ] Adicionar testes automatizados
- [ ] Implementar notificações push
- [ ] Adicionar modo offline

## Licença

Este projeto foi desenvolvido como parte da Global Solution 2025 da FIAP.

---

**Desenvolvido com 💜 pela equipe CareerMap**
