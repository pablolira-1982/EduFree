# 🦉 EduFree — Educação Sem Limites

> **Aprender hoje. Um futuro melhor amanhã.**  
> Plataforma educativa interativa, gratuita e **100% offline**, desenvolvida para democratizar o acesso ao conhecimento básico, intermediário e avançado para jovens e estudantes.

---

## 🌟 Destaques do Projeto

- **📴 100% Offline:** Todo o conteúdo curricular, exercícios, áudios e persistência funcionam sem necessidade de conexão à internet.
- **📚 540 Módulos Estruturados:** 60 módulos completos por disciplina, cobrindo o ensino fundamental e médio.
- **🏛️ História Completa:**
  - **Módulos 1 a 30:** *História Geral e Universal* (das primeiras civilizações às Guerras Mundiais).
  - **Módulos 31 a 60:** *História do Brasil* (dos povos originários, colônia, império até a república moderna).
- **📐 9 Disciplinas Integradas:** Matemática, Português, Ciências, História, Geografia, Física, Química, Biologia e Inglês.
- **🔊 Motor Sonoro Nativo (Web Audio API):** Efeitos sonoros gerados por síntese de áudio (BOOM de explosão, confetes em múltiplas ondas, fanfarra de troféu e feedback auditivo) sem arquivos externos pesados.
- **🤖 Tutor Inteligente Offline:** Módulo de apoio para reforço escolar e dúvidas frequentes.
- **💾 Persistência Local:** Utiliza IndexedDB (`Dexie.js`) e `localStorage` para memorizar o nome, progresso, estrelas e histórico de conquistas do usuário de forma duradoura no PWA e APK.
- **📱 PWA & Android Nativo (Capacitor):** Pode ser usado diretamente no navegador como Progressive Web App instalável ou compilado para Android APK nativo (SDK 37+).

---

