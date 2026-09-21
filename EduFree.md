# EduFree — SPEC + PRD + PROMPT de implementação

Versão: 0.1 | Estado: especificação inicial | Idioma base: português (pt-PT), com conteúdos pt-BR independentes.

## 1. Visão e missão
EduFree é uma plataforma educativa gratuita, acessível e offline-first para mobile e Web/PWA. Após instalar a aplicação e descarregar um pacote de conteúdos, o aluno deve conseguir estudar, responder a exercícios, ouvir aulas quando houver voz local disponível e consultar o seu progresso sem rede. A Internet é opcional para novos pacotes, atualizações e sincronização consentida. Não prometer equivalência curricular internacional sem mapeamento e revisão locais.

## 2. PRD — Produto
### Público e alcance
- MVP: alunos de 10–14 anos; arquitetura preparada para crianças, jovens e adultos, sem afirmar que o MVP cobre todas as idades.
- Mercados iniciais: Portugal e Brasil; selecionar variante linguística e currículo explicitamente. Futuras localizações por pacotes.
- Responsáveis e professores podem acompanhar o progresso apenas com autorização apropriada; nenhum painel remoto no MVP.

### Problema
Alunos com ligação instável, dados móveis limitados ou poucos recursos precisam de conteúdos educativos que permaneçam utilizáveis offline, com exercícios claros e feedback consistente.

### Proposta de valor
- Aulas curtas e exercícios interativos disponíveis sem Internet.
- Pacotes de conteúdo versionados, descarregáveis e verificáveis.
- Progresso persistente no dispositivo; exportação opcional.
- Interface acessível, responsiva e com texto legível.

### Escopo MVP (P0)
1. Onboarding: idioma/variante, faixa de aprendizagem e perfil local com pseudónimo; evitar recolher nome real, data de nascimento completa ou contactos.
2. Catálogo de Matemática e Português; conteúdos iniciais revistos para um nível específico de cada currículo.
3. Instalar pacote inicial incluído na distribuição ou disponibilizado para transferência prévia; aplicação utilizável em modo de avião após instalação.
4. Aulas em texto, ilustrações locais e exemplos; exercícios de escolha múltipla e resposta curta com correção determinística.
5. Feedback explicativo, progresso local por aula, retomada, favoritos e pesquisa local.
6. Gestão de pacotes: versão, tamanho, estado, integridade, atualização opcional, eliminação com aviso.
7. Definições de acessibilidade: tamanho de letra, contraste, redução de movimento, suporte a leitor de ecrã e navegação por teclado.
8. Política de privacidade simples; sem anúncios, rastreadores ou contas obrigatórias no MVP.

### Fora do MVP
Tutor generativo de IA, chat aberto para crianças, videoconferência, rankings públicos, pagamentos, recolha de dados escolares sensíveis, dashboards de professores, sincronização automática e geração automática de conteúdo sem revisão humana.

### Histórias de utilizador
- Como aluno, quero descarregar Matemática uma vez e estudar em modo de avião.
- Como aluno, quero receber explicação quando erro, sem precisar de rede.
- Como aluno, quero retomar a última aula depois de fechar a aplicação.
- Como responsável, quero que os dados de aprendizagem fiquem no dispositivo e que a exportação seja opcional.
- Como utilizador de leitor de ecrã, quero navegar em todos os exercícios e ouvir rótulos compreensíveis.

### Métricas e critérios de aceitação
- Em modo de avião, abrir aulas instaladas, responder, corrigir e persistir progresso sem qualquer pedido de rede obrigatório.
- Fechar e reabrir a aplicação sem perder respostas e progresso já confirmados.
- Pacote corrompido é rejeitado; versão incompatível mostra mensagem clara e mantém conteúdos anteriores utilizáveis quando possível.
- Não eliminar progresso ao remover um pacote sem confirmação explícita.
- Exercícios possuem resposta e explicação validadas por revisão editorial; testes automáticos verificam chaves de resposta.
- Testes manuais com TalkBack/VoiceOver e teclado; verificar contraste e ampliação de texto.
- Medir tempo de abertura, espaço ocupado, RAM e bateria em dispositivos reais; definir limites após protótipo, sem números inventados.

## 3. SPEC — Arquitetura técnica
### Plataformas
- Web/PWA primeiro: React + TypeScript + Vite; service worker para shell e ficheiros de pacotes, IndexedDB para conteúdo e progresso.
- Android: Kotlin + Jetpack Compose + Room/SQLite, partilhando o formato dos pacotes e regras de exercícios; app nativa numa segunda etapa.
- iOS: avaliar após MVP, com armazenamento local e motor compatível.
- Backend opcional futuro: Node.js/Fastify + PostgreSQL, apenas para catálogo e sincronização consentida. O funcionamento educativo nunca depende dele.

