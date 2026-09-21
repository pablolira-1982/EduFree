import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.edufree.app',
  appName: 'EduFree',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