## 🚀 Como Executar em Localhost (Web / PWA)

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm`

### Passo a Passo:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/pablolira-1982/EduFree.git
   cd EduFree
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar no navegador:**
   Abra [http://localhost:5173/](http://localhost:5173/) para começar a aprender!

5. **Gerar a compilação de produção web:**
   ```bash
   npm run build
   ```

---

## 📱 Como Gerar o APK e o .AAB (Google Play Store)

O EduFree utiliza o **Capacitor** para encapsular a aplicação web em um pacote Android nativo otimizado e leve, compilado para **Android SDK 37+**.

### Pré-requisitos para compilação Android:
- **Java JDK 17** (OpenJDK 17 recomendado)
- **Android SDK** com plataformas (`android-37`) e `build-tools` (34+ ou 36+) instalados
- Variável de ambiente `ANDROID_HOME` configurada (ou arquivo `android/local.properties` com `sdk.dir=/caminho/para/seu/Android/Sdk`)

---

### 🔢 Como Mudar a Versão do Aplicativo

Ao enviar atualizações para a **Google Play Store** ou gerar novas versões de teste, é fundamental atualizar os números de versão em dois arquivos:

#### 1. No arquivo `android/app/build.gradle`:
Localize o bloco `defaultConfig`:
```groovy
defaultConfig {
    applicationId "org.edufree.app"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 3          // ⬅️ INCREMENTE SEMPRE +1 (Ex: 1, 2, 3, 4...)
    versionName "1.0.2"    // ⬅️ Versão visível para os utilizadores (Ex: "1.0.2")
    ...
}
```

> [!IMPORTANT]
> **Regra Obrigatória da Google Play Store:**  
> O `versionCode` **deve sempre ser maior** que a versão enviada anteriormente (1 ➔ 2 ➔ 3...). O Google Play rejeitará qualquer pacote com `versionCode` repetido ou menor.

#### 2. No arquivo `package.json`:
Atualize a chave `version`:
```json
{
  "name": "edufree",
  "version": "1.0.2",
  ...
}
```

---

### 📦 Comandos de Compilação

#### 1. Gerar o APK Release (Para testes em dispositivos e envio direto):
```bash
npm run build:apk
```
- **Arquivo gerado:** `android/app/build/outputs/apk/release/app-release.apk`
- **Uso:** Ideal para instalar diretamente no celular (`adb install` ou compartilhamento via WhatsApp/Drive) para testar áudio, módulos e persistência offline.

#### 2. Gerar o .AAB - Android App Bundle (Obrigatório para a Google Play Store):
```bash
npm run build:aab
```
- **Arquivo gerado:** `android/app/build/outputs/bundle/release/app-release.aab`
- **Uso:** Formato oficial exigido pelo **Google Play Console**. A Google utiliza o bundle para gerar APKs dinâmicos e reduzidos para cada modelo específico de celular dos estudantes.

#### 3. Abrir o projeto no Android Studio (Opcional):
```bash
npx cap open android
```

---

### 🎙️ Permissões e Áudio no Android

O EduFree foi configurado para **solicitar a permissão de áudio/microfone imediatamente ao iniciar o app** (Android SDK 37+). Isso garante que o usuário veja o diálogo nativo do sistema operacional logo na primeira abertura e aceite, sem a necessidade de acessar manualmente as Definições do Android. Caso precise verificar a permissão a qualquer momento, há também um botão de teste em **Definições ➔ Voz e Áudio Didático**.

---

## 📁 Estrutura do Código

```text
EduFree/
├── android/                 # Projeto nativo Android (Capacitor)
├── public/                  # Ícones, manifest PWA, service worker e imagens 3D
│   └── assets/              # Logo_EduFree.png, ícones de disciplinas e conquistas
├── src/
│   ├── components/          # Componentes reutilizáveis (BottomNav, Modais, etc.)
│   ├── core/                # Tipos TypeScript, definições e design tokens
│   ├── data/
│   │   ├── curriculum.ts            # Integração das 9 disciplinas
│   │   ├── curriculum-seeds.ts      # Banco completo com 540 sementes de módulos
│   │   ├── curriculum-factory.ts    # Construtor pedagógico com gerador de exercícios
│   │   └── exercise-bank-builder.ts # Gerador procedural de questões de reforço
│   ├── db/
│   │   └── database.ts      # Banco local IndexedDB com Dexie.js
│   ├── engine/
│   │   ├── sound-engine.ts  # Síntese Web Audio offline (BOOM, troféu, cliques)
│   │   ├── tts-engine.ts    # Leitura em voz alta e acessibilidade
│   │   └── bilingual-tts.ts # Pronúncia bilíngue (Português / Inglês)
│   ├── screens/             # Telas do fluxo da aplicação (Home, Disciplinas, Exercícios...)
│   ├── App.tsx              # Roteamento e orquestrador principal
│   └── main.tsx             # Ponto de entrada React 19
├── capacitor.config.ts      # Configuração do Capacitor Android
└── package.json
```

---

## 🤝 Como Contribuir

Contribuições da comunidade são muito bem-vindas!
1. Faça um **Fork** do projeto.
2. Crie uma branch para a sua feature (`git checkout -b feature/minha-melhoria`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona melhoria no módulo de Matemática'`).
4. Envie para o GitHub (`git push origin feature/minha-melhoria`).
5. Abra um **Pull Request**.

---

## ❤️ Apoie este projeto

Se este projeto foi útil para você e quiser apoiar o desenvolvimento, pode fazer uma doação via PIX.

### 🇧🇷 PIX

<p align="center">
  <img src="./qrcode-chave-pix.png" width="250" alt="QR Code PIX">
</p>

**Chave PIX:**

```text
b3652001-9daa-4131-ad05-6ea1f59e1721
```

---

## 📜 Licença

MIT License — livre para uso pessoal, institucional e acadêmico. Antes de redistribuir o EduFree, confira também os termos da respectiva licença no arquivo [LICENSE](./LICENSE).
