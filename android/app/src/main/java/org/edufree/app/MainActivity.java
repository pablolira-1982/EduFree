package org.edufree.app;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int REQUEST_AUDIO_PERMISSIONS_CODE = 1001;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Notifica e solicita permissão de áudio imediatamente na inicialização
        requestAudioPermissionsImmediately();

        // Garante que o WebView possa reproduzir sons e fala sem necessidade de gesto prévio
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebSettings settings = getBridge().getWebView().getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        // Verifica na volta do utilizador se a permissão precisa de ser solicitada
        requestAudioPermissionsImmediately();
    }

    private void requestAudioPermissionsImmediately() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            boolean hasRecordAudio = ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.RECORD_AUDIO
            ) == PackageManager.PERMISSION_GRANTED;

            if (!hasRecordAudio) {
                ActivityCompat.requestPermissions(
                    this,
                    new String[]{
                        Manifest.permission.RECORD_AUDIO,
                        Manifest.permission.MODIFY_AUDIO_SETTINGS
                    },
                    REQUEST_AUDIO_PERMISSIONS_CODE
                );
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_AUDIO_PERMISSIONS_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permissão de áudio concedida com sucesso
            }
        }
    }
}