### Módulos
`app-shell`, `onboarding`, `catalog`, `lesson-player`, `exercise-engine`, `progress`, `content-pack-manager`, `accessibility`, `settings`, `local-search`, `optional-sync`.

### Estrutura proposta
```text
edufree/
  apps/
    web/                 # React + TypeScript + PWA
    android/             # Kotlin + Compose, fase 2
  packages/
    content-schema/      # JSON Schema + tipos e validadores
    exercise-spec/       # regras e vetores de teste portáveis
    design-tokens/       # cores, tipografia, espaçamento
  content/
    pt-PT/math-foundations/
    pt-PT/portuguese-foundations/
    pt-BR/              # apenas conteúdos revistos para esta variante
  docs/
    PRD.md
    SPEC.md
    CONTENT_GUIDE.md
    PRIVACY.md
  tests/
```

### Formato de pacotes
Pacote ZIP com `manifest.json`, `lessons/*.json`, `assets/` e ficheiro de integridade; validar hash SHA-256 de cada ficheiro e, para distribuição remota confiável, assinatura digital do manifesto. Descompactar com proteção contra path traversal e limites de tamanho. Conteúdos sem scripts executáveis.

Exemplo ilustrativo de manifesto:
```json
{
  "schemaVersion": 1,
  "packId": "pt-PT.math.fractions.intro",
  "version": "1.0.0",
  "locale": "pt-PT",
  "subject": "math",
  "curriculum": "generic-review-required",
  "estimatedBytes": 0,
  "lessons": ["fractions-01"],
  "files": []
}
```
`estimatedBytes` e `files` devem ser preenchidos pelo processo de build; o exemplo não é um pacote publicável.

Exemplo de exercício:
```json
{
  "id": "fractions-01-q1",
  "type": "single_choice",
  "prompt": "Qual é a fração correspondente a uma de quatro partes iguais?",
  "options": [
    {"id":"a","text":"1/2"},
    {"id":"b","text":"1/4"},
    {"id":"c","text":"3/4"}
  ],
  "correctOptionId": "b",
  "explanation": "Uma parte entre quatro partes iguais representa 1/4."
}
```
Nunca enviar respostas corretas a um servidor para corrigir exercícios locais; correção determinística no dispositivo. Para exercícios de texto livre, usar regras explícitas e informar limitações.

### Dados locais
Entidades: `local_profile(id, alias, locale, created_at)`, `content_pack(id, version, status, installed_at)`, `lesson(id, pack_id, metadata)`, `attempt(id, profile_id, exercise_id, answer, correct, created_at)`, `lesson_progress(profile_id, lesson_id, completed, updated_at)`, `preferences(profile_id, key, value)`.
Usar identificadores aleatórios locais; separar conteúdo imutável de progresso; migrations versionadas; exportação/importação com consentimento e proteção adequada.

### Offline-first
- Pré-cache do shell PWA e pacote inicial; validar que a primeira utilização offline só é garantida após instalação completa.
- IndexedDB é fonte de verdade do progresso; transações atómicas; nunca depender de localStorage para dados críticos.
- Atualização de pacotes por staging + validação + ativação atómica, com rollback quando possível.
- A PWA deve avisar sobre risco de limpeza de armazenamento pelo sistema/navegador e oferecer exportação local.
- Sem sincronização no MVP; fase posterior exige resolução de conflitos por registo, autenticação opcional e consentimento.

### Acessibilidade e proteção
- Objetivo WCAG 2.2 AA na Web, com validação real; não declarar conformidade antes de auditoria.
- Elementos semânticos, foco visível, descrições de imagens, contrastes verificados, controlos grandes e alternativa a áudio.
- Sem perfil público, publicidade comportamental, localização ou microfone obrigatórios.
- Por envolver menores, realizar avaliação de privacidade e enquadramento jurídico antes de contas, analytics ou sincronização; consentimento parental conforme jurisdição quando aplicável.
- Conteúdos e imagens com licenças verificadas; não assumir que livros ou currículos são de uso livre.

## 4. Design system — tema aprovado
Identidade: fundo azul-marinho profundo nas telas de boas-vindas e tutor; telas de aprendizagem predominantemente brancas; azul elétrico para CTA; verde para acertos; amarelo/laranja para conquistas; cartões arredondados, sombras discretas e ilustrações educativas. Mascote: coruja amigável, com direitos de uso próprios. Usar tokens, não cores dispersas no código.

