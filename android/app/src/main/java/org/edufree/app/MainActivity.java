package org.edufree.app;

import android.content.Context;
import android.media.AudioManager;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MainActivity extends BridgeActivity {
    private TextToSpeech textToSpeech;
    private boolean ttsReady = false;
    private final List<String> queuedTexts = new ArrayList<>();
    private final List<String> queuedLanguages = new ArrayList<>();
    private int queuedSegmentIndex = 0;

    public class AndroidTTSInterface {
        private String sanitizeSpeechText(String text) {
            if (text == null) return "";
            String s = text
                .replaceAll("\\s*[/\\\\]\\s*", " ou ")
                .replaceAll("[:;]", ", ")
                .replaceAll("[!¡]", ". ")
                .replaceAll("[\"“”‘’'`]", "")
                .replaceAll("[()\\[\\]{}]", " ")
                .replaceAll("[-—–_]", " ")
                .replaceAll("\\.{2,}", ". ")
                .replaceAll("…", ". ")
                .replaceAll(",{2,}", ", ")
                .replaceAll("\\s+,", ", ")
                .replaceAll("\\s+\\.", ". ")
                .replaceAll("\\s+", " ")
                .trim();
            // Remove pontuações no início do texto para evitar falar 'ponto'
            s = s.replaceAll("^[.,;:!?\\s]+", "").trim();
            return s;
        }

        @JavascriptInterface
        public void speak(String text, String lang) {
            String clean = sanitizeSpeechText(text);
            if (clean.isEmpty()) {
                notifyWebTTSEnd();
                return;
            }

            if (textToSpeech != null && ttsReady) {
                boolean isEn = lang != null && (lang.startsWith("en") || "en-US".equalsIgnoreCase(lang));
                Locale locale = isEn ? Locale.US : new Locale("pt", "BR");

                try {
                    textToSpeech.stop();
                    applyFemaleVoiceForLocale(locale);
                    textToSpeech.setSpeechRate(isEn ? 0.90f : 1.0f);
                    textToSpeech.speak(clean, TextToSpeech.QUEUE_FLUSH, null, "EduFree_TTS_END_" + System.currentTimeMillis());
                } catch (Exception e) {
                    e.printStackTrace();
                    notifyWebTTSEnd();
                }
            } else {
                notifyWebTTSEnd();
            }
        }

        @JavascriptInterface
        public void speakSegments(String segmentsJson) {
            if (textToSpeech != null && ttsReady) {
                try {
                    textToSpeech.stop();
                    org.json.JSONArray array = new org.json.JSONArray(segmentsJson);
                    queuedTexts.clear();
                    queuedLanguages.clear();
                    queuedSegmentIndex = 0;
                    for (int i = 0; i < array.length(); i++) {
                        org.json.JSONObject obj = array.getJSONObject(i);
                        String rawText = obj.optString("text", "");
                        String clean = sanitizeSpeechText(rawText);
                        String lang = obj.optString("lang", "pt-BR");
                        if (clean.isEmpty()) continue;
                        queuedTexts.add(clean);
                        queuedLanguages.add(lang);
                    }
                    speakNextSegment();
                } catch (Exception e) {
                    e.printStackTrace();
                    notifyWebTTSEnd();
                }
            } else {
                notifyWebTTSEnd();
            }
        }

        @JavascriptInterface
        public void stop() {
            if (textToSpeech != null) {
                try {
                    textToSpeech.stop();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        @JavascriptInterface
        public boolean isAvailable() {
            return ttsReady;
        }
    }

    // TextToSpeech tem uma única voz/rate global. Falar um item por vez evita
    // que a última voz configurada substitua a voz dos segmentos anteriores.
    private void speakNextSegment() {
        if (textToSpeech == null || queuedSegmentIndex >= queuedTexts.size()) {
            queuedTexts.clear();
            queuedLanguages.clear();
            notifyWebTTSEnd();
            return;
        }
        String lang = queuedLanguages.get(queuedSegmentIndex);
        boolean isEn = "en-US".equalsIgnoreCase(lang) || "en".equalsIgnoreCase(lang);
        applyFemaleVoiceForLocale(isEn ? Locale.US : new Locale("pt", "BR"));
        textToSpeech.setSpeechRate(isEn ? 0.90f : 1.0f);
        textToSpeech.speak(queuedTexts.get(queuedSegmentIndex), TextToSpeech.QUEUE_FLUSH, null,
            "EduFree_TTS_SEG_" + queuedSegmentIndex);
    }

    /**
     * Localiza e seleciona a melhor voz feminina nativa do Android para o idioma selecionado
     */
    private void applyFemaleVoiceForLocale(Locale targetLocale) {
        if (textToSpeech == null) return;
        try {
            textToSpeech.setLanguage(targetLocale);
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                Set<Voice> voices = textToSpeech.getVoices();
                if (voices != null) {
                    boolean isEnglish = "en".equalsIgnoreCase(targetLocale.getLanguage());
                    Voice bestVoice = null;
                    for (Voice v : voices) {
                        if (isEnglish) {
                            if ("en".equalsIgnoreCase(v.getLocale().getLanguage())) {
                                String name = v.getName().toLowerCase();
                                if (name.contains("female") || name.contains("jenny") || name.contains("samantha") || name.contains("network") || name.contains("sfg")) {
                                    bestVoice = v;
                                    break;
                                }
                                if (bestVoice == null) bestVoice = v;
                            }
                        } else {
                            // Português do Brasil feminino
                            if ("pt".equalsIgnoreCase(v.getLocale().getLanguage())) {
                                String name = v.getName().toLowerCase();
                                if (name.contains("female") || name.contains("mulher") || name.contains("leticia") || name.contains("luciana") || name.contains("afs") || name.contains("sfg")) {
                                    bestVoice = v;
                                    break;
                                }
                                if (bestVoice == null && "BR".equalsIgnoreCase(v.getLocale().getCountry())) {
                                    bestVoice = v;
                                }
                            }
                        }
                    }
                    if (bestVoice != null) {
                        textToSpeech.setVoice(bestVoice);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Garante que o áudio do Android esteja em modo NORMAL (multimídia / alto-falante)
        try {
            AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            if (audioManager != null) {
                audioManager.setMode(AudioManager.MODE_NORMAL);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Inicializa o motor de Text-to-Speech nativo do Android (100% offline)
        initNativeTTS();

        // Configura o WebView para reprodução de áudio e fala
        setupWebViewAudio();
    }

    @Override
    public void onStart() {
        super.onStart();
        setupWebViewAudio();
    }

    @Override
    public void onResume() {
        super.onResume();
        setupWebViewAudio();
    }

    private void initNativeTTS() {
        textToSpeech = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                ttsReady = true;
                applyFemaleVoiceForLocale(new Locale("pt", "BR"));
                textToSpeech.setSpeechRate(1.0f);
                textToSpeech.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {}

                    @Override
                    public void onDone(String utteranceId) {
                        if (utteranceId != null && utteranceId.contains("EduFree_TTS_SEG_")) {
                            queuedSegmentIndex++;
                            speakNextSegment();
                            return;
                        }
                        notifyWebTTSEnd();
                    }

                    @Override
                    public void onError(String utteranceId) {
                        notifyWebTTSEnd();
                    }
                });
            }
        });
    }

    private void notifyWebTTSEnd() {
        runOnUiThread(() -> {
            if (getBridge() != null && getBridge().getWebView() != null) {
                getBridge().getWebView().evaluateJavascript("if (typeof window.onAndroidTTSEnd === 'function') { window.onAndroidTTSEnd(); }", null);
            }
        });
    }

    public class AndroidStorageInterface {
        @JavascriptInterface
        public void setString(String key, String value) {
            try {
                android.content.SharedPreferences prefs = getSharedPreferences("edufree_mobile_prefs", Context.MODE_PRIVATE);
                prefs.edit().putString(key, value).apply();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public String getString(String key, String defaultValue) {
            try {
                android.content.SharedPreferences prefs = getSharedPreferences("edufree_mobile_prefs", Context.MODE_PRIVATE);
                return prefs.getString(key, defaultValue);
            } catch (Exception e) {
                return defaultValue;
            }
        }
    }

    private void setupWebViewAudio() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            WebSettings settings = webView.getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);

            // Injeta o canal Javascript para a aplicação chamar o TTS nativo offline
            webView.addJavascriptInterface(new AndroidTTSInterface(), "AndroidTTS");
            // Injeta o canal SharedPreferences nativo para persistência de dados mobile
            webView.addJavascriptInterface(new AndroidStorageInterface(), "AndroidStorage");
        }
    }

    @Override
    public void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
    }
}
