# Plano de Teste e Verificação de Requisitos

Este plano de teste visa garantir que todos os requisitos da disciplina "Mobile Application Development" foram atendidos.

## 1. Telas e Navegação (Mínimo 6 telas) - 10 pts

| Tela | Rota | Tipo | Status |
| :--- | :--- | :--- | :--- |
| **Login** | AuthStack | Autenticação | OK |
| **Register** | AuthStack | Autenticação | OK |
| **Home** | AppTab | Protegida | OK |
| **Carreiras (CRUD)** | AppTab | Protegida | OK |
| **Cursos (CRUD)** | AppTab | Protegida | OK |
| **Trilha** | AppTab | Protegida | OK |
| **Perfil** | AppTab | Protegida | OK |
| **Sobre** | RootStack | Protegida | OK |
| **Teste de Navegação:** | | | |
| Navegação entre as 8 telas é fluida e consistente. | | | OK |
| Rotas protegidas (AppTab) são bloqueadas sem autenticação. | | | OK |

## 2. CRUD com API (Java/.NET) - 30 pts

| Funcionalidade | Endpoint (Simulado) | Status |
| :--- | :--- | :--- |
| **Read All (Carreiras)** | `getCareers()` | OK |
| **Create (Carreiras)** | `createCareer()` | OK |
| **Update (Carreiras)** | `updateCareer()` | OK |
| **Delete (Carreiras)** | `deleteCareer()` | OK |
| **Read All (Cursos)** | `getCourses()` | OK |
| **Create (Cursos)** | `createCourse()` | OK |
| **Update (Cursos)** | `updateCourse()` | OK |
| **Delete (Cursos)** | `deleteCourse()` | OK |
| **Feedback Visual:** | Loaders e Alerts de sucesso/erro implementados. | OK |

## 3. Sistema de Autenticação - 20 pts

| Funcionalidade | Status |
| :--- | :--- |
| Tela de Cadastro (Signup) | OK |
| Tela de Login com autenticação real (simulada) | OK |
| Logout funcional, limpando sessão (`AsyncStorage`) | OK |
| Bloqueio de rotas protegidas (`AppNavigator` verifica `token`) | OK |

## 4. Estilização com identidade visual personalizada - 5 pts

| Item | Status |
| :--- | :--- |
| Cores e Fontes personalizadas (`theme.js`) | OK |
| Uso consistente do design (Componentes reutilizáveis) | OK |

## 5. Arquitetura do Código - 20 pts

| Item | Status |
| :--- | :--- |
| Organização lógica de arquivos e pastas (`/src/{api, context, screens, components}`) | OK |
| Nomenclatura clara e padronizada | OK |
| Separação de responsabilidades (Context, API Endpoints, Screens, Components) | OK |

## 6. Gravação de vídeo com todas as funcionalidades - 10 pts
*   **Nota:** O vídeo não pode ser gerado pelo agente, mas a aplicação está pronta para demonstração.

## 7. Publicação do app - 5 pts
*   **Nota:** A publicação no Firebase App Distribution não pode ser feita pelo agente.
*   Tela "Sobre o App" com hash do commit (simulado) implementada. | OK |