Tokens iniciais sujeitos a contraste:
```css
:root {
  --navy: #0D1B35;
  --blue: #1769F4;
  --cyan: #36C5F0;
  --green: #159B63;
  --amber: #F5B942;
  --surface: #FFFFFF;
  --background: #F4F7FC;
  --text: #142238;
  --radius-card: 20px;
}
```
Não comunicar estados apenas por cor. Evitar gamificação que penalize alunos com ritmos diferentes; sequências de dias e pontos devem ser opcionais.

### Ecrãs
1. Splash/onboarding: coruja, promessa offline, escolha de idioma e nível.
2. Início: continuar aprendizagem, disciplinas, conteúdos instalados.
3. Disciplina: níveis, temas e aulas.
4. Aula: texto, ilustrações, exemplos, ouvir quando houver TTS offline, seguinte.
5. Exercício: pergunta, respostas, verificar, acessibilidade.
6. Feedback: explicação de acerto/erro e próxima questão.
7. Progresso: aulas concluídas e evolução pessoal sem comparação pública.
8. Pacotes offline: instalar, atualizar, tamanho, remover.
9. Perfil local: pseudónimo, preferências e exportação.
10. Definições: idioma, acessibilidade, privacidade, armazenamento.
11. Tutor de IA: **apenas conceito futuro**, não apresentar como funcional no MVP.
12. Conclusão: celebração discreta e opção de continuar.

## 5. Conteúdo e qualidade pedagógica
- Criar matriz por disciplina > nível > competência > aula > exercício.
- Cada aula inclui objetivo observável, pré-requisitos, explicação, exemplo, prática, feedback e revisão.
- Conteúdo escrito/revisto por educadores e localizado por currículo; português europeu e brasileiro não são apenas traduções de interface.
- Testar compreensão com alunos e docentes; não usar respostas geradas por IA como gabarito sem validação.
- Pacotes leves: imagens otimizadas, sem vídeo obrigatório; áudio pré-gerado apenas quando licenciado e útil.

## 6. Roadmap
**Sprint 0:** repositório, design tokens, schema, CI, testes, protótipo visual.
**Sprint 1:** PWA instalável, onboarding, catálogo e pacote inicial.
**Sprint 2:** leitor de aulas e motor de exercícios determinístico.
**Sprint 3:** progresso local, pesquisa, gestão de pacotes e exportação.
**Sprint 4:** testes offline, acessibilidade, privacidade, revisão editorial e beta.
**Fase 2:** Android nativo e conteúdos adicionais.
**Fase 3:** sincronização opcional e tutor local somente após avaliação de segurança, qualidade, consumo e adequação etária.

## 7. PROMPT mestre para agente de desenvolvimento
> Age como arquiteto de software sénior, engenheiro frontend/mobile, especialista em acessibilidade e designer de produto educativo. Implementa o EduFree conforme este documento, respeitando estritamente o escopo MVP. Não inventes conteúdos curriculares, resultados de testes ou funcionalidades concluídas. Prioriza Web/PWA React + TypeScript + Vite com IndexedDB, service worker e pacotes JSON versionados. Mantém a arquitetura preparada para Android Kotlin + Compose sem introduzir dependência de backend. Cria o design system com azul-marinho, branco, azul elétrico, cartões arredondados e mascote coruja original; usa componentes acessíveis e layout responsivo. Implementa onboarding local, catálogo, aulas, exercícios com correção determinística, progresso persistente, pesquisa e gestão de pacotes. Inclui dados de demonstração claramente marcados e um pacote pedagógico inicial sujeito a revisão humana. Escreve testes unitários do motor de exercícios, testes de integração da persistência e testes end-to-end em modo offline. Não implementes IA generativa, contas, analytics, publicidade ou sincronização nesta fase. Antes de programar, apresenta árvore de ficheiros e plano por etapas; depois entrega código executável, instruções de instalação, comandos de teste e lista explícita de limitações. Valida os critérios de aceitação deste documento e reporta o que foi efetivamente testado.

## 8. Definição de pronto (DoD)
- `npm install`, `npm run build` e testes documentados e executados com resultados registados.
- PWA instalável em ambiente compatível; shell e pacote inicial abrem em modo de avião após instalação.
- Progresso preservado após reinício e atualizado atomicamente.
- Pacotes inválidos rejeitados sem perda de conteúdo anterior.
- Percurso completo: iniciar > abrir aula > responder > receber feedback > ver progresso.
- Sem chamadas de rede obrigatórias durante esse percurso.
- Auditoria manual de acessibilidade e revisão de conteúdo documentadas; pendências identificadas antes da publicação.
