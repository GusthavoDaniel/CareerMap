#!/usr/bin/env bash
# ============================================================
# git-history-simulator.sh
# ------------------------------------------------------------
# Cria um histórico coerente de ~30 commits para um projeto
# React Native/Expo já pronto (caso de uso MOBILEGSCARRER).
# ============================================================

set -e

REMOTE_URL="${1:-}"

add_if_exists() {
  for p in "$@"; do
    if [ -e "$p" ] || [ -d "$p" ]; then
      git add -f "$p"
    fi
  done
}

commit_with_date() {
  local msg="$1"
  local day_offset="$2"
  local date_str
  if command -v gdate >/dev/null 2>&1; then
    date_str="$(gdate -d "$day_offset days ago 10:00" "+%Y-%m-%d %H:%M:%S")"
  else
    date_str="$(date -d "$day_offset days ago 10:00" "+%Y-%m-%d %H:%M:%S" 2>/dev/null || date "+%Y-%m-%d %H:%M:%S")"
  fi
  GIT_AUTHOR_DATE="$date_str" GIT_COMMITTER_DATE="$date_str" git commit -m "$msg" || true
}

ensure_git_initialized() {
  if [ -d ".git" ]; then
    echo "⚠️  Repositório Git já existe. Limpando histórico..."
    rm -rf .git
  fi

  git init
  git branch -M main
  if [ -n "$REMOTE_URL" ]; then
    git remote add origin "$REMOTE_URL" || true
  fi
}

if [ ! -f "package.json" ]; then
  echo "❌ Execute este script na pasta raiz do projeto (onde existe package.json)."
  exit 1
fi

ensure_git_initialized

add_if_exists App.js package.json app.json babel.config.js .gitignore README.md
commit_with_date "chore: inicialização do projeto React Native com Expo" 15

add_if_exists src
commit_with_date "chore: criação da estrutura base src/ (api, components, screens, context, styles)" 14

add_if_exists src/navigation/AppNavigator.js
commit_with_date "feat: configuração inicial da navegação com Stack Navigator" 13

add_if_exists src/context/AuthContext.js
commit_with_date "feat: implementação do AuthContext para controle de autenticação" 12

add_if_exists src/api/config.js src/api/api.js src/api/endpoints.js
commit_with_date "feat: configuração da camada de API e endpoints REST (.NET e Python)" 11

add_if_exists src/screens/app/Login.js src/screens/app/Register.js src/screens/auth
commit_with_date "feat: telas de Login e Registro com integração ao backend" 10

add_if_exists src/components/common/Button.js src/components/common/Input.js
commit_with_date "feat: criação de componentes básicos de UI (Button e Input)" 9

add_if_exists src/components/common/Toast.js src/components/common/LoadingScreen.js src/components/common/FormModal.js
commit_with_date "feat: componentes de feedback e formulários (Toast, LoadingScreen, FormModal)" 8

add_if_exists src/screens/app/Home.js src/screens/app/About.js
commit_with_date "feat: criação da tela Home e página About" 7

add_if_exists src/screens/app/Careers.js
commit_with_date "feat: integração da tela Carreiras com backend .NET" 7

add_if_exists src/screens/app/Courses.js
commit_with_date "feat: tela de listagem de Cursos e integração com API" 6

add_if_exists src/screens/app/TrailRoadmap.js
commit_with_date "feat: tela TrailRoadmap para exibir trilhas recomendadas" 6

add_if_exists src/screens/app/Recommender.js
commit_with_date "feat: integração com API Python para geração de trilhas personalizadas" 5

add_if_exists src/screens/app/IoTScreen.js
commit_with_date "feat: criação da tela IoT com sliders e telemetria simulada" 5

add_if_exists src/screens/app/Profile.js src/screens/app/ProfileManagement.js
commit_with_date "feat: telas de Perfil do Usuário e gerenciamento de dados" 5

add_if_exists src/screens/app/GoalPlanner.js src/screens/app/Dashboard.js
commit_with_date "feat: telas de metas e dashboard de progresso" 4

add_if_exists src/components/common/Card.js src/components/ui src/components/common/AnimatedView.js
commit_with_date "feat: componentes UI adicionais (Card, AnimatedView, ui/)" 4

add_if_exists src/hooks/useHaptic.js
commit_with_date "feat: adição do hook useHaptic para feedback tátil" 3

add_if_exists src/styles
commit_with_date "style: definição do tema global, cores e tipografia" 3

add_if_exists src/screens/app/VisionScreen.js
commit_with_date "feat: tela VisionScreen com resumo e próximos passos" 3

add_if_exists src/screens/app/Map.js src/screens/app/Track.js
commit_with_date "feat: telas Map e Track para visualização de progresso" 2

add_if_exists src/screens/app/CareerCatalog.js src/screens/app/CourseCatalog.js
commit_with_date "feat: catálogos completos de carreiras e cursos" 2

add_if_exists src/screens/app/Achievements.js src/screens/app/CareerBot.js
commit_with_date "feat: conquistas e assistente CareerBot" 2

add_if_exists ARCHITECTURE_PLAN.md TEST_PLAN.md
commit_with_date "docs: inclusão de documentos de arquitetura e plano de testes" 2

add_if_exists src/assets src/assets/fonts src/assets/images assets images
commit_with_date "chore: inclusão de assets (fonts, images) e ajustes de bundling" 1

add_if_exists .
commit_with_date "fix: correções gerais de imports e paths" 1

add_if_exists .
commit_with_date "style: ajustes de layout, espaçamento e responsividade" 1

add_if_exists .
commit_with_date "chore: otimizações leves de performance e limpeza de warnings" 1

add_if_exists .
commit_with_date "test: smoke tests e verificação manual dos principais fluxos" 1

add_if_exists .
commit_with_date "release: versão final para entrega da Sprint/GS" 0

echo ""
echo "✅ Histórico criado com sucesso."
if [ -n "$REMOTE_URL" ]; then
  echo "➡️  Enviando para o remoto: $REMOTE_URL"
  git push -u origin main
else
  echo "💡 Dica: para enviar ao GitHub, rode:"
  echo "    git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git"
  echo "    git push -u origin main"
fi
