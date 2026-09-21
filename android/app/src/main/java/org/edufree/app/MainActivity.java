package org.edufree.app;

import android.content.Context;
import android.media.AudioManager;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private TextToSpeech textToSpeech;
    private boolean ttsReady = false;

    public class AndroidTTSInterface {
        @JavascriptInterface
        public void speak(String text, String lang) {
            if (text == null || text.trim().isEmpty()) {
                return;
            }

            if (textToSpeech != null && ttsReady) {
                Locale locale;
                if ("pt-PT".equalsIgnoreCase(lang)) {
                    locale = new Locale("pt", "PT");
                } else if (lang != null && (lang.startsWith("en") || "en-US".equalsIgnoreCase(lang))) {
                    locale = Locale.US;
                } else {
                    locale = new Locale("pt", "BR");
                }

                try {
                    textToSpeech.stop();
                    textToSpeech.setLanguage(locale);
                    textToSpeech.setSpeechRate(0.95f);
                    textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "EduFree_TTS_END_" + System.currentTimeMillis());
                } catch (Exception e) {
                    e.printStackTrace();
                    notifyWebTTSEnd();
                }
            }
        }

        @JavascriptInterface
        public void speakSegments(String segmentsJson) {
            if (textToSpeech != null && ttsReady) {
                try {
                    textToSpeech.stop();
                    org.json.JSONArray array = new org.json.JSONArray(segmentsJson);
                    int total = array.length();
                    for (int i = 0; i < total; i++) {
                        org.json.JSONObject obj = array.getJSONObject(i);
                        String text = obj.optString("text", "");
                        String lang = obj.optString("lang", "pt-BR");
                        if (text.trim().isEmpty()) continue;

                        Locale locale;
                        if ("en-US".equalsIgnoreCase(lang) || "en".equalsIgnoreCase(lang)) {
                            locale = Locale.US;
                        } else if ("pt-PT".equalsIgnoreCase(lang)) {
                            locale = new Locale("pt", "PT");
                        } else {
                            locale = new Locale("pt", "BR");
                        }

                        textToSpeech.setLanguage(locale);
                        textToSpeech.setSpeechRate(0.95f);
                        String utteranceId = (i == total - 1) ? ("EduFree_TTS_END_" + System.currentTimeMillis()) : ("EduFree_TTS_SEG_" + i);
                        textToSpeech.speak(text, TextToSpeech.QUEUE_ADD, null, utteranceId);
                    }
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
                textToSpeech.setLanguage(new Locale("pt", "BR"));
                textToSpeech.setSpeechRate(0.95f);
                textToSpeech.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {}

                    @Override
                    public void onDone(String utteranceId) {
                        if (utteranceId != null && utteranceId.contains("EduFree_TTS_SEG_")) {
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

    private void setupWebViewAudio() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            WebSettings settings = webView.getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);

            // Injeta o canal Javascript para a aplicação chamar o TTS nativo offline
            webView.addJavascriptInterface(new AndroidTTSInterface(), "AndroidTTS");
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
